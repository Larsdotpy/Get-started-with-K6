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

    // save body of the response
    let body = JSON.parse(respons.body)

    // print out the request of the response, see other options: https://k6.io/docs/javascript-api/k6-http/response/
    console.log(`Request: ${JSON.stringify(respons.request)}`)
    console.log(`Number of crocodiles: ${body.length}`)

    // Response body is an array, forEach selects each item from the array and then print out the name of the croc
    body.forEach(croc => {
        console.log(`First name of a croc: ${croc.name}`)
    })

    // save name croc if sex is "M" response in variable, see array methods: https://javascript.info/array-methods
    let newCrocs = [];

    body.forEach(element => {
        if(element.sex === "M"){
            let crocMale = {};
            crocMale.id = element.id;
            crocMale.name = element.name;
            console.log(JSON.stringify(crocMale))
            newCrocs.push(crocMale)
        }
    })
    console.log(newCrocs)

    check(respons, {
        'is status is 200: ' : (r) => r.status === 200,
        'message body is not empty: ' : (r) => r.body.length !== 0,
    });
}