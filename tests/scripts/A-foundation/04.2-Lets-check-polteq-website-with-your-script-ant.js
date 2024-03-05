import http from 'k6/http';
import { check } from "k6";

/*
- add Polteq website url
- add options to run multiple times (--vus 2 --duration 5s)
- add multiple checks on the response (checks don't stop the execution but validate the response)
- add check on body content (like address of Polteq NL is returned (see: https://k6.io/docs/javascript-api/k6-http/response/response-html/)
 */

export default function (){
    let response = http.get('https://www.polteq.com');

    console.log(`Response status: ${response.status}`)
    // negative response validation
    // check(response, {'is response status 404:': (r) => r.status === 404});

    check(response, {'is response status 200:': (r) => r.status === 200});

    // validate/check a html element
    let doc = response.html();
    // doc
    //     .find('link')
    //     .toArray()
    //     .forEach(function (item){
    //         console.log(item.attr('href'));
    //     })

    doc
        .find('div')
        .toArray()
        .forEach(function (item){
            if(item.attr('id')!== undefined){
                console.log(`item: ${JSON.stringify(item.attr('id'))}`) // JSON.stringify make string from object
            }

            if(item.attr('id') === 'footer'){
                let footer = item.contents().text().replaceAll(/(\s+)/gm, " "); // remove multiple whitespaces from string and replace with single space
                console.log(footer)
                check(footer, {'NL address of Polteq is found: ' :(r) => r.includes('Printerweg')})
            }
        })

}