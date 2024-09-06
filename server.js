//
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

/*parse body

express.json(): Parses JSON requests, where the request body is in JSON format (e.g., { "name": "John" }). This middleware populates req.body with the parsed JSON data.
express.urlencoded({ extended: true }): Parses URL-encoded requests, where the request body is in a URL-encoded format (e.g., name=John&age=30). This middleware also populates req.body with the parsed data.

*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// model data
const items = require("./models/items.models");

// route get to show items
app.get("/", (req, res) => {
  res.send(items);
});

app.get("/api/items", (req, res) => {
  res.json(items);
});
// search by id
app.get("/api/items/:id", (req, res) => {
  const item = items.find((c) => c.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("The item with the given ID was not found.");
  }
  res.send(item);
});

//post item
app.post("/api/items", (req, res) => {
  console.log(req.body);

  const item = {
    id: items.length + 1,
    itemName: req.body.itemName,
    description: req.body.description,
  };
  items.push(item);
  res.send(item);
});

//delete item
app.delete("/api/items/:id", (req, res) => {
  const item = items.find((c) => c.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("The item with the given ID was not found.");
  }
  const index = items.indexOf(item);
  items.splice(index, 1);
  res.send(item);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
