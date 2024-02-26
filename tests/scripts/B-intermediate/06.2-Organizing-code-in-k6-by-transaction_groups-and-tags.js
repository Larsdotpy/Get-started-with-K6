import { check } from 'k6';
import http from 'k6/http';
import { group } from 'k6';

const domain = 'http://ecommerce.k6.io';

// k6 run 06.2-Organizing-code-in-k6-by-transaction_groups-and-tags.js --out csv=06.2-results.csv

export default function () {

    group('01_HomePage', function () {
        /************
         STEP 1: Visit Homepage.
         ************/

        let response = http.get(domain +'/', {
            tags: {
                page: 'Homepage',
                type: 'HTML',
            }
        });
        check(response, {
            'Shop is successfully loaded': (r) => r.body.includes("Shop"),
        });
    });

    /************
     STEP 2: Visit Cart page.
     ************/

    group('02_CartPage', function () {
        let response = http.get(domain +'/cart/');
        check(response, {
            'Cart is successfully loaded': (r) => r.body.includes("Cart"),
        });
    });

    /************
     STEP 3: Visit Account page.
     ************/

    group('03_MyAccount', function () {
        let response = http.get(domain +'/my-account/');
        check(response, {
            'My account is successfully loaded': (r) => r.body.includes("My account"),
        });
    });

    /************
     STEP 4: Visit Sample page.
     ************/

    group('04_SamplePage', function () {
        let response = http.get(domain +'/sample-page/');
        check(response, {
            'Sample page is successfully loaded': (r) => r.body.includes("Sample Page"),
        });
    });

    /************
     STEP 5: Visit Account page.
     ************/

    group('05_ProductPage', function () {
        let product = ['album', 'beanie', 'beanie-with-logo'];
        let rand = Math.floor(Math.random() * product.length);
        let productSelected = product[rand];

        let response = http.get(domain +'/product/' + productSelected, {
            tags: { name: 'ProductPage'},
        });
        check(response, {
            'Product page is successfully loaded': (r) => r.body.includes("Add to cart"),
        });
    });
}