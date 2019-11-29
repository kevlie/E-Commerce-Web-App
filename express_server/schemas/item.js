const { historicalPriceSchema } = require("../models/historicalPrice");
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const InventoryItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceHistory: [historicalPriceSchema],

    image: {
        type: Buffer,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        default: ""
    }
});

const Item = mongoose.model('InventoryItem', InventoryItemSchema);

module.exports = Item;