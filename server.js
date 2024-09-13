// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes=require('./routes/auth');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.use(express.json());

app.use('/task', itemRoutes);
app.use('/api/auth', authRoutes);

const PORT=8080;
app.listen(PORT, () => console.log(`Server running on port: 8080`));
