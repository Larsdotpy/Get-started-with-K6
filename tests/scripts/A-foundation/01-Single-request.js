import http from "k6/http";
/*
- parse response from the response body and view this on https://jsonviewer.stack.hu
- wat is het verschil tussen JSON.parse(response.body) en response.json()
 */

export const options = {
    iterations: 1,
};

export default function () {
    const response = http.get("https://test-api.k6.io/public/crocodiles/");
    console.log(JSON.parse(response.body));
    console.log(response.json())
}
