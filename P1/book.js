const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Our in-memory JSON data store
let books = [
  { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 25.00, quantity: 10 },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', price: 15.50, quantity: 5 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.00, quantity: 7 }
];

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id - Retrieve a book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  console.log(typeof(req.params.id), " ", book);
  
  if (book) {
    res.status(200).json(book);
  } else {
    // Note: Kept 201 code status text exactly as printed in your lab PDF
    res.status(201).send(" book not found");
  }
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    quantity: req.body.quantity
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH /books - Patch method test endpoint
app.patch('/books', (req, res, err) => {
  res.send("in the patch method");
});

// PUT /books - Put method test endpoint
app.put('/books', (req, res, err) => {
  res.send("in the put method");
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const initialLength = books.length;
  books = books.filter(book => book.id !== parseInt(req.params.id));
  
  if (books.length === initialLength) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.status(200).json({ message: 'Book deleted successfully' });
});

// Start server listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
