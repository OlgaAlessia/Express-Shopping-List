const items = require("./fakeDb");

class Item {

    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    /**
    * Gets the list of the items
    */
    static getAllItems() {
        return items;
    }


    /**
    * Search in the items list a item with the name given.
    * @param {string} name
    */
    static find(name) {
        const foundItem = items.find(el => el.name === name);
        if (foundItem === undefined) {
            throw { msg: "Item not found", status: 404};
        }
        return foundItem;
    }

    /**
    * Updates the item 
    * @param {string} name
    * @param {Item} element 
    */
    static update(name, element) {
        const foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw { msg: "Item not found", status: 404};
        }

        if (element.name)
            foundItem.name = element.name;

        if (element.price)
            foundItem.price = element.price;

        return foundItem;
    }

    /**
    * Delete the item 
    * @param {string} name
    */
    static remove(name) {
        const foundItem = items.findIndex(el => el.name === name);
        if (foundItem === -1) {
            throw { msg: "Item not found", status: 404};
        }
        items.splice(foundItem, 1);
    }
}


module.exports = Item;
