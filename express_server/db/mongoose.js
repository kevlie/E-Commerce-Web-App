const mongoose = require('mongoose')

const localURL = 'mongodb://localhost:27017/userdb'

const mongodbAtlasURL= `mongodb+srv://admin:csc309@csc309cluster-bopu1.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(mongodbAtlasURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = { mongoose }