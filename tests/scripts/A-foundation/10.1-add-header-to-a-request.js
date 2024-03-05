import http from "k6/http";

/*
- what headers can be used, see https://test-api.k6.io/public/crocodiles/?format=api
- what is the impact of the accept header?
 */

export default function (){
    const url = 'https://test-api.k6.io/public/crocodiles/';

    let headerParam = {
        headers: {
            'Content-Type': 'application/json',
            //'Accept': 'text/html'
        }
    }

    let respons = http.get(url,headerParam);
    console.log(respons.request)
    console.log(respons.body)
}