import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { ComplexSearchRecipe, Recipe } from "../../App";
import { SearchBar } from "./searchBar";
interface Props {
  fetchRecipe: () => Promise<void>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
  showRecipe: number;
  SetRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
}
export const SearchRecipe = ({
  fetchRecipe,
  SetRecipe,

  setActiveStep,
  setShowRecipe,
  SetSearchRecipe,
  showRecipe,
}: Props) => {
  return (
    <Grid>
      <React.Fragment>
        <Typography variant="h5">What do you want to eat?</Typography>
        <SearchBar
          setShowRecipe={setShowRecipe}
          SetSearchRecipe={SetSearchRecipe}
          SetRecipe={SetRecipe}
        />
      </React.Fragment>

      <Grid>
        {" "}
        <Button
          onClick={() => {
            setShowRecipe(4);
            fetchRecipe();
            setActiveStep(0);
          }}
        >
          {showRecipe == 1 ? "Something else..." : "Surprise me"}
        </Button>
      </Grid>
    </Grid>
  );
};
