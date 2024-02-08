import { getCookie } from "./getCookie";

export const apiCall = async (url, method, data = null, is_content_JSON = true) => {
    const csrftoken = getCookie("X-CSRFToken");
    const access = getCookie("access");
    try {
        const headers = new Headers()
        if (is_content_JSON) { headers.append("Content-Type", "application/json") }

        headers.append("X-CSRFToken", csrftoken);
        if (access) {
            headers.append("Authorization", `Bearer ${access}`)
        }
        if (data) {
            return await fetch(url, {
                method: method,
                headers: headers,
                body: data
            });
        }
        return await fetch(url, {
            method: method,
            headers: headers
        });
    }
    catch (error) {
        console.log("Error during ${method} api call: ", error);
    }
    return null;
};
