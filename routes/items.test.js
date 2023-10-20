process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item1 = { name: "popsicle", price: 1.45 };
let item2 = { name: "cheerios", price: 3.40 };

beforeEach(async function () {
    items.push(item1);
    items.push(item2);
});

afterEach(async function () {
    // make sure this *mutates*, not redefines, items
    items = [];
});
// end afterEach


/** GET /items - returns {items:[ item, ... ]}} */

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);
        const { items } = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(2);
        expect(items).toEqual([{name: "popsicle", price: 1.45}, {name: "cheerios", price: 3.4}])
    });
});
// end


/** GET /items/[name] - return data about the item: {item: {...}} */
describe("GET /items/:name", function () {
    test("Gets the item with the specify name", async function () {
        const resp = await request(app).get(`/items/${item1.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item1);
    });

    test("Responds with 404 if can't find item", async function () {
        const resp = await request(app).get(`/items/40`);
        expect(resp.statusCode).toBe(404);
    });
});
// end


/** POST /items - create item from data; return {item: {"name":"croissant","price":3.39}} */
describe("POST /items", function () {
    test("Creates a new item", async function () {
        const resp = await request(app).post(`/items`).send({ name:"croissant", price: 3.39 });

        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toHaveProperty("name");
        expect(resp.body.item.name).toEqual("croissant");
        expect(resp.body.item).toHaveProperty("price");
        expect(resp.body.item.price).toEqual(3.39);
        expect(resp.body.item).toEqual({name: "croissant", price: 3.39});
    });
});
// end


/** PATCH /items/[name] - update item popsicle; return {item: {"name":"popsicle","price":2.45}}*/

describe("PATCH /items/:name", function () {
    test("Updates the item with the specify name", async function () {
        const resp = await request(app).patch(`/items/popsicle`).send({ price: 1.39});
        expect(resp.statusCode).toBe(200);
        console.log(resp.body.item);
        expect(resp.body.item).toEqual({name: "popsicle", price: 1.39});
    });

    test("Responds with 404 if can't find item", async function () {
        const resp = await request(app).patch(`/items/cookies`);
        expect(resp.statusCode).toBe(404);
    });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "item deleted"}` */

describe("DELETE /items/:name", function () {
    test("Deletes the item with the specify name", async function () {
        const resp = await request(app).delete(`/items/cheerios`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });

    test("Responds with 404 if can't find item", async function () {
        const resp = await request(app).patch(`/items/cookies`);
        expect(resp.statusCode).toBe(404);
    });
});
// end
