import React, { useEffect, useState } from "react";

import "./App.css";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

import { NewSlider } from "./Components/RandomRecipe/newSlider";
import { RandomRecipeCard } from "./Components/RandomRecipe/RandomRecipeCard";

function App() {
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
      <RandomRecipeCard />
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
