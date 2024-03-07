import http from "k6/http";
import { check } from "k6";

/*
- what headers can be used, see https://test-api.k6.io/public/crocodiles/?format=api
- what is the impact of the accept header?
 */

export default function (){
    const url = 'https://test-api.k6.io/public/crocodiles/';

    let headerParam = {
        headers: {
            'Content-Type': 'application/json',
            // 'Accept': 'text/html' // see more info at https://developer.mozilla.org/en-US/docs/Glossary/Request_header
        }
    }

    let respons = http.get(url,headerParam);
     let body = JSON.parse(respons.body)
    console.log(respons.request)
    console.log(`Number of crocodiles: ${body.length}, First element: ${body[1].name}`)

    check(respons, {
        'is status is 200: ' : (r) => r.status === 200,
        'message body is not empty: ' : (r) => r.body.length !== 0,
    });
}