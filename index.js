require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const principalRoutes = require('./routes/principal');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const authenticate = require('./middleware/auth');
const url = "mongodb://127.0.0.1:27017/SchoolDatabase";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/principal', authenticate, principalRoutes);
app.use('/student',authenticate, studentRoutes);
app.use('/teacher',authenticate, teacherRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
