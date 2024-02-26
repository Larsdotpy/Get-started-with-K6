import { parseHTML } from 'k6/html';
import http from 'k6/http';

/*
see more info about parsing whole website: https://stackoverflow.com/questions/60927653/downloading-whole-websites-with-k6/
 */

export default function () {
    // const res = http.get("https://stackoverflow.com");
    // let doc = parseHTML(res.body);
    // doc.find("link").toArray().forEach(function (item) {
    //     let link = item.attr("href");
    //
    //     console.log(`item: ${item.attr("href")}`);
    //     // make http gets for it
    //     // or added them to an array and make one batch request
    //     let result;
    //     if(!link.includes('https')){
    //         result = http.get(`https://stackoverflow.com${link}`)
    //     }else {
    //         result = http.get(`${link}`);
    //     }
    //     console.log(`result status: ${result.status}`);
    // });

    // second example
    let query = 'testing';
    const search = http.get(`https://www.nu.nl`);
    let doc = parseHTML(search.body);
    console.log(search.body)
    let link = item.attr("href");
    doc.find("link").toArray().forEach(function (item) {
        let link = item.find('href');

        console.log(link);
        // make http gets for it
        // or added them to an array and make one batch request
        // let result;
        // if(!link.includes('https')){
        //     result = http.get(`https://stackoverflow.com${link}`)
        // }else {
        //     result = http.get(`${link}`);
        // }
        // console.log(`result status: ${result.status}`);
    });
}
