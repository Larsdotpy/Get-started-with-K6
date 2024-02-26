import { httpLoginTest } from "../scripts/C-future-ideas/05-full-modular-main-script/http-login-test.js";
import {browserLoginTest} from "../scripts/C-future-ideas/05-full-modular-main-script/browser-login-test.js";

export async function login(){
    await httpLoginTest();
    await browserLoginTest();
}