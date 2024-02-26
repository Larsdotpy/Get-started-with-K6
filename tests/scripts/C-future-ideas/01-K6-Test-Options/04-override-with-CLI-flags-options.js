import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 3,
    iterations: 3,
    duration: '20s',
};

// k6 run --vus 4 --duration "30s" --iterations "4" 04-override-with-CLI-flags-options.js

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
