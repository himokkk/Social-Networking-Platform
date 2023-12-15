import { checkDarkmode } from "./checkDarkmode";
import { setCookie } from "./setCookie";

export const toggleDarkmode = (new_value) => {
    let current_value = checkDarkmode()
    if (current_value == new_value) {
        console.log("Attempting to set the same darkmode value")
        return
    }
    if (current_value)
        setCookie("darkmode", "false")
    else
        setCookie("darkmode", "true")
    console.log("Darkmode toggled")
    return
};
