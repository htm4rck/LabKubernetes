import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Métricas personalizadas
export let errorRate = new Rate('errors');

// Configuración de la prueba
export let options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de requests < 500ms
    http_req_failed: ['rate<0.1'],    // Error rate < 10%
    errors: ['rate<0.1'],
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

// Datos de prueba
const categorias = [
  { nombre: 'Ficción', descripcion: 'Libros de ficción' },
  { nombre: 'Ciencia', descripcion: 'Libros científicos' },
  { nombre: 'Historia', descripcion: 'Libros de historia' }
];

const libros = [
  { titulo: 'El Quijote', autor: 'Cervantes', isbn: '978-84-376-0494-7' },
  { titulo: '1984', autor: 'George Orwell', isbn: '978-84-376-0495-4' },
  { titulo: 'Cien años de soledad', autor: 'García Márquez', isbn: '978-84-376-0496-1' }
];

export default function () {
  // Test health endpoint
  let healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health check status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  // Test categorías endpoints
  testCategorias();
  
  // Test libros endpoints
  testLibros();
  
  sleep(1);
}

function testCategorias() {
  // GET todas las categorías
  let getRes = http.get(`${BASE_URL}/categorias`);
  check(getRes, {
    'GET categorias status is 200': (r) => r.status === 200,
    'GET categorias response is array': (r) => Array.isArray(JSON.parse(r.body)),
  }) || errorRate.add(1);

  // POST nueva categoría
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];
  let postRes = http.post(`${BASE_URL}/categorias`, JSON.stringify(categoria), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(postRes, {
    'POST categoria status is 201': (r) => r.status === 201,
    'POST categoria has id': (r) => JSON.parse(r.body).id !== undefined,
  }) || errorRate.add(1);

  if (postRes.status === 201) {
    const createdCategoria = JSON.parse(postRes.body);
    
    // GET categoría específica
    let getByIdRes = http.get(`${BASE_URL}/categorias/${createdCategoria.id}`);
    check(getByIdRes, {
      'GET categoria by id status is 200': (r) => r.status === 200,
      'GET categoria by id returns correct data': (r) => {
        const data = JSON.parse(r.body);
        return data.nombre === categoria.nombre;
      },
    }) || errorRate.add(1);

    // PUT actualizar categoría
    const updatedCategoria = { ...categoria, descripcion: 'Descripción actualizada' };
    let putRes = http.put(`${BASE_URL}/categorias/${createdCategoria.id}`, 
      JSON.stringify(updatedCategoria), {
      headers: { 'Content-Type': 'application/json' },
    });
    
    check(putRes, {
      'PUT categoria status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);

    // DELETE categoría
    let deleteRes = http.del(`${BASE_URL}/categorias/${createdCategoria.id}`);
    check(deleteRes, {
      'DELETE categoria status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);
  }
}

function testLibros() {
  // GET todos los libros
  let getRes = http.get(`${BASE_URL}/libros`);
  check(getRes, {
    'GET libros status is 200': (r) => r.status === 200,
    'GET libros response is array': (r) => Array.isArray(JSON.parse(r.body)),
  }) || errorRate.add(1);

  // Crear categoría para el libro
  const categoria = { nombre: 'Test Category', descripcion: 'For testing' };
  let catRes = http.post(`${BASE_URL}/categorias`, JSON.stringify(categoria), {
    headers: { 'Content-Type': 'application/json' },
  });

  if (catRes.status === 201) {
    const createdCategoria = JSON.parse(catRes.body);
    
    // POST nuevo libro
    const libro = { 
      ...libros[Math.floor(Math.random() * libros.length)],
      categoriaId: createdCategoria.id 
    };
    
    let postRes = http.post(`${BASE_URL}/libros`, JSON.stringify(libro), {
      headers: { 'Content-Type': 'application/json' },
    });
    
    check(postRes, {
      'POST libro status is 201': (r) => r.status === 201,
      'POST libro has id': (r) => JSON.parse(r.body).id !== undefined,
    }) || errorRate.add(1);

    if (postRes.status === 201) {
      const createdLibro = JSON.parse(postRes.body);
      
      // GET libro específico
      let getByIdRes = http.get(`${BASE_URL}/libros/${createdLibro.id}`);
      check(getByIdRes, {
        'GET libro by id status is 200': (r) => r.status === 200,
      }) || errorRate.add(1);

      // GET libros por categoría
      let getByCatRes = http.get(`${BASE_URL}/libros/categoria/${createdCategoria.id}`);
      check(getByCatRes, {
        'GET libros by categoria status is 200': (r) => r.status === 200,
      }) || errorRate.add(1);

      // DELETE libro
      http.del(`${BASE_URL}/libros/${createdLibro.id}`);
    }
    
    // Limpiar categoría
    http.del(`${BASE_URL}/categorias/${createdCategoria.id}`);
  }
}