import React from "react";
import { API_ADMIN } from "../../urls";

const Admin = () => {
    window.onload = function() {
        window.location.href = API_ADMIN;
    }
    return <div className={"Admin"}></div>
}

export default Admin;
