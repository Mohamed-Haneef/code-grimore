const express = require('express');
const authMiddleware = require('../middleware/auth_mw.js');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    if (req.token) {
        res.status(200).send({ message: 'Verification success' });
    } else {
        res.status(401).send({ message: 'Access denied' });
    }
});

module.exports = router;