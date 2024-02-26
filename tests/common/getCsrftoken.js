import http from "k6/http";
import {check, group} from "k6";

export async function getToken(){

            let responseMessages = await http.get("http://test.k6.io/my_messages.php");
            let checkMessages = check(responseMessages, {
                "Users should not be authenticated. Is unauthorized header present?": (res) => res.body.indexOf("Unauthorized") !== -1,
                "messages endpoint response status is 200": (res) => res.status === 200,
            });

            const vars = {}
            vars["csrftoken"] = responseMessages.html().find("input[name=csrftoken]").first().attr("value");
            // console.debug(vars["csrftoken"]);

            return vars["csrftoken"];
}
