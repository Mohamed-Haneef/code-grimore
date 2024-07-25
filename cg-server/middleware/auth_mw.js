const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Token not present', token_failure: true });
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        req.token = true;
        console.log("request user: " + JSON.stringify(req.user) + ", request token: " + req.token);
        next();
    } catch (error) {
        const tok = "response token: " + token;
        res.status(400).send({ message: tok, token_failure: true });
    }
};

module.exports = authMiddleware;
