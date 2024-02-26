import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';

/*
modified exmaple from: https://k6.io/docs/examples/api-crud-operations/

- voeg update en delete actie toe aan de default functie

 */

export const options = {
    vus: 1,
    iterations: 1
};

const USERNAME = `${randomString(10)}@example.com`; // Set your own email or `${randomString(10)}@example.com`;
const PASSWORD = 'superCroc2019';

const BASE_URL = 'https://test-api.k6.io';

// Register a new user and retrieve authentication token for subsequent API requests
export function setup() {
    const res = http.post(`${BASE_URL}/user/register/`, {
        first_name: 'Crocodile',
        last_name: 'Owner',
        username: USERNAME,
        password: PASSWORD,
    });

    check(res, { 'created user': (r) => r.status === 201 });

    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USERNAME,
        password: PASSWORD,
    });

    const authToken = loginRes.json('access');
    check(authToken, { 'logged in successfully': () => authToken !== '' });

    return authToken;
}

export default (authToken) => {
    // set the authorization header on the session for the subsequent requests
    const requestHeader ={
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    };

    let URL = `${BASE_URL}/my/crocodiles/`;

    // create a new crocodile
    const payload = {
        name: `Name ${randomString(10)}`,
        sex: 'F',
        date_of_birth: '2023-05-11',
    };

    let res = http.post(URL, payload, requestHeader);

    if (check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
        URL = `${URL}${res.json('id')}/`;
    } else {
        console.log(`Unable to create a Croc ${res.status} ${res.body}`);
        return;
    }

    // fetch private crocs
    res = http.get(`${BASE_URL}/my/crocodiles/`, requestHeader);
    check(res, { 'retrieved private crocs status': (r) => r.status === 200 });
    check(res.json(), { 'retrieved private crocs list': (r) => r.length > 0 });
    console.log(`New created private croc: ${res.body}`)


    // fetch public crocs
    res = http.get(`${BASE_URL}/public/crocodiles/`);
    check(res, { 'retrieved public crocs status': (r) => r.status === 200 });
    check(res.json(), { 'retrieved public crocs list': (r) => r.length > 0 });
    console.log(`Available public croc: ${res.body}`)

};
