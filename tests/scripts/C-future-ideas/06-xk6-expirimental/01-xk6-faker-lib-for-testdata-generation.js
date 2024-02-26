import http from "k6/http";
import { Faker } from "k6/x/faker"
import { check} from "k6";

/*
- install xk6 builder: https://github.com/grafana/xk6
- read installation steps xk6-faker: https://github.com/szkiba/xk6-faker
- build new k6:  xk6 build --with github.com/szkiba/xk6-faker@latest
- run script with new k6: ./k6 run

- zie https://github.com/szkiba/xk6-faker/blob/master/docs/classes/ als voorbeelden van faker data
 */

const url = 'https://test-api.k6.io';
let f = new Faker();

const account ={
    username: f.username(10),
    password: f.password(),
    first_name: f.firstName(),
    last_name: f.lastName(),
    email: f.email()
}

// email address because backend api results in time-outs, maybe a defect on email validation
const payload = JSON.stringify(
    {
        username: account.username,
        password: account.password,
        first_name: account.first_name,
        last_name: account.last_name,
        email: account.email
    })

const params = {
    headers: {
        'Content-Type': 'application/json'
    },
};

// one time register and login in setup function

export function setup() {

    let response = http.post(`${url}/user/register/`,payload,params);
    check(response, {
        'Registration status is 201 (Created)': (r) => r.status === 201,
    })

    let username = account.username, password = account.password;
    response = http.post(`https://test-api.k6.io/auth/basic/login/`, {username, password})
    check(response, {
        'Login status is 200 (OK)': (r) => r.status === 200,
    });

    return response;
}

export default function (data){
    console.log(`Login new user: ${data.body}`)
}