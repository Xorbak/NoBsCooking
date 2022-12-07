import { Button, Grid, MobileStepper, Typography, Zoom } from "@mui/material";
import { ComplexSearchRecipe } from "../../App";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipeCardImage } from "../RandomRecipe/Components/RecipeCardImage";
import { RecipeCard } from "../RandomRecipe/Components/RecipeCard";
import { RecipeCardInfo } from "../RandomRecipe/Components/recipeCardInfo";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
interface Props {
  searchRecipe: ComplexSearchRecipe | undefined;
  activeRecipe: number | undefined;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
}
interface SearchParams {
  query: string;
  addRecipeInformation: boolean;
  fillIngredients: boolean;

  cuisine: string;
  diet: string;
}
export const UserSearchRecipe = ({
  searchRecipe,
  activeRecipe,
  setActiveRecipe,
  SetSearchRecipe,
  setShowRecipe,
}: Props) => {
  const [searchParams, setSearchParams] = useState<SearchParams>();
  useEffect(() => {
    //@ts-ignore
    SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe"))); //@ts-ignore
    setSearchParams(JSON.parse(localStorage.getItem("searchParams")));
  }, []);
  //functions for the mobile stepper
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = searchRecipe == undefined ? 0 : searchRecipe.totalResults;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const searchRes = {
    method: "GET",
    params: {
      query: searchParams && searchParams.query,
      apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
      addRecipeInformation: searchParams && searchParams.addRecipeInformation,
      fillIngredients: searchParams && searchParams.fillIngredients,
      offset: (activeStep + 1) * 10,
      number: 12,
      cuisine: searchParams && searchParams.cuisine,
      diet: searchParams && searchParams.diet,
    },
    url: `https://api.spoonacular.com/recipes/complexSearch`,
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection="row"
      item
      xs={12}
      md={12}
    >
      {searchRecipe && searchRecipe.results.length == 0 && (
        <Grid alignSelf="center">No Results found</Grid>
      )}

      {searchRecipe &&
        searchRecipe.results.map((i) => (
          <Zoom
            in={true}
            key={i.id}
            style={{
              transitionDelay:
                (searchRecipe.results.indexOf(i) + 1) * 100 + "ms",
            }}
          >
            <Grid //content card
              item
              sx={{ borderRadius: "5px" }}
              boxShadow={5}
              ml={"5px"}
              marginBottom={"20px"}
              xs={11}
              sm={8}
              md={3}
            >
              <Grid
                key={i.id}
                container
                overflow="hidden"
                xs={12}
                item
                onPointerDown={() => {
                  localStorage.setItem("activeRecipe", JSON.stringify(i.id));
                  setActiveRecipe(i.id);
                  console.log(activeRecipe);
                }}
                sx={{ cursor: "pointer" }}
              >
                <NavLink to={`/search/${activeRecipe}`}>
                  <Grid
                    xs={12}
                    width="100vw"
                    item
                    overflow={"hidden"}
                    sx={{
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                    }}
                    component="img"
                    src={i.image}
                  />
                </NavLink>
                <Grid
                  container
                  item
                  paddingX={"10px"}
                  textAlign={"start"}
                  xs={12} // container with the title
                >
                  <Typography
                    sx={{
                      textDecoration: "underline",
                      marginBottom: "10px",
                    }}
                    variant="subtitle1" //label
                    fontWeight={"bold"}
                  >
                    {i.title}
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
                    {" "}
                    <Grid container item xs={12}>
                      <Typography variant="subtitle2">
                        Ready in :{i.readyInMinutes} Min
                      </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                      <Typography variant="subtitle2">
                        Servings : {i.servings}
                      </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                      <Typography variant="subtitle2">
                        Diets :
                        {i.diets.map((i) => {
                          return i.indexOf(i) !== i.length - 1 ? (
                            <Typography key={i}>
                              {i.charAt(0).toLocaleUpperCase() + i.slice(1)},
                            </Typography>
                          ) : (
                            <Typography key={i}>
                              {i.charAt(0).toLocaleUpperCase() + i.slice(1)}
                            </Typography>
                          );
                        })}
                      </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                      <Typography variant="subtitle2">
                        Weigh Loss points : {`${i.weightWatcherSmartPoints}`}{" "}
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold", fontSize: "10px" }}
                        >
                          *smaller = better
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>{" "}
            </Grid>
          </Zoom>
        ))}
      <Grid container item xs={12} justifyContent="center">
        <MobileStepper
          steps={maxSteps}
          variant="text"
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={() => (
                SetSearchRecipe(undefined),
                handleNext(),
                window.scrollTo(0, 0),
                axios.request(searchRes).then((response) => {
                  console.log(response.data);
                  localStorage.setItem(
                    "searchRecipe",
                    JSON.stringify(response.data)
                  );

                  SetSearchRecipe(
                    //@ts-ignore
                    JSON.parse(localStorage.getItem("searchRecipe"))
                  );
                })
              )}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              onClick={() => (
                SetSearchRecipe(undefined),
                handleBack(),
                window.scrollTo(0, 0),
                axios.request(searchRes).then((response) => {
                  console.log(response.data);
                  localStorage.setItem(
                    "searchRecipe",
                    JSON.stringify(response.data)
                  );

                  SetSearchRecipe(
                    //@ts-ignore
                    JSON.parse(localStorage.getItem("searchRecipe"))
                  );
                })
              )}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};
