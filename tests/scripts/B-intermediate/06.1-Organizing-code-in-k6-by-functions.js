import { check } from 'k6';
import http from 'k6/http';
import { group } from 'k6';

const domain = 'http://ecommerce.k6.io';

export default function () {
    Homepage();
    ProductPage();
    CartPage();
    AccountPage();
    SamplePage();
}

export function Homepage() {
    group('01_HomePage', function () {

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
}

export function ProductPage() {
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

export function CartPage() {
    group('02_CartPage', function () {
        let response = http.get(domain +'/cart/');
        check(response, {
            'Cart is successfully loaded': (r) => r.body.includes("Cart"),
        });
    });
}

export function AccountPage() {
    group('03_MyAccount', function () {
        let response = http.get(domain +'/my-account/');
        check(response, {
            'My account is successfully loaded': (r) => r.body.includes("My account"),
        });
    });
}

export function SamplePage() {
    group('04_SamplePage', function () {
        let response = http.get(domain +'/sample-page/');
        check(response, {
            'Sample page is successfully loaded': (r) => r.body.includes("Sample Page"),
        });
    });
}