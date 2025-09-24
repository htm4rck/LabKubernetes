import { DataSource } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Libro } from '../entities/libro.entity';

export async function seedDatabase(dataSource: DataSource) {
  const categoriaRepository = dataSource.getRepository(Categoria);
  const libroRepository = dataSource.getRepository(Libro);

  // Verificar si ya hay datos
  const categoriaCount = await categoriaRepository.count();
  if (categoriaCount > 0) {
    console.log('Base de datos ya tiene datos, omitiendo seed');
    return;
  }

  // Crear categorías
  const categorias = await categoriaRepository.save([
    { nombre: 'Ficción', descripcion: 'Libros de ficción y literatura' },
    { nombre: 'Ciencia', descripcion: 'Libros científicos y técnicos' },
    { nombre: 'Historia', descripcion: 'Libros de historia y biografías' },
    { nombre: 'Tecnología', descripcion: 'Libros sobre programación y tecnología' },
  ]);

  // Crear libros
  await libroRepository.save([
    {
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      isbn: '978-84-376-0494-7',
      categoriaId: categorias[0].id,
    },
    {
      titulo: '1984',
      autor: 'George Orwell',
      isbn: '978-84-376-0495-4',
      categoriaId: categorias[0].id,
    },
    {
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      isbn: '978-84-376-0496-1',
      categoriaId: categorias[0].id,
    },
    {
      titulo: 'Una breve historia del tiempo',
      autor: 'Stephen Hawking',
      isbn: '978-84-376-0497-8',
      categoriaId: categorias[1].id,
    },
    {
      titulo: 'El origen de las especies',
      autor: 'Charles Darwin',
      isbn: '978-84-376-0498-5',
      categoriaId: categorias[1].id,
    },
    {
      titulo: 'Sapiens',
      autor: 'Yuval Noah Harari',
      isbn: '978-84-376-0499-2',
      categoriaId: categorias[2].id,
    },
    {
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      isbn: '978-84-376-0500-5',
      categoriaId: categorias[3].id,
    },
  ]);

  console.log('✅ Base de datos poblada con datos iniciales');
}