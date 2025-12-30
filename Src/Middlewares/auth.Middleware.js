/// auth middleware

const jsonwebtoken = require("jsonwebtoken");
const ApiResponse = require("../Utility/ApiResponse");

exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ data: await ApiResponse.error("Unauthorized access", 401) });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (id, role, etc.)
    return next();
  } catch (err) {
    console.error("Auth error:", err);
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ data: await ApiResponse.error("Login Token Expired", 401) });
    }
    return res
      .status(401)
      .json({
        data: await ApiResponse.error("Invalid or Forbidden Token", 401),
      });
  }
};
