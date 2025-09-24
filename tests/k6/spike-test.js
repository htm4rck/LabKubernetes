import http from 'k6/http';
import { check, sleep } from 'k6';

// Prueba de picos - simula tráfico súbito
export let options = {
  stages: [
    { duration: '10s', target: 10 },   // Normal load
    { duration: '30s', target: 500 },  // Spike!
    { duration: '10s', target: 10 },   // Back to normal
    { duration: '30s', target: 1000 }, // Bigger spike!
    { duration: '10s', target: 0 },    // Recovery
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // Más tolerante en picos
    http_req_failed: ['rate<0.3'],
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
  let res = http.get(`${BASE_URL}/health`);
  check(res, {
    'health check ok': (r) => r.status === 200,
  });

  sleep(0.1);
}