import { Grid, Typography } from "@mui/material";
import { ComplexSearchRecipe } from "../../App";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { RecipeCardImage } from "../RandomRecipe/Components/RecipeCardImage";
import { RecipeCard } from "../RandomRecipe/Components/RecipeCard";
import { RecipeCardInfo } from "../RandomRecipe/Components/recipeCardInfo";
interface Props {
  searchRecipe: ComplexSearchRecipe | undefined;
  activeRecipe: number | undefined;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
}
export const UserSearchRecipe = ({
  searchRecipe,
  activeRecipe,
  setActiveRecipe,
  SetSearchRecipe,
}: Props) => {
  useEffect(() => {
    //@ts-ignore
    SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe")));
  }, []);
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection="row"
      item
      xs={12}
      md={12}
    >
      {searchRecipe && searchRecipe.results.length == 0 && (
        <Grid alignSelf="center">No Results found</Grid>
      )}

      {searchRecipe &&
        searchRecipe.results.map(
          ({
            image,
            title,
            id,
            readyInMinutes,
            servings,
            diets,
            weightWatcherSmartPoints,
          }) => (
            <Grid //content card
              sx={{ borderRadius: "5px" }}
              boxShadow={5}
              ml={"5px"}
              marginBottom={"20px"}
              xs={11}
              sm={8}
              md={3}
            >
              <Grid
                key={id}
                container
                overflow="hidden"
                xs={12}
                item
                onPointerDown={() => {
                  localStorage.setItem("activeRecipe", JSON.stringify(id));
                  setActiveRecipe(id);
                  console.log(activeRecipe);
                }}
                sx={{ cursor: "pointer" }}
              >
                <NavLink to={`/search/${activeRecipe}`}>
                  <Grid
                    xs={12}
                    width="100vw"
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
                    {title}
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
                    <Grid container xs={12}>
                      <Typography variant="subtitle2">
                        Ready in :{readyInMinutes} Min
                      </Typography>
                    </Grid>
                    <Grid container xs={12}>
                      <Typography variant="subtitle2">
                        Servings : {servings}
                      </Typography>
                    </Grid>
                    <Grid container xs={12}>
                      <Typography variant="subtitle2">
                        Diets :{" "}
                        {diets.map((i) => {
                          return diets.indexOf(i) !== diets.length - 1
                            ? `${
                                i.charAt(0).toLocaleUpperCase() + i.slice(1)
                              }, `
                            : `${
                                i.charAt(0).toLocaleUpperCase() + i.slice(1)
                              } `;
                        })}
                      </Typography>
                    </Grid>
                    <Grid container xs={12}>
                      <Typography variant="subtitle2">
                        Weigh Loss points : {`${weightWatcherSmartPoints}`}{" "}
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold", fontSize: "10px" }}
                        >
                          *smaller = better
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>{" "}
            </Grid>
          )
        )}
    </Grid>
  );
};
