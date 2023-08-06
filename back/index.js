//https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9

const { getAllIcecreams } = require("./bdd")

var express = require("express")
var cors = require("cors")
var app = express()
app.use(cors())

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/icecreams", async (req, res, next) => {
  const icecreams = await getAllIcecreams()
 res.json(icecreams);
});

app.get("/icecream/:name", (req, res, next) => {
  const icecreamName = req.params.name;
  res.json({ "message": `toutes les informations concernant le parfum ${icecreamName}` });
});

app.post("/icecreamcup", (req, res, next) => {
    
});