import http from "k6/http";
import {randomString} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {check, fail} from "k6";

/*
- register yourself
- validate if your account is successfull created
- register yourself again and catch the error

 */


const url = 'https://test-api.k6.io';

const account = {
    username: 'christian-marc',
    password: "test1234!",
    first_name: "Marc",
    last_name: "testing",
    email: `christian-marc@testing.com`,
}

// email address because backend api results in time-outs, maybe a defect on email validation
const payload = JSON.stringify({
    username: account.username, password: account.password, first_name: account.first_name, last_name: account.last_name
})

const params = {
    headers: {
        'Content-Type': 'application/json'
    },
};

// one time register and login in setup function

export function setup() {

    let response = http.post(`${url}/user/register/`, payload, params);
    check(response, {
        'Registration status is 201 (Created)': (r) => r.status === 201,
    })

    if (!check(response, {
        'status code MUST be 201': (r) => r.status === 201,
    })) {
        fail('status code *not* 201');
    }

    // this is a Post method, sending data to endpoint. See: https://k6.io/docs/javascript-api/k6-http/post/
    let username = account.username, password = account.password;
    response = http.post(`https://test-api.k6.io/auth/basic/login/`, {username, password})
    check(response, {
        'Login status is 200 (OK)': (r) => r.status === 200,
    });

    return response;
}

export default function (data) {
    console.log(`Login new user: ${data.body}`)
}