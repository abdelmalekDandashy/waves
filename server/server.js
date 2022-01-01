const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();
const routes = require('./routes')


// 
const mongoURi = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

// console.log('hiiiiiiiiiiiiiiiiiiiiiiiii ' + mongoURi);

mongoose.connect(mongoURi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

/// body parse
app.use(express.json())


/// sanitize
app.use(xss());
app.use(mongoSanitize());

/// routes
app.use('/api', routes)





const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});