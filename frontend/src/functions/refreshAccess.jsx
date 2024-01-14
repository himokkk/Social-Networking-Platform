import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";
import { apiCall } from "./apiCall";
import { filterResponse } from "./filterResponse";
import { checkInResponse } from "./checkInResponse";
import { deleteAllCookies } from "./deleteAllCookies";
import { API_LOGIN_REFRESH } from "../urls";

export const refreshAccess = async () => {
    let loggedIn = false;
    let response = null;
    const refresh = getCookie("refresh");
    if (!refresh) {
        console.log("Refresh token empty")
        return
    }
    try {
        response = await apiCall(API_LOGIN_REFRESH, "POST", JSON.stringify({
            refresh: refresh
        }))
    }
    catch (error) {
        console.log("Error awaiting post: ", error);
    }

    if (response) {
        if (response.ok) {
            console.log("Successful refresh")
            const responseResults = await filterResponse(response, ["access"]);
            const csrftoken = responseResults[0];

            if (csrftoken) {
                setCookie("csrftoken", csrftoken)
                loggedIn = true
                console.log("New access set")
            }
            else {
                console.log("New access token missing")
            }
        }
        else {
            console.log("Unsuccessful refresh")
            if (checkInResponse(response, "token_not_valid")) {
                deleteAllCookies()
            }
        }
    }
    else {
        console.log("Server not responding")
    }
    return loggedIn
};
