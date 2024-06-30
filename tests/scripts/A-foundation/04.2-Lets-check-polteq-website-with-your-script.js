import http from 'k6/http';
import { check } from "k6";

/*
- add Polteq website url
- add options to run multiple times (--vus 2 --duration 5s)
- add multiple checks on the response (checks don't stop the execution but validate the response)
- add check on body content (like address of Polteq NL is returned (see: https://k6.io/docs/javascript-api/k6-http/response/response-html/)
 */

export const options = {
    vus: 2,
    duration: '5s'
};

export default function (){
    let response = http.get('https://www.polteq.com');

    console.log(`Response status: ${response.status}`)

    // negative response validation
    check(response, {'is response status 404:': (r) => r.status === 404,
    'has Server header': (r) => r.headers['Server'] !== undefined});

    let doc = response.html();
    doc
        .find('div')
        .toArray()
        .forEach(function (item){
            if(item.attr('id') === 'footer'){
                check(item.text(), {
                    'Validate if footer contains "Werken bij Polteq"': (text) => text.includes('Werken bij Polteq'),
                    'Validate if footer contains "Nederland"': (text) => text.includes('Nederland')
                })
            }
        })
}