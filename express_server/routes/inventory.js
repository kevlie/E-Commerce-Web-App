const Item = require("../schemas/item");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uuidv4 = require("uuid/v4")

router.post("", upload.single('itemImage'), (req, res) => {
    const file = req.file;
    let newId = uuidv4();
    if(!file) {
        res.status(400).json({
            message: "Bad Request, invalid upload image"
        })
    } else {
        let newItem = new Item({
            id: newId,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            priceHistory: [],
            image: req.file.buffer,
            description: req.body.description
        })
        newItem.save().then(item => {
            res.status(200).json({
                itemId: newId,
                img: Buffer.from(req.file.buffer).toString('base64'),
                encoding: "base64"
            });
        })
    }
});

router.get("", (req, res) => {
    let mongoFilters = {};

    if (req.query.category) {
        mongoFilters['category'] = req.query.category;
    }

    Item.find(mongoFilters).exec().then(items => {
        let responseItems = [];
        console.log(req.query)
        if (req.query.ignoreImage && req.query.ignoreImage === 'true') {
            responseItems = items.map(item => {
                return returnItemWithEncodedImage(item._doc, false);
            })
        } else {
            responseItems = items.map(item => {
                return returnItemWithEncodedImage(item._doc, true);
            })
        }
        res.status(200).json(responseItems);
    })
})

router.get("/:itemId", (req, res) => {
    Item.findOne({id: req.params.itemId}).exec().then(item => {
        if(item) {
            if (req.query.ignoreImage && req.query.ignoreImage === 'true') {
                res.status(200).json(returnItemWithEncodedImage(item._doc, false));

            } else {
                res.status(200).json(returnItemWithEncodedImage(item._doc, true));
            }
        } else {
            res.status(404).json({
                message: `Item with Id ${req.params.itemId} does not exist.`
            })
        }
    })
})

router.patch("/:itemId", (req, res)  => {
    let updates = {}
    if (req.body.stock) {
        updates['stock'] = req.body.stock
    }
    if (req.body.price) {
        updates['price'] = req.body.price
    }
    Item.findOne({id: req.params.itemId}).exec().then(item => {
        if(item) {
            if (updates.price) {
                let oldPriceList = item.priceHistory;
                if (oldPriceList.length === 0) {
                    oldPriceList = [{price: item.price, date: Date.now()}]
                } else {
                    oldPriceList.push({price: item.price, date: Date.now()})
                }
                updates['priceHistory'] = oldPriceList
            }
            Item.findOneAndUpdate({id: req.params.itemId},updates,{new : true}).exec().then(updatedItem => {
                res.status(202).json(returnItemWithEncodedImage(updatedItem._doc, true))
            })
        } else {
            res.status(404).json({
                message: `Cannot find item with id ${req.params.itemId}.`
            })
        }
    })
})

function returnItemWithEncodedImage(item, containsImage) {
    let {image, ...rest} = item;
    if (containsImage) {
        return { ...rest,image: Buffer.from(image).toString('base64')}
    } else {
        return rest;
    }
}

module.exports = router;