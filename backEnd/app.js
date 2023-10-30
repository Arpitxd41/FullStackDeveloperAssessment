require('dotenv').config();

const express = require('express');
const connectToDB = require('./config/database');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'https://localhost:3000', 
    methods: ['GET', 'POST'], 
    optionsSuccessStatus: 204, 
};
  
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Welcome to the Todo App Homepage');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectToDB();

// Admin routes
app.use("/admin", adminRouter);

// User routes
app.use("/user", userRouter);

module.exports = app;