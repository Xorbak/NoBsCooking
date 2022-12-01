import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Recipe } from "../../../App";
import { DietaryCheck } from "./dietaryCheck";

interface Props {
  recipe: Recipe;
  activeStep: number;
}
export const ExtraRecipeInfo = ({ recipe, activeStep }: Props) => {
  return (
    <Grid>
      <Grid xs={12} container item>
        <Typography variant="subtitle2">
          Ready in: {recipe && recipe.recipes[activeStep].readyInMinutes}
          min{" "}
        </Typography>
      </Grid>{" "}
      <DietaryCheck
        label={"Vegan :"}
        details={recipe && recipe.recipes[activeStep].vegan}
      />{" "}
      <DietaryCheck
        label={"Vegitarian :"}
        details={recipe && recipe.recipes[activeStep].vegitarian}
      />{" "}
      <DietaryCheck
        label={"Gluten free :"}
        details={recipe && recipe.recipes[activeStep].glutenFree}
      />
    </Grid>
  );
};
