import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { Recipe } from "../../../App";
interface Props {
  recipe: Recipe;
  activeStep: number;
}
export const IngredientPreview = ({ recipe, activeStep }: Props) => {
  return (
    <React.Fragment>
      {recipe &&
        recipe.recipes[activeStep].extendedIngredients.map((i) => {
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
    </React.Fragment>
  );
};
