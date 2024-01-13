import { getCookie } from "./getCookie";

export const getData = async (url) => {
    const csrftoken = getCookie("csrftoken");
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "X-CSRFToken": csrftoken,
            },
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