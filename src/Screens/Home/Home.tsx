import React, { useState } from "react";
import { Recipe, ComplexSearchRecipe } from "../../App";
import { RandomRecipeCard } from "../../Components/RandomRecipe/RandomRecipeCard";
import { UserSearchRecipe } from "../../Components/SearchRecipe/UserSearchRecipe";
import { SearchRecipe } from "../../Components/SearchRecipe/SearchRecipe";
import { Grid, Typography } from "@mui/material";
import { RecipeCardImage } from "../../Components/RandomRecipe/Components/RecipeCardImage";
import { WelcomeMessage } from "../../Components/WelcomeMessage/WelcomeMessage";
interface Props {
  fetchRecipe: () => Promise<void>;
  recipe: Recipe | undefined;
  activeStep: number;
  SetRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  searchRecipe: ComplexSearchRecipe | undefined;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeRecipe: number | undefined;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  showRecipe: number;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
}
export interface AdvancedSearch {
  advanced: boolean;
  nutrition: boolean;
}
export const Home = ({
  fetchRecipe,
  searchRecipe,
  setShowRecipe,
  SetRecipe,
  showRecipe,
  recipe,
  activeStep,
  setActiveStep,
  setActiveRecipe,
  activeRecipe,
  SetSearchRecipe,
}: Props) => {
  const [advancedSearch, SetAdvancedSearch] = useState<AdvancedSearch>({
    advanced: false,
    nutrition: false,
  });
  return (
    <Grid
      container
      item
      justifyContent={"center"}
      alignContent="center"
      flexDirection={"column"}
      sx={{ minHeight: "100vh" }}
    >
      <SearchRecipe
        SetAdvancedSearch={SetAdvancedSearch}
        advancedSearch={advancedSearch}
        SetSearchRecipe={SetSearchRecipe}
        SetRecipe={SetRecipe}
        setShowRecipe={setShowRecipe}
        fetchRecipe={fetchRecipe}
        setActiveStep={setActiveStep}
        showRecipe={showRecipe}
      />

      {showRecipe == 1 && (
        <React.Fragment>
          {recipe && recipe.code !== 402 ? (
            <RandomRecipeCard
              recipe={recipe}
              fetchRecipe={fetchRecipe}
              setActiveStep={setActiveStep}
              SetRecipe={SetRecipe}
              activeStep={activeStep}
              setActiveRecipe={setActiveRecipe}
              activeRecipe={activeRecipe}
            />
          ) : (
            <Typography color={"error"}>
              Something went wrong try again later - Most likely ran out of API
              calls{" "}
            </Typography>
          )}
        </React.Fragment>
      )}

      {showRecipe == 2 && (
        <UserSearchRecipe
          SetAdvancedSearch={SetAdvancedSearch}
          advancedSearch={advancedSearch}
          setActiveRecipe={setActiveRecipe}
          activeRecipe={activeRecipe}
          searchRecipe={searchRecipe}
          setShowRecipe={setShowRecipe}
          SetSearchRecipe={SetSearchRecipe}
        />
      )}
      {showRecipe == 3 && (
        <Typography color={"error"}>
          Something went wrong try again later - Most likely ran out of API
          calls{" "}
        </Typography>
      )}
      {showRecipe == 4 && <Typography>Loading...</Typography>}
    </Grid>
  );
};
