import { getCookie } from "./getCookie";

export const apiCall = async (url, method, data) => {
    const access = getCookie("access");
    try {
        return await fetch(url, {
            method: method,
            headers: {
                "Authorization": `Bearer ${access}`,
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
