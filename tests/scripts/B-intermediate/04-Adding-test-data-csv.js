import http from 'k6/http';
import { check } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = papaparse.parse(open('users.csv'), { header: true }).data;

export default function() {
    let response = http.get('https://test.k6.io/my_messages.php');
    check(response, {
        'is Unauthorized': r => r.body.includes('Unauthorized'),
    });

    let csrfToken = response.html().find("input[name=csrftoken]").attr("value");
    console.log(`csrfToken: ${csrfToken}`);

    // Get random username and password from array
    let rand = Math.floor(Math.random() * csvData.length);
    let username = csvData[rand].username;
    let password = csvData[rand].password;
    console.log(`username: ${username} / password: ${password}` );

    // let op csrftoken is niet csrfToken, anders error
    response = http.post('http://test.k6.io/login.php', { login: username, password: password, csrftoken: csrfToken });
    check(response, {
        'is status 200': (r) => r.status === 200,
        'successful login': (r) => r.body.includes('successfully authorized')
    })


}