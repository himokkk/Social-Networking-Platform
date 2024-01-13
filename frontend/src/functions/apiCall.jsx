import { getCookie } from "./getCookie";

export const apiCall = async (url, method, data) => {
    const csrftoken = getCookie("csrftoken");
    try {
        return await fetch(url, {
            method: method,
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json",
            },
            body: data
        });
    }
    catch (error) {
        console.log("Error during ${method} api call: ", error);
    }
    return null;
};
