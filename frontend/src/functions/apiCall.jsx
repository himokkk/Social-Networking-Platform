import { getCookie } from "./getCookie";

export const apiCall = async (url, method, data) => {
    const csrftoken = getCookie("X-CSRFToken");
    const access = getCookie("access");
    try {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("X-CSRFToken", csrftoken);
        if (access) {
            headers.append("Authorization", `Bearer ${access}`)
        }
        return await fetch(url, {
            method: method,
            headers: headers,
            body: data
        });
    }
    catch (error) {
        console.log("Error during ${method} api call: ", error);
    }
    return null;
};
