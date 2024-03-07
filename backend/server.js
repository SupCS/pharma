const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // парсинг JSON-запитів

// Підключення MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const pharmacyRoutes = require('./routes/pharmacyRoutes');
app.use('/api/pharmacies', pharmacyRoutes);
