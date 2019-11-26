const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ItemSchema = new mongoose.Schema({
    itemId : {
        type: String,
        required: true,
        default: uuidv4
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = {
    ItemSchema,
    Item,
};