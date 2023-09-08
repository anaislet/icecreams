//https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9

const { getAllIcecreams, postIcecream } = require("./bdd")

var express = require("express")
var cors = require("cors")
var app = express()
app.use(cors())

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/icecreams", async (req, res, next) => {
  const type = req.query.type
  const gluten = req.query.gluten
  const alcool = req.query.alcool
  const icecreams = await getAllIcecreams(type, gluten, alcool)
 res.json(icecreams);
});

app.get("/icecream/:name", (req, res, next) => {
  const icecreamName = req.params.name;
  res.json({ "message": `toutes les informations concernant le parfum ${icecreamName}` });
});

app.post("/composition/:flavor1/:flavor2/:flavor3", async (req, res, next) => {
  const icecreams = await postIcecream(req.params.flavor1, req.params.flavor2, req.params.flavor3)
  console.log(icecreams)
  res.json(icecreams);
});