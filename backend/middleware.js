const jwt = require("jsonwebtoken");
const JWT_SECRET = 'fbhjrsdnckzcueribnvejskzcnk4389w732';



const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: " 1"
        });
    }
    const token = authHeader.split(' ')[1];
    console.log(authHeader)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            msg :"2"
        });
    }
};


module.exports = {
authMiddleware
}