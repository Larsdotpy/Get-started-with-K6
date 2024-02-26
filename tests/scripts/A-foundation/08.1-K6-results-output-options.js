// OSS = Open Source Software

import http from 'k6/http';

// k6 run 08.1-K6-results-output-options.js --out csv=results.csv
// k6 run 08.1-K6-results-output-options.js --out json=results.json

export default function() {
    let url = 'https://httpbin.test.k6.io/post';
    let response = http.post(url, 'Hello world!');

    console.log(response.json().data);
}