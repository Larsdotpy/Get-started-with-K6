import { check } from 'k6';
import http from 'k6/http';

const domain = 'https://test.k6.io';

export default function () {
    let responses = http.batch([
        ['GET', domain + '/'],
        ['GET', domain + '/static/css/site.css'],
        ['GET', domain + '/static/js/prisms.js'],
        ['GET', domain + '/static/favicon.ico']
    ])

    console.log(
        `---------- Start log ------------
            url: ${JSON.stringify(responses[0].url)}
            request: ${JSON.stringify(responses[0].request)}
            date: ${JSON.stringify(responses[0].headers['Date'])}
            status : ${responses[0].status}
            timings : ${JSON.stringify(responses[0].timings)}
        ---------- End  log ------------
        `
    );

    check(responses[0], {
        'Homepage successfully loaded': (r) => r.body.includes("Collection of simple web-pages suitable for load testing"),
    });
}