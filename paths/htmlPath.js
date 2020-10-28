var path = require("path");
var router = require("express").Router();


router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/notes.html"))
});

router.get("/styles", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"))
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"))
});

module.exports = router;