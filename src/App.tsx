import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";

import { Route, Routes } from "react-router-dom";
import { FullRecipe } from "./Components/FullRecipe/FullRecipe";
import { Home } from "./Screens/Home/Home";
export interface Recipe {
  recipes: {
    id: number;
    image: string;
    title: string;
    summary: string;
    vegan: boolean;
    vegitarian: boolean;
    veryHealthy: boolean;
    weightWatcherSmartPoints: number;
    veryPopular: boolean;
    cheap: boolean;
    glutenFree: boolean;
    servings: number;
    diets: string[];
    readyInMinutes: string;
    analyzedInstructions: { steps: { number: number; step: string }[] }[];
    extendedIngredients: {
      original: string;
      originalName: string;
      name: string;
    }[];
  }[];
}
export interface ComplexSearchRecipe {
  results: {
    id: number;
    image: string;
    title: string;
    summary: string;
    vegan: boolean;
    vegitarian: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    weightWatcherSmartPoints: number;
    cheap: boolean;
    glutenFree: boolean;
    readyInMinutes: string;
    servings: number;
    diets: string[];
    analyzedInstructions: { steps: { number: number; step: string }[] }[];
    extendedIngredients: {
      original: string;
      originalName: string;
      name: string;
    }[];
  }[];
}
function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recipe, SetRecipe] = useState<Recipe>();
  const [searchRecipe, SetSearchRecipe] = useState<ComplexSearchRecipe>();
  const [activeRecipe, setActiveRecipe] = useState<number | undefined>();
  const [showRecipe, setShowRecipe] = useState<number>(0);
  const fetchRecipe = async () => {
    await fetch(`${process.env.REACT_APP_RANDOM_RECIPE}`)
      .then((res) => res.json())
      .then((result) => {
        SetRecipe(result);
        setShowRecipe(1);
        localStorage.setItem("randomRecipe", JSON.stringify(result));
        console.log(result);
      })
      .catch(() => {
        setShowRecipe(3);
      });
  };
  useEffect(() => {
    //@ts-ignore
    SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe"))); //@ts-ignore
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
      <Routes>
        <Route
          path={`/`}
          element={
            <Home
              searchRecipe={searchRecipe}
              recipe={recipe}
              fetchRecipe={fetchRecipe}
              setActiveStep={setActiveStep}
              SetRecipe={SetRecipe}
              showRecipe={showRecipe}
              setShowRecipe={setShowRecipe}
              activeStep={activeStep}
              activeRecipe={activeRecipe}
              setActiveRecipe={setActiveRecipe}
              SetSearchRecipe={SetSearchRecipe}
            />
          }
        ></Route>
        <Route
          path={`/random/${activeRecipe}`}
          element={
            <FullRecipe
              recipe={recipe}
              activeRecipe={activeRecipe}
              activeStep={activeStep}
              SetRecipe={SetRecipe}
              setActiveRecipe={setActiveRecipe}
              setShowRecipe={setShowRecipe}
            />
          }
        ></Route>
        <Route
          path={`/search/${activeRecipe}`}
          element={
            <FullRecipe
              activeRecipe={activeRecipe}
              setActiveRecipe={setActiveRecipe}
              activeStep={activeStep}
              searchRecipe={searchRecipe}
              SetSearchRecipe={SetSearchRecipe}
              setShowRecipe={setShowRecipe}
            />
          }
        ></Route>
      </Routes>
    </Grid>
  );
}

export default App;
export const Styles = {
  App: {
    textAlign: "center",
    backgroundColor: "background.default",
    width: { xs: "100%" },

    alignItems: "center",
    justifyContent: { sm: "center", md: "center" },
    fontSize: "calc(10px + 2vmin)",
  },
};
