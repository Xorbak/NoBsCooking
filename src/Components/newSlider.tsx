import * as React from "react";
import { useTheme } from "@mui/material/styles";

import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Grid from "@mui/material/Grid";

import { Recipe } from "../App";
import Box from "@mui/material/Box";
interface Data {
  label: string;
  color: string;
}
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const RandomRecipeArray: Data[] = [
  { label: "Recipe 1", color: "#124516" },
  { label: "Recipe 2", color: "#312342" },
  { label: "Recipe 3", color: "#412456" },
  { label: "Recipe 4", color: "#414456" },
  { label: "Recipe 5", color: "#234136" },
  { label: "Recipe 6", color: "#426512" },
  { label: "Recipe 7", color: "#753423" },
  { label: "Recipe 8", color: "#948347" },
  { label: "Recipe 9", color: "#213531" },
  { label: "Recipe 10", color: "#321423" },
];
interface Props {
  recipe: Recipe | undefined;
}

export const NewSlider = ({ recipe }: Props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const poop =
    recipe &&
    recipe.recipes.map((i) => {
      return { image: i.image, title: i.title };
    });
  const maxSteps = !poop ? 0 : poop.length;
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
      item
      xs={8}
    >
      <Grid //content card
        justifyContent={"center"}
        alignContent={"center"}
        item
        container
        xs={10}
      >
        <Grid
          container
          item
          xs={7} // container with the title
        >
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography //label
            >
              {poop && poop[activeStep].title}
            </Typography>
          </Paper>
        </Grid>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {poop &&
            poop.map(({ image }) => (
              <Grid
                container
                justifyContent={"center"}
                alignContent={"center"}
                alignSelf={"center"}
                xs={12}
                item
              >
                <Box component="img" src={image}></Box>
              </Grid>
            ))}
        </AutoPlaySwipeableViews>
      </Grid>

      <MobileStepper //arrows/navigation
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeftIcon />
            ) : (
              <KeyboardArrowLeftIcon />
            )}
            Back
          </Button>
        }
      />
    </Grid>
  );
};
