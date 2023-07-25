const express = require('express'); // Require Express module
const session = require('express-session'); // Require Express session module
const path = require('path');
const bodyParser = require('body-parser'); // Require body-parser module

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));

// Add session middleware
app.use(session({
    secret: 'node_tutorial',
    resave: true,
    saveUninitialized: true
}));

// Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory array to store notes
let notes = [];

// Now you can define your routes and other configurations for the app
app.get("/notes", function (req, res) {
    console.log("reading notes", notes);
    res.send(notes);
});

app.post("/notes", function (req, res) {
    let note = req.body.note; // Assuming the request contains the 'note' field in the body
    notes.push({ id: Date.now(), text: note });
    console.log("added note", notes);
    res.end();
});

app.delete("/notes/:id", function (req, res) {
    const noteId = parseInt(req.params.id);
    notes = notes.filter((note) => note.id !== noteId);
    console.log("deleted note", notes);
    res.end();
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
