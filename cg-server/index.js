// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const data = require('./config.json');
// console.log(data.db_name)

// //Database values

// const db_user = data.db_user;
// const db_password = data.db_password;
// const db_host = data.db_host;
// const db_port = data.db_port;
// const db_name = data.db_name;


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const port = process.env.PORT || 8444;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://webzard:webzard123@mongodb.selfmade.ninja:27017/webzard_sticky_notes?authSource=users')
// const noteSchema = new mongoose.Schema({
//   heading: String,
//   content: String,
// });

// const Note = mongoose.model('Note', noteSchema)

// // Routes
// app.get('/api/message', (req, res) => {
//   res.json({ message: 'Hello from Express.js backend!' });
// });

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

// // Get all notes
// app.get('/api/notes', async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.json(notes);
//   } catch (error) {
//     res.status(500).send({ message: 'Error fetching notes', error });
//   }
// });

// // Create a new note
// app.post('/api/notes', async (req, res) => {
//   const { heading, content } = req.body;

//   // Validate request
//   if (!heading || !content) {
//     return res.status(400).send({ message: 'Heading and content are required' });
//   }

//   try {
//     const note = new Note({
//       heading,
//       content,
//     });
//     await note.save();
//     res.status(201).send(note);
//   } catch (error) {
//     res.status(500).send({ message: 'Error creating note', error });
//   }
// });

// // Delete a note
// app.delete('/api/notes/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Note.findByIdAndDelete(id);
//     res.status(200).send({ message: 'Note deleted successfully' });
//   } catch (error) {
//     res.status(500).send({ message: 'Error deleting note', error });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./endpoints/auth');
const noteRoutes = require('./endpoints/notes');
const connectDB = require('./configuration/database');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

