import http from 'k6/http';
import { check, group, sleep } from "k6";
import { getToken } from "../../../common/getCsrftoken.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { Trend } from "k6/metrics";
import { getRandomUser } from "../../../common/getRandomUser.js";

const myTrend = new Trend('my_trend');

export async function httpLoginTest() {

    // get csrftoken
    let csrftoken = await getToken(); // await is nodig omdat js anders niet wacht op antwoord van functie
    // console.debug(`csrftoken: ${csrftoken}`)

    // Get random username and password from array
    let randomUser = getRandomUser();
    let username = randomUser.username;
    let password = randomUser.password;

    // Add a group name for multiple requests, async await constructie mag wel in maar in buiten de functie gebruikt worden
    group('Authenticate', function (){

        //open news page
        let responseNews = http.get('https://test.k6.io/news.php');
        let checkNews = check(responseNews, {
            "the news header is present": (res) => res.body.indexOf('In the news') !== -1,
            "news endpoint status is 200": (res) => res.status === 200
        })

        // Add tag to request metric data
        let responseLogin = http.post('http://test.k6.io/login.php', { login: username, password: password, redir: '1', csrftoken: `${csrftoken}` },{
            tags: {
                my_tag: "I'm a tag",
            }
        });

        // Add tag to check
        let checkLogin = check(responseLogin, {
            "is logged in welcome header present": (res) => res.body.indexOf(`Welcome, ${username}!`) !== -1,
            "login endpoint status is 200": (res) => res.status === 200,
        }, {my_tag: "I'm a tag"});

        // Add tag to custom metric
        // console.log(JSON.stringify(responseLogin.timings))
        myTrend.add(responseLogin.timings.duration, { my_tag: "I'm a tag"});

        // console.debug(`responseLogin: ${JSON.stringify(responseLogin)}`);
        // console.debug(`timings: ${JSON.stringify(response.timings)}`);

    })

    //let randomSleep = Math.random() * 5;
    let randomSleep = randomIntBetween(1,5);
    sleep(randomSleep);
}