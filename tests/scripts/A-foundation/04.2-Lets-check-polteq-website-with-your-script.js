import http from 'k6/http';
import { check } from "k6";

/*
- add Polteq website url
- add options to run multiple times (--vus 2 --duration 5s)
- add multiple checks on the response (checks don't stop the execution but validate the response)
- add check on body content (like address of Polteq NL is returned (see: https://k6.io/docs/javascript-api/k6-http/response/response-html/)
 */

export default function (){
    let response = http.get('');

    console.log(`Response status: ${response.status}`)
    // negative response validation
    check(response, {'is response status 404:': (r) => r.status === 404});

    // validate/check a html element
    // use div to find all div's in the response and the select footer with Polteq address
    let doc = response.html();
    doc
        .find('link')
        .toArray()
        .forEach(function (item){
            console.log(item.attr('href'));
        })
}