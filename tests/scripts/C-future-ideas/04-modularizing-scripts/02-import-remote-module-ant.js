import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';
import {check, fail} from 'k6';
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { colourLogger } from '../../../common/colourLogger.js';

/*
- voeg de remote randomIntBetween en random functies toe uit de lib: https://jslib.k6.io
- voeg de lokale functie logger toe uit de common folder
 */


export default function () {
    const session = new Httpx({
        baseURL: 'https://test-api.k6.io',
        timeout: 20000, // 20s timeout.
    });
    const res = session.post(`/user/register/`, {
        username: randomString(8),
        first_name: 'J',
        last_name: 'Doe',
        email: `J${randomIntBetween(10, 100)}@example.com`, // see error if account already exists
        password: '1234',
    });

    check(res, {
        'is status 201': (r) => r.status === 201,
    });

    colourLogger(res);
}
