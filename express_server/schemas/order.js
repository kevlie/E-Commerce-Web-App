
const uuidv4 = require("uuid/v4");
const { ItemSchema } = require("../models/item");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId :{
        type: String,
        required: true,
        default: uuidv4
    },
    userId :{
        type: String,
        required: true
    },
    items: {
        type: [ItemSchema],
        required: true,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length
            },
            message: "There needs to be at least one item per order."
        }
    }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    Order
};



