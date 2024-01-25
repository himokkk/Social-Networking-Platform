export const registerPasswordCheck = async (
    email,
    password,
    confirmPassword,
    setEmailError,
    setPasswordError,
    setConfirmPasswordError,
) => {
    // reset error checks
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")

    if ("" === email) {
        setEmailError("Please enter your username") //setEmailError("Please enter your email")
        console.log("Register: No username entered")
        return false
    }
    else if ("" === password) {
        setPasswordError("Please enter a password")
        console.log("Register: No password entered")
        return false
    }
    else if (password.length <= 7) {
        setPasswordError("The password must be 8 characters or longer")
        console.log("Register: To short password entered")
        return false
    }
    else if (!(/\d/.test(password))) {
        setPasswordError("The password must contain at least one digit")
        console.log("Register: Password doesn't contain at least one digit")
        return false
    }
    else if (!(/[A-Z]/.test(password))) {
        setPasswordError("The password must contain at least one capital letter")
        console.log("Register: Password doesn't contain at least one capital letter")
        return false
    }
    else if (!(/[a-z]/.test(password))) {
        setPasswordError("The password must contain at least one small letter")
        console.log("Register: Password doesn't contain at least one small letter")
        return false
    }
    else if (!(/[^A-Za-z0-9]/.test(password))) {
        setPasswordError("The password must contain at least one special character")
        console.log("Register: Password doesn't contain at least one special character")
        return false
    }
    else if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords must be identical")
        console.log("Register: Different confirm password entered")
        return false
    }
    return true
};

//// old email check
// else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
//     setEmailError("Please enter a valid email")
//     console.log("Register: Invalid email entered")
//     return false
// }
