const router = require("express").Router();
const store = require("../db/store");

router.get("/api/notes", function(req, res) {
    store//from store.js
        .getNotes()

        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post("/api/notes", (req, res) => {

    store
    .addNotes(req.body)//request whole note body as arg.
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

router.delete("/api/notes/:id", function(req, res) {
    store
      
    .removeNotes(req.params.id)//request id function from store.js
      .then(() => res.json({ ok: true }))
      .catch(err => res.status(500).json(err));
  });
  

module.exports = router;
