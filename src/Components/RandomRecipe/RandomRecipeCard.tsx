import React, { useEffect, useState } from "react";
import { Recipe } from "../../App";
import { NewSlider } from "./newSlider";
interface Props {
  fetchRecipe: () => Promise<void>;
  recipe: Recipe | undefined;
  activeStep: number;
  SetRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeRecipe: number | undefined;
}
export const RandomRecipeCard = ({
  fetchRecipe,
  SetRecipe,
  recipe,
  activeStep,
  setActiveStep,
  setActiveRecipe,
  activeRecipe,
}: Props) => {
  useEffect(() => {
    //@ts-ignore
    SetRecipe(JSON.parse(localStorage.getItem("randomRecipe")));
  }, []);
  return (
    <React.Fragment>
      <NewSlider
        recipe={recipe}
        setActiveRecipe={setActiveRecipe}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        activeRecipe={activeRecipe}
      />
    </React.Fragment>
  );
};
