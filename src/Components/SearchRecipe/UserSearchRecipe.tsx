import { Grid, Typography } from "@mui/material";
import { ComplexSearchRecipe } from "../../App";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
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
      xs={11}
      container
      flexDirection={"row"}
      justifyContent="space-between"
      alignContent="start"
    >
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
          }) => {
            return (
              <Grid
                margin={"10px"}
                boxShadow={5}
                container
                flexDirection={"row"}
                xs={5.5}
                sx={{ cursor: "pointer", borderRadius: "5px" }}
                onPointerDown={() => {
                  localStorage.setItem("activeRecipe", JSON.stringify(id));
                  setActiveRecipe(id);
                  console.log(activeRecipe);
                }}
              >
                {" "}
                <NavLink to={`/search/${activeRecipe}`}>
                  <Grid xs={4}>
                    <Grid
                      container
                      component="img"
                      src={image}
                      sx={{
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    ></Grid>
                  </Grid>
                </NavLink>
                <Grid
                  container
                  xs={8}
                  flexDirection="column"
                  alignContent={"start"}
                  textAlign="start"
                >
                  <Typography
                    sx={{ margin: "5px" }}
                    variant="subtitle1"
                    fontWeight={"bold"}
                  >
                    {title}
                  </Typography>
                  <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                    Ready in :{readyInMinutes} Min
                  </Typography>{" "}
                  <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                    Servings : {servings}
                  </Typography>{" "}
                  <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                    Diets :{" "}
                    {diets.map((i) => {
                      return diets.indexOf(i) !== diets.length - 1
                        ? `${i.charAt(0).toLocaleUpperCase() + i.slice(1)}, `
                        : `${i.charAt(0).toLocaleUpperCase() + i.slice(1)} `;
                    })}
                  </Typography>{" "}
                  <Typography
                    component={"div"}
                    variant="caption"
                    sx={{ marginLeft: "5px" }}
                  >
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
            );
          }
        )}
    </Grid>
  );
};
