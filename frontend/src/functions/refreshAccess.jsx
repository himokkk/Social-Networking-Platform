import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";
import { postData } from "./postData";
import { filterResponse } from "./filterResponse";
import { checkInResponse } from "./checkInResponse";
import { deleteAllCookies } from "./deleteAllCookies";
import { API_LOGIN_REFRESH } from "../urls";

export const refreshAccess = async () => {
    let response = null;
    const refresh = getCookie("refresh");
    if (!refresh) {
        console.log("Refresh token empty")
        // props.setLoggedIn(false);
        return
    }
    try {
        response = await postData(API_LOGIN_REFRESH, JSON.stringify({
            refresh: refresh
        }))
    }
    catch (error) {
        console.log("Error awaiting post: ", error);
    }

    if (response) {
        if (response.ok) {
            // props.setLoggedIn(true);
            console.log("Successful refresh")
            const responseResults = await filterResponse(response, ["access"]);
            const csrftoken = responseResults[0];

            if (csrftoken) {
                setCookie("csrftoken", csrftoken)
                // props.setLoggedIn(true);
                console.log("New access set")
            }
            else {
                // props.setLoggedIn(false);
                console.log("New access token missing")
            }
        }
        else {
            // props.setLoggedIn(false);
            console.log("Unsuccessful refresh")
            if (checkInResponse(response, "token_not_valid")) {
                deleteAllCookies()
            }
        }
    }
    else {
        console.log("Server not responding")
    }
    return
};
