const uuidv4 = require("uuid/v4");
const { OrderItemSchema } = require("../models/orderItem");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    id :{
        type: String,
        required: true,
        default: uuidv4
    },
    userId :{
        type: String,
        required: true
    },
    items: {
        type: [OrderItemSchema],
        required: true,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length
            },
            message: "There needs to be at least one item per order."
        }
    },
    fulfilled: {
        type: Boolean,
        required: true,
        default: false
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    Order
};



