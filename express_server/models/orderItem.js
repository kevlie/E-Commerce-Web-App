const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const OrderItemSchema = new mongoose.Schema({
    itemId : {
        type: String,
        required: true,
        default: uuidv4
    },
    quantity: {
        type: Number,
        required: true
    },
    currentUnitPrice: {
        type: Number,
        required: true
    },
    itemName : {
        type: String,
        required: true
    }
}, {_id: false});

module.exports = {
    OrderItemSchema: OrderItemSchema
};