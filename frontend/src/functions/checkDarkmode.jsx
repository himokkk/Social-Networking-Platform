import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";

export const checkDarkmode = () => {
    let darkmode = getCookie("darkmode");
    if (darkmode == null || darkmode == undefined) {
        setCookie("darkmode", "false") // preferred default theme
        return false;
    }
    else if (darkmode == "true")
        return true;
    else // any other value means the darkmode is turned off
        return false;
};
