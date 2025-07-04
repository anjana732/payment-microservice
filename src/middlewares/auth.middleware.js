import jwt from "jsonwebtoken";

const authMiddleware = (req,res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({message: 'Missing token'});

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });

    }
}

export default authMiddleware;