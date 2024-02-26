import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const res = http.get('https://test-api.k6.io/');

    // see: https://k6.io/docs/javascript-api/k6-http/response/
    console.debug(`Used http protocol: ${res.proto}`)

    check(res, {
        'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
    });
    sleep(1);
}
