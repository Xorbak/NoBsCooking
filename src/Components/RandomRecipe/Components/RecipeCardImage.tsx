import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

interface Props {
  image: string;
  activeRecipe: string | undefined;
}

export const RecipeCardImage = ({ image, activeRecipe }: Props) => {
  return (
    <NavLink to={`${activeRecipe}`}>
      <Grid
        xs={12}
        width={"100%"}
        item
        overflow={"hidden"}
        sx={{
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
        }}
        component="img"
        src={image}
      />
    </NavLink>
  );
};
