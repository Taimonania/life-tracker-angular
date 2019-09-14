import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API route for the entries
app.use('/api/entries', require('./routes/entries'));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));