const express = require("express");
const fs = require("fs");
const util = require('util');
const path = require("path");

const app = express();
const PORT = 3001;

const asyncRead = util.promisify(fs.readFile);
const asyncWrite = util.promisify(fs.writeFile);
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./Develop/public")));

app.get("/api/notes", async (req, res, next) => {
    try {
      const data = await asyncRead("./Develop/db/db.json", "utf-8");
      res.send(data);
    } catch (err) {
      next(err); // This will pass the error to the error-handling middleware
    }
  });

  app.post("/api/notes", async (req, res, next) => {
    const note = req.body;
    try {
      const data = await asyncRead("./Develop/db/db.json", "utf-8");
      const notes = JSON.parse(data);
      note.id = notes.length + 1;
      notes.push(note);
      await asyncWrite("./Develop/db/db.json", JSON.stringify(notes));
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });
  app.delete("/api/notes/:id", async (req, res, next) => {
    try {
    const idDelteNote = parseInt(req.params.id);
    const notes = JSON.parse(data);

    }
  })

// created route to index html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// route to notes html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// This is a middleware error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

