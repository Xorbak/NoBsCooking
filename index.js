const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { response, query } = require("express");
require("dotenv").config();

const app = express();
//syntax for callback
app.use(cors());
app.get("/", (req, res) => {
  res.json(`hi from port ${PORT}`);
});

app.get("/random", (req, res) => {
  const RandomRes = { method: "GET", url: process.env.REACT_APP_RANDOM_RECIPE };

  axios.request(RandomRes).then((response) => {
    res.json(response.data);
  });
});

app.get("/search", (req, res) => {
  var input = req.query.query;
  const searchRes = {
    method: "GET",
    params: { query: input, apiKey: "751b372b3e384e0c83f569d60f12b42f" },
    url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&fillIngredients=true`,
  };

  axios.request(searchRes).then((response) => {
    res.json(response.data);
  });
});
app.listen(8000, () => console.log(`server is running on ${PORT}`));
