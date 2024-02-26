import http from "k6/http";
import {check, sleep} from "k6";

export function apiFunMethodsTest(){
    let response = http.get('https://k6-http.grafana.fun/image');

    check(response, {
        'body size is bigger than 0 bytes': (res) => res.body.length > 0
    })
    console.debug(`response body length: ${response.body.length}`)

    sleep(1);
}