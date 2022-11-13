import * as React from "react";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import { Recipe } from "./RandomRecipeCard";
import { ListItem } from "@mui/material";
interface Data {
  label: string;
  color: string;
}
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Props {
  recipe: Recipe | undefined;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const NewSlider = ({ recipe, setActiveStep, activeStep }: Props) => {
  const theme = useTheme();

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

  const stringTOHtml = (str: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection="column"
      item
      xs={8}
    >
      <Grid //content card
        justifyContent={"center"}
        alignContent={"center"}
        item
        sx={{ borderRadius: "5px" }}
        boxShadow={5}
        container
        marginBottom={"20px"}
        xs={4}
      >
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {recipe &&
            recipe.recipes.map(
              ({
                id,
                image,
                title,
                readyInMinutes,
                vegan,
                vegitarian,
                glutenFree,
                extendedIngredients,
              }) => (
                <Grid
                  key={id}
                  container
                  justifyContent={"center"}
                  justifyItems="center"
                  justifySelf={"center"}
                  flexDirection={"column"}
                  alignContent={"center"}
                  overflow="hidden"
                  alignSelf={"center"}
                  xs={12}
                  item
                >
                  {" "}
                  <Grid
                    xs={12}
                    width={"100%"}
                    item
                    overflow={"hidden"}
                    sx={{
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                    }}
                    component="img"
                    src={image}
                  ></Grid>
                  <Grid
                    container
                    item
                    paddingLeft={"10px"}
                    textAlign={"start"}
                    xs={12} // container with the title
                  >
                    <Typography
                      sx={{ textDecoration: "underline", marginBottom: "10px" }}
                      variant="subtitle1" //label
                      fontWeight={"bold"}
                    >
                      {title}
                    </Typography>
                    <Grid
                      container
                      item
                      xs={12}
                      flexDirection="row"
                      justifyItems={"start"}
                      textAlign="start"
                      marginBottom={"10px"}
                    >
                      <Grid xs={12} container item>
                        <Typography variant="subtitle2">
                          Ready in: {readyInMinutes}
                          min{" "}
                        </Typography>
                      </Grid>{" "}
                      <Grid container xs={12}>
                        <Typography
                          sx={{ display: "flex" }}
                          variant="subtitle2"
                        >
                          Vegan :
                          {vegan ? (
                            <CheckIcon color="success" fontSize="small" />
                          ) : (
                            <ClearIcon color="error" fontSize="small" />
                          )}
                        </Typography>
                      </Grid>{" "}
                      <Grid container xs={12}>
                        <Typography
                          sx={{ display: "flex" }}
                          variant="subtitle2"
                        >
                          Vegitarian :
                          {vegitarian ? (
                            <CheckIcon color="success" fontSize="small" />
                          ) : (
                            <ClearIcon color="error" fontSize="small" />
                          )}
                        </Typography>
                      </Grid>{" "}
                      <Grid container xs={12}>
                        <Typography
                          sx={{ display: "flex" }}
                          variant="subtitle2"
                        >
                          Gluten free:
                          {glutenFree ? (
                            <CheckIcon color="success" fontSize="small" />
                          ) : (
                            <ClearIcon color="error" fontSize="small" />
                          )}
                        </Typography>
                      </Grid>
                      <Grid container xs={12}>
                        <Typography variant="subtitle2">
                          Ingredients :
                        </Typography>
                      </Grid>
                      {extendedIngredients.map((i) => {
                        return (
                          <Grid xs={6} container>
                            <ListItem
                              sx={{
                                display: "list-item",
                                fontSize: "x-small",
                                padding: 0,
                              }}
                            >
                              {i.name}
                            </ListItem>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              )
            )}
        </AutoPlaySwipeableViews>
        <Grid
          container
          xs={12}
          justifyContent={"center"}
          alignContent={"center"}
          alignSelf={"center"}
        >
          {" "}
        </Grid>
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
