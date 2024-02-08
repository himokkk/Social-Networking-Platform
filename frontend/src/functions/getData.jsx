import { getCookie } from "./getCookie";

export const getData = async (url,is_acces = false) => {
    const csrftoken = getCookie("csrftoken");
    const access = getCookie("access");
    try {
        const headers = new Headers()
        headers.append("X-CSRFToken", csrftoken);
        if (is_acces && access) {
            headers.append("Authorization", `Bearer ${access}`)
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during GET request: ", error);
        throw error;
    }
};