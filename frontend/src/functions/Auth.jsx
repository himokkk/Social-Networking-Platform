import { getCookie } from "./GetCookie";

export const Authenticate = async (url, username, password) => {
    const csrftoken = getCookie("csrftoken");
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
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
        console.error('Auth during login:', error);
    }
};