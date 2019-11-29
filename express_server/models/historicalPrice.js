const mongoose = require('mongoose')

const historicalPriceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    }
}, {_id: false});

module.exports = {
    historicalPriceSchema: historicalPriceSchema
};