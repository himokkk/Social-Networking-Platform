const debug = True
const API_BASE = "";
if (debug) {
    API_BASE = "http://localhost:8000"
} else {
    API_BASE = "https://api.ziomki.online"
}
export const API_BASE_URL = API_BASE;
export const API_LOGIN = `${API_BASE_URL}/user/login/`;
export const API_REGISTER = `${API_BASE_URL}/user/register/`;
export const API_LOGIN_REFRESH = `${API_BASE_URL}/user/login/refresh/`;
export const API_CREATE_POST = `${API_BASE_URL}/posts/create`;
export const ROOT_URL = "/";
export const MAIN_URL = "/main";
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const TERMS_URL = "/terms";
export const DEBUG_URL = "/debug";
export const CHAT_URL = "/chat";
