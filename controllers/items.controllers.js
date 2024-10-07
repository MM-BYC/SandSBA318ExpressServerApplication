const express = require("express");
const router = express.Router();
// model data
const items = require("../models/items.models");

module.exports = router;

//routes to query data
// to test: http://localhost:3000/api/items/query?itemName=item1
router.get("/api/items/query", (req, res) => {
  const { itemName, description } = req.query;
  const filteredItems = items.filter((item) => {
    return (
      // !itemName, ! description to handle in case query does not contains itemName or description
      (!itemName || item.itemName.includes(itemName)) &&
      (!description || item.description.includes(description))
    );
  });
  res.json(filteredItems);
});

//show items
router.get("/", (req, res) => {
  res.json(items);
});
// search by id
router.get("/:id", (req, res) => {
  const item = items.find((c) => c.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("The item with the given ID was not found.");
  }
  res.send(item);
});

// POST item
router.post("/api/items", (req, res) => {
  console.log(req.body);

  const item = {
    id: items.length + 1,
    itemName: req.body.itemName,
    description: req.body.description,
  };
  items.push(item);
  res.send({
    id: item.id,
    itemName: item.itemName,
    description: item.description,
  });
});

//delete item
router.delete("/api/items/:id", (req, res) => {
  const item = items.find((c) => c.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("The item with the given ID was not found.");
  }
  const index = items.indexOf(item);
  items.splice(index, 1);
  res.send(item);
});

// put item
router.put("/api/items/:id", (req, res) => {
  const item = items.find((c) => c.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("The item with the given ID was not found.");
  }
  item.itemName = req.body.itemName;
  item.description = req.body.description;
  res.send(
    res.send({
      id: item.id,
      itemName: item.itemName,
      description: item.description,
    })
  );
});
