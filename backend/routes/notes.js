const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const { set } = require('mongoose');


// ROUTE:1 fetch notes of a user :GET"/api/notes/fetchallnotes".  login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    let notes = await Note.find({ user: req.user.id })
    res.json(notes)
})

// ROUTE:2 add a new note of a user :POST"/api/notes/addnote".  login required

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid tilte').isLength({ min: 3 }),
    body('discription', 'enter a valid discription').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {

        try {
            const { title, discription, tag } = req.body;
            const note = new Note({
                title, discription, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)

        } catch (error) {
            console.log(error)
        }

    } else {
        // if there is error then show error
        res.send({ errors: result.array() });
    }
})

// ROUTE:3 update an existing  note of a user :PUT"/api/notes/updatenote/:id".  login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, discription, tag } = req.body;

    try {

        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (discription) { newNote.discription = discription };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.log(error)
    }
})


// ROUTE:4 delete an existing  note of a user :DELETE"/api/notes/deletenote/:id".  login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        //allows deletion only if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "sucess": "Your note has been deleted" })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router