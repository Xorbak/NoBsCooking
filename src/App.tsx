import React, { useEffect, useState } from "react";

import "./App.css";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

import { NewSlider } from "./Components/newSlider";
export interface Recipe {
  recipes: { image: string; title: string }[];
}
function App() {
  const [recipe, SetRecipe] = useState<Recipe>();
  const fetchRecipe = async () => {
    await fetch(`${process.env.REACT_APP_RANDOM_RECIPE}`)
      .then((res) => res.json())
      .then((result) => {
        SetRecipe(result);
        localStorage.setItem("randomRecipe", JSON.stringify(result));
        console.log(result);
      });
  };
  console.log(recipe);
  useEffect(() => {
    //@ts-ignore
    SetRecipe(JSON.parse(localStorage.getItem("randomRecipe")));
  }, []);
  return (
    <Grid
      sx={Styles.App}
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection={"column"}
      container
      columns={10}
      xs={12}
    >
      <Grid>
        <Button onClick={fetchRecipe}>Get Random recipe!</Button>
      </Grid>

      <NewSlider recipe={recipe} />
    </Grid>
  );
}

export default App;
export const Styles = {
  App: {
    textAlign: "center",
    backgroundColor: "background.default",
    width: { xs: "100%" },
    minHeight: "100vh",

    alignItems: "center",
    justifyContent: { sm: "center", md: "center" },
    fontSize: "calc(10px + 2vmin)",
  },
};
