import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 2,
    iterations: 2,
    duration: '10s',
};

// K6_ITERATIONS=3 K6_DURATION="20s" K6_VUS=3 k6 run 03-override-with-environment-variables-options.js

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
