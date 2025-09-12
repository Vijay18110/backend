// fast2smsOtp.js
const axios = require('axios');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

async function sendOTP(phoneNumber) {
    const otp = generateOTP();

    const message = `Your OTP is ${otp}. Please do not share it with anyone.`;
    try {
        const response = await axios.post(
            'https://www.fast2sms.com/dev/bulkV2',
            {
                variables_values: otp,
                route: 'otp',
                numbers: phoneNumber,
                // message: message,
            },
            {
                headers: {
                    authorization: process.env.FAST2SMS_API_KEY, // Ensure you have set this in your environment variables
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('OTP sent:', response.data);
        return otp;
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = sendOTP;
