import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Recipe } from "../../../App";
import { ExtraRecipeInfo } from "./extraRecipeInfo";
import { IngredientPreview } from "./ingredientPreview";
interface Props {
  recipe: Recipe;
  activeStep: number;
}
export const RecipeCardInfo = ({ recipe, activeStep }: Props) => {
  return (
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
        {recipe && recipe.recipes[activeStep].title}
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
          <Typography variant="subtitle2">Ingredients :</Typography>
        </Grid>
        <IngredientPreview recipe={recipe} activeStep={activeStep} />
        <Divider sx={{ width: "100%", marginY: "20px" }} />
        <ExtraRecipeInfo recipe={recipe} activeStep={activeStep} />
      </Grid>
    </Grid>
  );
};
