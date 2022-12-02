import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Recipe } from "../../App";
import { RecipeCard } from "./Components/RecipeCard";
import Grid from "@mui/material/Grid";

interface Props {
  recipe: Recipe | undefined;
  activeStep: number;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeRecipe: number | undefined;
}

export const NewSlider = ({
  recipe,
  setActiveStep,
  activeStep,
  activeRecipe,
  setActiveRecipe,
}: Props) => {
  const maxSteps = !recipe?.recipes ? 0 : recipe?.recipes.length;
  const handleNext = () => {
    activeStep == maxSteps - 1
      ? setActiveStep(0)
      : setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    activeStep == 0
      ? setActiveStep(maxSteps - 1)
      : setActiveStep(activeStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection="row"
      item
      xs={12}
      md={8}
    >
      <Grid alignSelf="center">
        <Button sx={styles.navigationButtons} size="large" onClick={handleBack}>
          <KeyboardArrowLeftIcon />
        </Button>
      </Grid>
      <RecipeCard
        activeStep={activeStep}
        handleStepChange={handleStepChange}
        recipe={recipe}
        setActiveRecipe={setActiveRecipe}
        activeRecipe={activeRecipe}
      />
      <Grid alignSelf={"center"}>
        <Button size="large" sx={styles.navigationButtons} onClick={handleNext}>
          <KeyboardArrowRightIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
const styles = {
  navigationButtons: { height: "100px", display: { xs: "none", sm: "block" } },
};
