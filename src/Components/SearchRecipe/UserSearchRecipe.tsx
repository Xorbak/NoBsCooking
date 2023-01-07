import { Button, Grid, MobileStepper, Typography, Zoom } from "@mui/material";
import { ComplexSearchRecipe } from "../../App";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { AdvancedSearch } from "../../Screens/Home/Home";

interface Props {
  searchRecipe: ComplexSearchRecipe | undefined;
  activeRecipe: number | undefined;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
  SetAdvancedSearch: React.Dispatch<React.SetStateAction<AdvancedSearch>>;
  advancedSearch: AdvancedSearch;
}
interface SearchParams {
  query: string;
  addRecipeInformation: boolean;
  fillIngredients: boolean;
  includeIngredients: string;
  excludeIngredients: string;
  cuisine: string;
  diet: string;
  minCarbs: number;
  maxCarbs: number;
  minProtein: number;
  maxProtein: number;
  minCalories: number;
  maxCalories: number;
  minFat: number;
  maxFat: number;
  minFiber: number;
  maxFiber: number;
}
export const UserSearchRecipe = ({
  searchRecipe,
  SetAdvancedSearch,
  activeRecipe,
  setActiveRecipe,
  SetSearchRecipe,
}: Props) => {
  const [searchParams, setSearchParams] = useState<SearchParams>();
  useEffect(() => {
    //@ts-ignore
    SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe"))); //@ts-ignore
    setSearchParams(JSON.parse(localStorage.getItem("searchParams")));
  }, []);
  //functions for the mobile stepper
  const [activeStep, setActiveStep] = useState<number>(0);
  //Offset is used when going to the next/last page when using complex search
  const [offsetValue, setOffsetValue] = useState<number>(0);
  const maxSteps =
    searchRecipe == undefined ? 0 : Math.ceil(searchRecipe.totalResults / 12);

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    setOffsetValue(offsetValue + 12);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setOffsetValue(offsetValue - 12);
  };

  const searchRes = {
    method: "GET",
    params: {
      query: searchParams && searchParams.query,
      apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
      addRecipeInformation: searchParams && searchParams.addRecipeInformation,
      fillIngredients: searchParams && searchParams.fillIngredients,
      //the offset param will ignore the number of responses that is equal to its value - I use it to search for the next response
      offset: offsetValue,
      number: 12,
      cuisine: searchParams && searchParams.cuisine,
      diet: searchParams && searchParams.diet,
      includeIngredients: searchParams && searchParams.includeIngredients,
      excludeIngredients: searchParams && searchParams.excludeIngredients,
      minCarbs: searchParams && searchParams.minCarbs,
      maxCarbs: searchParams && searchParams.maxCarbs,
      minProtein: searchParams && searchParams.minProtein,
      maxProtein: searchParams && searchParams.maxProtein,
      minCalories: searchParams && searchParams.minCalories,
      maxCalories: searchParams && searchParams.maxCalories,
      minFat: searchParams && searchParams.minFat,
      maxFat: searchParams && searchParams.maxFat,
      minFiber: searchParams && searchParams.minFiber,
      maxFiber: searchParams && searchParams.maxFiber,
    },
    url: `https://api.spoonacular.com/recipes/complexSearch`,
  };
  console.log(offsetValue);
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
          <Zoom //mui animation component
            in={true}
            key={i.id}
            style={{
              transitionDelay:
                (searchRecipe.results.indexOf(i) + 1) * 100 + "ms",
            }}
          >
            <Grid //content card
              item
              sx={{ borderRadius: "5px", backgroundColor: "background.paper" }}
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
                  // using on pointer down because the state does not update intime on click -- maybe just make it a normal variable
                  localStorage.setItem("activeRecipe", JSON.stringify(i.id));
                  setActiveRecipe(i.id);
                  console.log(activeRecipe);
                }}
                sx={{ cursor: "pointer" }}
              >
                <NavLink to={`/search/detailedSearch/${activeRecipe}`}>
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
                <Grid // container with the title
                  container
                  item
                  paddingX={"10px"}
                  textAlign={"start"}
                  xs={12}
                >
                  <Typography //label
                    sx={{
                      textDecoration: "underline",
                      marginBottom: "10px",
                    }}
                    variant="subtitle1"
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
              onPointerDown={() => handleNext()} // on pointer to change state before the onclick event happens
              onClick={() => (
                SetAdvancedSearch({ nutrition: false, advanced: false }),
                SetSearchRecipe(undefined),
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
              disabled={activeStep === 0}
              onPointerDown={() => handleBack()}
              onClick={async () => (
                SetAdvancedSearch({ nutrition: false, advanced: false }),
                SetSearchRecipe(undefined),
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
