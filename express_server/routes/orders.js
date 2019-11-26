const express = require("express");
const router = express.Router();
const { Order } = require("../schemas/order");
const uuidv4 = require("uuid/v4")

router.get("", (req, res) => {
    Order.find({userId: req.header("userId")}).exec().then(orders => {
        res.status(200).json(orders);
    });
})

router.post("", (req, res) => {
    let newId = uuidv4();
    Order.findOne({orderId: newId}).exec().then(doc => {
        if (!doc) {
            let newOrder = new Order({
                orderId: newId,
                userId: req.header("userId"),
                items: req.body.items,
            })
            newOrder.save().then(
                res.status(201).json({...newOrder,...{href: req.url + `/${newId}`}})
            )
        } else {
            res.status(400).json({
                message: `Bad request, order ${newId} already exists.`
            })
        }
    })
});
module.exports = router;