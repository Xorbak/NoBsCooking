import Grid from "@mui/material/Grid";
import SwipeableViews from "react-swipeable-views";
import { Recipe } from "../../../App";
import { RecipeCardImage } from "./RecipeCardImage";
import { RecipeCardInfo } from "./recipeCardInfo";
interface Props {
  activeStep: number;
  handleStepChange: (step: number) => void;
  recipe: Recipe | undefined;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeRecipe: number | undefined;
}
export const RecipeCard = ({
  activeStep,
  handleStepChange,
  recipe,
  setActiveRecipe,
  activeRecipe,
}: Props) => {
  return (
    <Grid //content card
      sx={{ borderRadius: "5px", backgroundColor: "background.paper" }}
      boxShadow={5}
      item
      marginBottom={"20px"}
      xs={11}
      sm={8}
      md={3}
    >
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        onPointerDown={() => {
          localStorage.setItem(
            "activeRecipe",
            JSON.stringify(recipe && recipe.recipes[activeStep].id)
          );
          setActiveRecipe(recipe && recipe.recipes[activeStep].id);
          console.log(activeRecipe);
        }}
      >
        {recipe &&
          recipe.recipes.map(({ id, image }) => (
            <Grid
              key={id}
              container
              overflow="hidden"
              xs={12}
              item
              sx={{ cursor: "pointer" }}
            >
              <RecipeCardImage
                image={image}
                activeRecipe={`/random/${activeRecipe}`}
              />
              <RecipeCardInfo recipe={recipe} activeStep={activeStep} />
            </Grid>
          ))}
      </SwipeableViews>
    </Grid>
  );
};
