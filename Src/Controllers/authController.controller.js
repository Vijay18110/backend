const jsonwebtoken = require('jsonwebtoken');
exports.login = (req, res) => {
    const { mobileNo, password } = req.body;
    // Here you would typically check the mobileNo and password against a database
    if (mobileNo === '9628554907' && password === '123456') {
        // If the credentials are valid, you might generate a token or set a session
        // For this example, we'll just send a success message
        // In a real application, you would return a JWT or session ID here
        const token = jsonwebtoken.sign({ mobileNo }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // only over HTTPS
            sameSite: "Strict",
        });
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}
exports.logout = (req, res) => {
    // Clear the token cookie to log out the user\
    // In a real application, you might also invalidate the token on the server side
    // Here we just clear the cookie
    const token = req.headers && req.headers["authorization"].split(" ")[1]; // Assuming the token is sent in the Authorization header as Bearer token
    if (!token) {
        return res.status(400).json({ message: 'No token found, already logged out.' });
    }
    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (decodedToken?.mobileNo !== 'vijay18110') {
        return res.status(400).json({ message: 'invalid Token!' });
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // only over HTTPS
        sameSite: "Strict",
    });
    res.status(200).json({ message: 'Logout successful!' });
}