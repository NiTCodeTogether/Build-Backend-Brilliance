const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:password1234@code-together.b62wf.mongodb.net/?retryWrites=true&w=majority&appName=code-together";

const app = express();
const port = 3000;
async function run() {
    try {
      await mongoose.connect(uri);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(err){
        console.log("Error connecting to MongoDB: ", err);
    }
  }

let notes = [];

// Get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Get a single todo by id
app.get('/notes/:id', (req, res) => {
    const todo = notes.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Create a new todo
app.post('/notes', (req, res) => {
    const todo = {
        id: notes.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    notes.push(todo);
    res.status(201).json(todo);
});

// Update a todo by id
app.put('/notes/:id', (req, res) => {
    const todo = notes.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json(todo);
});

// Delete a todo by id
app.delete('/notes/:id', (req, res) => {
    const todoIndex = notes.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    notes.splice(todoIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    run();
    console.log(`Todo app listening at http://localhost:${port}`);
});