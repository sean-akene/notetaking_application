// Dependencies
const express = require("express");
const path = require("path");
const router = require("express").Router();
const keep = require("./db/keep");
const fs = require("fs")

// Let's initialize the app and set up a port
const app = express();
const PORT = process.env.PORT || 3001;

//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/styles", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

//return all saved notes as JSON
app.get("/api/notes", function (req, res) {
    keep//from keep.js
        .getNotes()

        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

//  * POST 
app.post("/api/notes", (req, res) => {

    keep
        .addNotes(req.body)//request whole note body as arg.
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

//DELETE 
app.delete("/api/notes/:id", function (req, res) {
    keep

        .removeNotes(req.params.id)//request id function from keep.js
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});




// Let's Start the server 
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


