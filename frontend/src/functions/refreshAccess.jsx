import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";
import { postData } from "./postData";
import { filterResponse } from "./filterResponse";

export const refreshAccess = async (props) => {
    let response = null;
    const refresh = getCookie("refresh");
    if (!refresh) {
        console.log("Refresh token empty")
        props.setLoggedIn(false);
        return
    }
    try {
        response = await postData("http://localhost:8000/user/login/refresh/", JSON.stringify({
            refresh: refresh
        }))
    }
    catch (error) {
        console.log("Error awaiting post: ", error);
    }

    if (response) {
        console.log(response)
        if (response.ok) {
            props.setLoggedIn(true);
            console.log("Successful refresh")
            const responseResults = await filterResponse(response, ["access"]);
            const csrftoken = responseResults[0];

            if (csrftoken) {
                setCookie("csrftoken", csrftoken)
                props.setLoggedIn(true);
                console.log("New access set")
                return
            }
            else {
                props.setLoggedIn(false);
                console.log("New access token missing")
                return
            }
        }
        else {
            props.setLoggedIn(false);
            console.log("Unsuccessful refresh")
        }
    }
    else {
        console.log("Server not responding")
        return
    }
};
