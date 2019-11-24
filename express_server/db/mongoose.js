const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/userdb'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose }