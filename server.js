const express = require("express");
const fs = require("fs");
 

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// created route to index html
app.get("/", (req, res)=> {
    res.sendFile(`${__dirname}/Develop/public/index.html`);
});

// route to notes html
app.get("/notes", (req, res) => {
    res.sendFile(`${__dirname}/Develop/public/notes.html`)
});


