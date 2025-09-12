
exports.loginValildation = (req, res, next) => {
    const { mobileNo, password } = req.body;
    if (!mobileNo || !password) {
        return res.status(400).json({ message: 'mobile No or password are required' });
    }
    if (mobileNo.length !== 10 || password.length < 6) {
        return res.status(400).json({ message: 'mobile No must 10 digit and password at least 6 characters long' });
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(password)) {
        return res.status(400).json({ message: 'Password can only contain alphanumeric characters and special characters !@#$%^&*' });
    }
    next();
}   