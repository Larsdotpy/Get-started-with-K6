import { parseHTML } from 'k6/html';
import http from 'k6/http';

/*
see more info about selecting HTML elements: https://k6.io/docs/javascript-api/k6-html/selection/
 */

export default function () {
    let res = http.get('https://k6.io');
    let doc = parseHTML(res.body); // equivalent to res.html()
    let pageTitle = doc.find('head title').text();
    let langAttr = doc.find('html').attr('lang');

    let doc2 = res.html();
    let pageTitle2 = doc2.find('head title').text();
    let langAttr2 = doc2.find('html').attr('lang');

    // compare parseHTML and html() method
    console.log(`pageTitle: ${pageTitle}, pageTitle2: ${pageTitle2}`);
    console.log(`langAttr: ${langAttr}, langAttr2: ${langAttr2}`);

    // open second website
    res = http.get('https://www.polteq.com');
    doc = res.html()
    pageTitle = doc.find('head title').text();
    langAttr = doc.find('html').attr('lang');
    let h1 = doc.find('h1').text();
    console.log(`pageTitle: ${pageTitle}, langAttr: ${langAttr}, H1: ${h1}`);
}
