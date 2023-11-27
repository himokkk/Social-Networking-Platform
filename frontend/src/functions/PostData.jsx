import { getCookie } from "./GetCookie";

export const PostData = async (url, data) => {
    const csrftoken = getCookie("csrftoken");
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json",
            },
            body: data
        });
  
        console.log(response)

        if (!response.ok) {
            console.error('Auth failed:', response.statusText);
            return;
        }
    
        const { token } = await response.json();
        console.log('Auth successful. Token:', token);
    }
    catch (error) {
        console.error('Error during auth:', error);
    }
};