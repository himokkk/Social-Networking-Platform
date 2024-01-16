import { getCookie } from "./getCookie";

export const apiCall = async (url, method, data) => {
    const csrftoken = getCookie("csrftoken");
    const token = getCookie("token");
    try {
        return await fetch(url, {
            method: method,
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: data
        });
    }
    catch (error) {
        console.log("Error during ${method} api call: ", error);
    }
    return null;
};
