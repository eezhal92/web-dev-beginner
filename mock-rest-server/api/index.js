const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = {
  _lastID: 3,
  _data: {
    1: { id: 1, name: 'John Doe', age: 12 },
    2: { id: 2, name: 'Alex', age: 13 },
    3: { id: 3, name: 'Mark', age: 14 },
  },
  _nextID () {
    const nextID = this._lastID + 1;
    this._lastID = nextID;
    return nextID;
  },
  remove(id) {
    if (!this._data[id]) {
      throw new Error(`Student with ID of ${id} was not found`)
    }
    delete this._data[id];
  },
  add(name, age) {
    const nextID = this._nextID();
    const data = { id: nextID, name, age };
    this._data[nextID] = data;
    return data;
  },
  getAll() {
    return Object.values(this._data);
  },
};

app.get('/api/students', (req, res) => {
  const students = storage.getAll();

  res.json(students);
});

app.post('/api/students', (req, res) => {
  const errors = [];
  const { name, age } = req.body;

  if (name == undefined || typeof name !== 'string') {
    errors.push('name is required and should be a string');
  }

  if (age == undefined || typeof age !== 'number') {
    errors.push('age is required and should be a number');
  }

  if (errors.length) {
    res.status(422).json({ errors });
    return;
  }

  const newStudent = storage.add(name, age);

  res.status(201).json({ newStudent });
});

app.delete('/api/students/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    storage.remove(id);
    res.json({ message: 'student was successfully removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = app;
