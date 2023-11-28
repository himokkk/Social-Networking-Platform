import { getCookie } from "./GetCookie";

export const PostData = async (url, data) => {
    const csrftoken = getCookie("csrftoken");
    var response = null;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json",
            },
            body: data
        });
        return response;
    }
    catch (error) {
        console.log("Error during rest post: ", error);
    }
};
