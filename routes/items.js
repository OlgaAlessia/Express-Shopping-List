const Item = require('../item');
const express = require("express");

const router = new express.Router();


/**
* GET /items/  -> items: [...] 
*/
router.get('', (req, res, next) => {
    try {
        return res.json({ items: Item.getAllItems() });
    } catch (e) {
        return next(e);
    }
});


/**
* POST /items/  -> creates new item
*/
router.post('', function (req, res, next) {
    try {
        const newItem = new Item(req.body.name, req.body.price);
        return res.json({ item: newItem });
    } catch (e) {
        return next(e);
    }
});


/**
* GET /items/:name  -> item
*/
router.get('/:name', (req, res, next) => {
    try {
        const foundItem = Item.find(req.params.name);
        return res.json({ item: foundItem });
    } catch (e) {
        return next(e);
    }
});


/**
* PATCH /items/:name  -> update item
*/
router.patch("/:name", function (req, res, next) {
    try {
        const foundItem = Item.update(req.params.name, req.body);
        return res.json({ item: foundItem });
    } catch (e) {
        next(e)
    }
})


/**
* DELETE /items/:name  -> delete item
*/
router.delete("/:name", (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({ message: "Deleted" });
    } catch (e) {
        next(e)
    }
})


module.exports = router;