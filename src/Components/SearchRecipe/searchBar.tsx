import {
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ComplexSearchRecipe, Recipe } from "../../App";
import { CuisineDropDown } from "./cuisineDropDown";
import { DietDropDown } from "./dietSearch";
import { Myinput } from "./myInput";
import SearchIcon from "@mui/icons-material/Search";
import { validateHeaderName } from "http";
interface Props {
  SetRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
  fetchRecipe: () => Promise<void>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
interface AdvancedSearch {
  advanced: boolean;
  nutrition: boolean;
}
interface NutritionalSearch {
  label: string;
  value: string;
}
export const SearchBar = ({
  SetRecipe,
  fetchRecipe,
  SetSearchRecipe,
  setActiveStep,
  setShowRecipe,
}: Props) => {
  const [advancedSearch, SetAdvancedSearch] = useState<AdvancedSearch>({
    advanced: false,
    nutrition: false,
  });
  const nutritionalSearch: NutritionalSearch[] = [
    { label: "Max Calories", value: "maxCalories" },
    { label: "Min Calories", value: "minCalories" },
    { label: "Max Carbs", value: "maxCarbs" },
    { label: "Min Carbs", value: "minCarbs" },
    { label: "Max Protein", value: "maxProtein" },
    { label: "Min Protein", value: "minProtein" },
    { label: "Max Fat", value: "maxFat" },
    { label: "Min Fat", value: "minFat" },
    { label: "Max Fiber", value: "maxFiber" },
    { label: "Min Fiber", value: "minFiber" },
  ];
  return (
    <Formik
      initialValues={{
        input: "",
        cuisine: "",
        diet: "",
        excludeIngredient: "",
        includeIngredient: "",
        minCarbs: null,
        maxCarbs: null,
        minProtein: null,
        maxProtein: null,
        minCalories: null,
        maxCalories: null,
        minFat: null,
        maxFat: null,
        minFiber: null,
        maxFiber: null,
      }}
      onSubmit={(values, { resetForm }) => {
        const searchRes = {
          method: "GET",
          params: {
            query: values.input,
            apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
            addRecipeInformation: true,
            fillIngredients: true,
            offset: 0,
            number: 12,
            cuisine: values.cuisine,
            diet: values.diet,
            includeIngredients: values.includeIngredient,
            excludeIngredients: values.excludeIngredient,
            minCarbs: values.minCarbs,
            maxCarbs: values.maxCarbs,
            minProtein: values.minProtein,
            maxProtein: values.maxProtein,
            minCalories: values.minCalories,
            maxCalories: values.maxCalories,
            minFat: values.minFat,
            maxFat: values.maxFat,
            minFiber: values.minFiber,
            maxFiber: values.maxFiber,
          },
          url: `https://api.spoonacular.com/recipes/complexSearch`,
        };
        setShowRecipe(4);
        console.log(values.cuisine);
        axios
          .request(searchRes)
          .then((response) => {
            console.log(response.data);
            localStorage.setItem(
              //Save response in local storage to use when moving to the next page
              "searchParams",
              JSON.stringify({
                query: values.input,
                addRecipeInformation: true,
                fillIngredients: true,
                offset: 0,
                cuisine: values.cuisine,
                diet: values.diet,
                includeIngredients: values.includeIngredient,
                excludeIngredients: values.excludeIngredient,
                minCarbs: values.minCarbs,
                maxCarbs: values.maxCarbs,
                minProtein: values.minProtein,
                maxProtein: values.maxProtein,
                minCalories: values.minCalories,
                maxCalories: values.maxCalories,
                minFat: values.minFat,
                maxFat: values.maxFat,
                minFiber: values.minFiber,
                maxFiber: values.maxFiber,
              })
            );
            localStorage.setItem("searchRecipe", JSON.stringify(response.data)); //@ts-ignore
            SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe")));
            setShowRecipe(2);
          })
          .catch((e) => {
            console.log(e);
            setShowRecipe(3);
          });
        resetForm();
      }}
    >
      {() => (
        <Form>
          <Grid
            container
            flexDirection="column"
            textAlign="start"
            alignContent={"center"}
          >
            <Field
              name="input"
              type="input"
              component={Myinput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      onClick={() => {
                        SetAdvancedSearch({
                          advanced: false,
                          nutrition: false,
                        });
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></Field>
            <Button
              size="small"
              sx={{ mt: "10px" }}
              onClick={() => {
                setShowRecipe(4);
                fetchRecipe();
                setActiveStep(0);
              }}
            >
              Something Random
            </Button>
            <Grid flexDirection={"row"}>
              {" "}
              <Typography
                sx={{
                  width: "fit-content",
                  color: "primary.main",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                variant="caption"
                onClick={() => {
                  SetAdvancedSearch({
                    advanced: !advancedSearch.advanced,
                    nutrition: false,
                  });
                }}
              >
                Advanced
              </Typography>{" "}
              <Typography
                sx={{
                  width: "fit-content",
                  color: "primary.main",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                variant="caption"
                onClick={() => {
                  SetAdvancedSearch({
                    advanced: false,
                    nutrition: !advancedSearch.nutrition,
                  });
                }}
              >
                Nutrition
              </Typography>
            </Grid>

            <Collapse
              in={advancedSearch.advanced} //basic advanced filter info search
            >
              <Grid container item flexDirection={"column"}>
                {" "}
                <Field
                  name="cuisine"
                  type="cuisine"
                  component={CuisineDropDown}
                />{" "}
                <Field name="diet" type="diet" component={DietDropDown} />
                <Field
                  sx={{ marginTop: "10px" }}
                  name="includeIngredient"
                  type="includeIngredient"
                  label="Include Ingredients"
                  component={Myinput}
                />
                <Field
                  sx={{ marginY: "5px" }}
                  name="excludeIngredient"
                  type="excludeIngredient"
                  label="Exclude Ingredients"
                  component={Myinput}
                />
                <Typography variant="caption">
                  *Ingredients must be seperated by comma
                </Typography>
              </Grid>
            </Collapse>
            <Collapse
              in={advancedSearch.nutrition} //nutritional info search
            >
              <Grid container item flexDirection={"column"}>
                {nutritionalSearch.map(({ label, value }) => {
                  return (
                    <Grid
                      key={value}
                      container
                      item
                      xs={12}
                      justifyContent={"space-between"}
                      alignItems="center"
                      flexDirection={"row"}
                    >
                      <Typography>{label}</Typography>

                      <Field
                        sx={{
                          width: "20%",
                          marginY: "5px",
                          "& .MuiInputBase-input": { paddingY: 0 },
                        }}
                        name={value}
                        type={value}
                        component={Myinput}
                      />
                      <Divider sx={{ width: "100%" }} />
                    </Grid>
                  );
                })}
              </Grid>
            </Collapse>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
