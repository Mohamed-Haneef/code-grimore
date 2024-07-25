const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const authRoutes = require('./endpoints/auth');
const noteRoutes = require('./endpoints/notes');
const connectDB = require('./configuration/database');

const app = express();

const PORT = process.env.PORT || 8444;

connectDB();

app.use(express.json());
const corsOptions = {
  origin: 'https://stickynotes.selfmade.one',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

