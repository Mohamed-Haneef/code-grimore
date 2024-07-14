const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const User = require('../core/user.js');

const router = express.Router();
const corsOptions = {
    origin: 'https://stickynotes.selfmade.one',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

router.use(cors(corsOptions));

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
});

module.exports = router;
