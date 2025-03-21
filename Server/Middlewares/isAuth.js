import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "yourSecretKey");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

export default isAuth;
