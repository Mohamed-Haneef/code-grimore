const express = require('express');
const Note = require('../models/Note');
const authMiddleware = require('../middleware/auth_mw.js');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const notes = await Note.find({ userId: req.user.userId });
  res.send(notes);
});

router.post('/', async (req, res) => {
  try {
    const note = new Note({
      content: req.body.content,
      userId: req.user.userId,
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send({ message: 'Error creating note', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting note', error });
  }
});

module.exports = router;
