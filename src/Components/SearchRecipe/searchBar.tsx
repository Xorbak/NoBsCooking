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
  SetAdvancedSearch: React.Dispatch<React.SetStateAction<AdvancedSearch>>;
  advancedSearch: AdvancedSearch;
}
interface AdvancedSearch {
  advanced: boolean;
  nutrition: boolean;
}
interface NutritionalSearch {
  label: string;
  maxValue: string;
  minValue: string;
}
export const SearchBar = ({
  advancedSearch,
  SetAdvancedSearch,
  SetRecipe,
  fetchRecipe,
  SetSearchRecipe,
  setActiveStep,
  setShowRecipe,
}: Props) => {
  const nutritionalSearch: NutritionalSearch[] = [
    { label: "Calories", maxValue: "maxCalories", minValue: "minCalories" },
    { label: "Carbs", maxValue: "maxCarbs", minValue: "minCarbs" },
    { label: "Protein", maxValue: "maxProtein", minValue: "minProtein" },
    { label: "Fat", maxValue: "maxFat", minValue: "minFat" },
    { label: "Fiber", maxValue: "maxFiber", minValue: "minFiber" },
  ];
  return (
    <Grid
      container
      justifyContent={"center"}
      justifyItems="center"
      item
      xs={12}
      sx={{ width: "100vw" }}
    >
      <Formik
        initialValues={{
          input: "",
          cuisine: "",
          diet: "",
          excludeIngredient: "",
          includeIngredient: "",
          minCarbs: "",
          maxCarbs: "",
          minProtein: "",
          maxProtein: "",
          minCalories: "",
          maxCalories: "",
          minFat: "",
          maxFat: "",
          minFiber: "",
          maxFiber: "",
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
              minCarbs: values.minCarbs == "" ? null : values.minCarbs,
              maxCarbs: values.maxCarbs == "" ? null : values.maxCarbs,
              minProtein: values.minProtein == "" ? null : values.minProtein,
              maxProtein: values.maxProtein == "" ? null : values.maxProtein,
              minCalories: values.minCalories == "" ? null : values.minCalories,
              maxCalories: values.maxCalories == "" ? null : values.maxCalories,
              minFat: values.minFat == "" ? null : values.minFat,
              maxFat: values.maxFat == "" ? null : values.maxFat,
              minFiber: values.minFiber == "" ? null : values.minFiber,
              maxFiber: values.maxFiber == "" ? null : values.maxFiber,
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
                  minCarbs: values.minCarbs == "" ? null : values.minCarbs,
                  maxCarbs: values.maxCarbs == "" ? null : values.maxCarbs,
                  minProtein:
                    values.minProtein == "" ? null : values.minProtein,
                  maxProtein:
                    values.maxProtein == "" ? null : values.maxProtein,
                  minCalories:
                    values.minCalories == "" ? null : values.minCalories,
                  maxCalories:
                    values.maxCalories == "" ? null : values.maxCalories,
                  minFat: values.minFat == "" ? null : values.minFat,
                  maxFat: values.maxFat == "" ? null : values.maxFat,
                  minFiber: values.minFiber == "" ? null : values.minFiber,
                  maxFiber: values.maxFiber == "" ? null : values.maxFiber,
                })
              );
              localStorage.setItem(
                "searchRecipe",
                JSON.stringify(response.data)
              ); //@ts-ignore
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
          <Grid
            container
            item
            flexDirection="column"
            xs={8.5}
            sm={5.5}
            md={4}
            lg={2.5}
            xl={1.5}
            justifyItems="center"
            justifySelf={"center"}
            justifyContent="center"
            alignContent={"space-between"}
            alignItems="center"
          >
            <Form>
              <Field
                //sx={{ width: { xs: "95vw", md: "30vw" } }}
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
                        <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
              <Grid flexDirection={"row"} justifyContent="center">
                <Typography
                  sx={{
                    width: "fit-content",
                    marginRight: "10px",
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
                <Grid
                  container
                  item
                  textAlign={"justify"}
                  flexDirection={"column"}
                >
                  {" "}
                  <Field
                    name="cuisine"
                    type="cuisine"
                    component={CuisineDropDown}
                  />
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
                in={advancedSearch.nutrition} //basic advanced filter info search
              >
                <Grid
                  container
                  item
                  textAlign={"justify"}
                  justifyContent={"space-between"}
                  flexDirection={"column"}
                >
                  {nutritionalSearch.map(({ label, maxValue, minValue }) => {
                    return (
                      <Grid
                        key={label + maxValue + minValue}
                        container
                        flexDirection={"row"}
                        alignItems="center"
                        alignContent={"center"}
                      >
                        <Grid item container xs={4} sm={4}>
                          {" "}
                          <Typography
                            sx={{ display: "flex", marginRight: "10px" }}
                          >
                            {label}
                          </Typography>
                        </Grid>

                        <Grid
                          xs={8}
                          sm={6}
                          container
                          item
                          gap={1}
                          flexDirection={"row"}
                        >
                          <Field
                            sx={{
                              marginY: "5px",
                              width: { xs: "40%" },
                              display: "flex",
                              "& .MuiInputBase-input": { paddingY: 0 },
                              "& .MuiInputLabel-root": { top: "-15px" },
                            }}
                            name={maxValue}
                            type={maxValue}
                            placeholder="Max"
                            component={Myinput}
                          />
                          <Field
                            sx={{
                              marginY: "5px",
                              width: { xs: "40%", sm: "40%" },
                              display: "flex",
                              "& .MuiInputBase-input": { paddingY: 0 },
                              "& .MuiFormLabel-root": { top: "-15px" },
                            }}
                            name={minValue}
                            type={minValue}
                            placeholder="Min"
                            component={Myinput}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Collapse>
            </Form>{" "}
          </Grid>
        )}
      </Formik>
    </Grid>
  );
};
