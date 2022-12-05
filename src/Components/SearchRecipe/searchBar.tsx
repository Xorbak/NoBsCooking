import {
  Button,
  Collapse,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ComplexSearchRecipe, Recipe } from "../../App";
import { CuisineDropDown } from "./cuisineDropDown";
import { DietDropDown } from "./dietSearch";
import { Myinput } from "./myInput";
interface Props {
  SetRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
  fetchRecipe: () => Promise<void>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
export const SearchBar = ({
  SetRecipe,
  fetchRecipe,
  SetSearchRecipe,
  setActiveStep,
  setShowRecipe,
}: Props) => {
  const [advancedSearch, SetAdvancedSearch] = useState<boolean>(false);
  return (
    <Formik
      initialValues={{ input: "", cuisine: "", diet: "" }}
      onSubmit={(values, { resetForm }) => {
        const searchRes = {
          method: "GET",
          params: {
            query: values.input,
            apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
            addRecipeInformation: true,
            fillIngredients: true,
            cuisine: values.cuisine,
            diet: values.diet,
          },
          url: `https://api.spoonacular.com/recipes/complexSearch`,
        };
        setShowRecipe(4);
        console.log(values.cuisine);
        axios
          .request(searchRes)
          .then((response) => {
            console.log(response.data);
            localStorage.setItem("searchRecipe", JSON.stringify(response.data)); //@ts-ignore
            SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe")));
            setShowRecipe(2);
          })
          .catch(() => {
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
            <Field name="input" type="input" component={Myinput}></Field>
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
                SetAdvancedSearch(!advancedSearch);
              }}
            >
              Advanced
            </Typography>
            <Collapse in={advancedSearch}>
              <Field
                name="cuisine"
                type="cuisine"
                component={CuisineDropDown}
              />{" "}
              <Field name="diet" type="diet" component={DietDropDown} />
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
            </Collapse>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
