import { browser } from "k6/experimental/browser";
import exec from 'k6/execution';
import { check } from "k6";
import { getRandomUser } from "../../../common/getRandomUser.js";

export async function browserLoginTest() {
    const page = browser.newPage();

    try {

        await page.goto('http://test.k6.io/my_messages.php');

        check(page, {
            'header-unauthorized': page.locator('h2').textContent() == 'Unauthorized'
        })

        page.screenshot({path: `tests/reports/screenshots/before-login-${exec.scenario.iterationInInstance}.png`});

        // Get random username and password from array
        let randomUser = getRandomUser();
        let username = randomUser.username;
        let password = randomUser.password;

        page.locator('input[name="login"]').type(username);
        page.locator('input[name="password"]').type(password);

        const submitButton = page.locator('input[type="submit"]')

        await Promise.all([
            page.waitForNavigation(),
            submitButton.click(),
        ]);

        check(page, {
            'header-welcome': page.locator('h2').textContent() == `Welcome, ${username}!`
        });

        // ${exec.scenario.iterationInInstance}
        page.screenshot({path: `tests/reports/screenshots/after-login-${exec.scenario.iterationInInstance}.png`});

    } finally {
        page.close();
    }
}