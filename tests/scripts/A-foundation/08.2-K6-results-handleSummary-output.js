// OSS = Open Source Software

import http from 'k6/http';
import { textSummary, jUnit } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

/*
    k6 run --iterations --vus 10 --summary-trend-stats="'count', 'p(95)', p(99),p(99.9)" 08.2-K6-results-handleSummary-output.js
 */

export default function() {
    let url = 'https://httpbin.test.k6.io/post';
    let response = http.post(url, 'Hello world!');

    console.log(response.json().data);

}

export async function handleSummary(data){
    console.log('Preparing the end-of-test summary...');

    return {
        '08.2-K6-results-json-summary.json': JSON.stringify(data),
        '08.2-K6-results-junit-summary.xml': jUnit(data),
        "08.2-K6-resutls-HTML-summary.html": htmlReport(data,{title: "Polteq Test Summary"}),
        stdout: textSummary(data, { indent: '→', enableColors: true }),

    };
}