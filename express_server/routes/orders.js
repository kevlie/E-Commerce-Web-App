const express = require("express");
const router = express.Router();
const { Order } = require("../schemas/order");
const uuidv4 = require("uuid/v4");

router.get("", (req, res) => {
    Order.find({userId: req.header("userId")}).exec().then(orders => {
        res.status(200).json(orders);
    });
});

router.get("/:orderId", (req, res) => {
    Order.findOne({id: req.params.orderId, userId: req.header("userId")}).exec().then(order => {
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({
                message: `Order ${req.params.orderId} does not exist for user ${req.header("userId")}`
            });
        }
    })
});

router.post("", (req, res) => {
    let newId = uuidv4();
    Order.findOne({id: newId}).exec().then(doc => {
        if (!doc) {
            let newOrder = new Order({
                id: newId,
                userId: req.header("userId"),
                items: req.body.items,
            });
            newOrder.save().then(order => {
                    res.status(201).json({...(order._doc),...{href: req.url + `/api/orders/${newId}`}})
                }
            )
        } else {
            res.status(400).json({
                message: `Bad request, order ${newId} already exists.`
            })
        }
    })
});

router.patch("/:orderId", (req,res) => {
    let query = {
        id: req.params.orderId,
        userId: req.header("userId")
    };
    let updates = {
        items: req.body.items,
        lastUpdated: Date.now()
    };
    Order.findOne(query).exec().then(order => {
        if(order) {
            Order.findOneAndUpdate(query, updates, {new: true}).exec().then(updatedOrder => {
                res.status(202).json(updatedOrder)
            });
        } else {
            res.status(404).json({
                message: `Order ${req.params.orderId} not found for user ${req.header("userId")}`
            })
        }
    }).catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router;