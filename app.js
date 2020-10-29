// Dependencies
const express = require("express");
const path = require("path");
const router = require("express").Router();
const store = require("../db/store");
const fs = require("fs")

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());//a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.
app.use(express.urlencoded({ extended: true })); //If extended is false, you can not post "nested object"
app.use(express.static("public"));


router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

router.get("/styles", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"))
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON
router.get("/api/notes", function (req, res) {
    store//from store.js
        .getNotes()

        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

//  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
router.post("/api/notes", (req, res) => {

    store
        .addNotes(req.body)//request whole note body as arg.
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

//DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
router.delete("/api/notes/:id", function (req, res) {
    store

        .removeNotes(req.params.id)//request id function from store.js
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});




// Start the server on the port
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


