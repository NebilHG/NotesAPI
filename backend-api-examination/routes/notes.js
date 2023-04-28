const Router = require('express');
const router = new Router();

const {auth} = require('../middleware/auth');
const {validateNoteParams} = require('../middleware/check');


const {getNotes, addNote, removeNote, updateNote, findNoteByTitle} = require('../models/notes')




router.get('/',auth, async(req, res) => {
    try {
        const notes = await getNotes();
        res.json(notes);
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
})



router.post('/',auth,validateNoteParams, async(req, res) => {
    try {
      const note = {
        title: req.body.title,
        text: req.body.text
      };
      const addedNote = await addNote(note);
      res.json({success: true, note: addedNote});
    } catch (err) {
      res.status(500).json({success: false, error: err.message});
    }
});






router.delete('/:id',auth, async (req, res) => {
    try {
      const id = req.params.id;
      const result = await removeNote(id);
      if (result.success) {
        res.json({ success: true, notes: result.notes });
      } else {
        res.status(404).json({ success: false, message: result.message });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
});
  


router.put('/:id',auth, async (req, res) => {
    const id = req.params.id;
    const updatedNote = {
      title: req.body.title,
      text: req.body.text
    };
    try {
      const result = await updateNote(id, updatedNote);
      if (result.success) {
        res.json({ success: true, notes: result.notes });
      } else {
        res.status(404).json({ success: false, message: result.message });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
  router.get('/search', auth, async(req, res) => {
    try {
        const title = req.query.title;
        const result = await findNoteByTitle(title);
        if (result.success) {
            res.json({ success: true, note: result.note });
        } else {
            res.status(404).json({ success: false, message: result.message });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
  


  module.exports = router