import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { NewSlider } from "./newSlider";
export interface Recipe {
  recipes: {
    id: number;
    image: string;
    title: string;
    summary: string;
    vegan: boolean;
    vegitarian: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    cheap: boolean;
    glutenFree: boolean;
    readyInMinutes: string;
    extendedIngredients: { originalName: string; name: string }[];
  }[];
}
export const RandomRecipeCard = () => {
  const [activeStep, setActiveStep] = React.useState(0);
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
    <React.Fragment>
      <Grid>
        <Button
          onClick={() => {
            fetchRecipe();
            setActiveStep(0);
          }}
        >
          Get Random recipe!
        </Button>
      </Grid>
      <NewSlider
        recipe={recipe}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </React.Fragment>
  );
};
