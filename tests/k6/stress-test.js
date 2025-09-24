import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

// Prueba de estrés - incrementa usuarios gradualmente
export let options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% < 1s bajo estrés
    http_req_failed: ['rate<0.2'],     // Error rate < 20%
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
  // Prueba simple de lectura intensiva
  let res = http.get(`${BASE_URL}/categorias`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  res = http.get(`${BASE_URL}/libros`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  sleep(0.5);
}