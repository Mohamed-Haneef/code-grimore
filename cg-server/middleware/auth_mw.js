const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Access denied', token_failure: true });
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        req.token = true;
        console.log("request user: " + req.user + ", request token: " + req.token);
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token', token_failure: true });
    }
};

module.exports = authMiddleware;