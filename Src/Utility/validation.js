exports.validateMobile = (input) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile (10 digits, starts 6-9)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mobileRegex.test(input)) {
        return true
    }
    else false
}
exports.validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(input)) {
        return true
    }
    else false
}