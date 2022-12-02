import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { ComplexSearchRecipe, Recipe } from "../../App";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { AdditionalInformation } from "./components/additionalInformation";
interface Props {
  recipe?: Recipe | undefined;
  activeStep: number;
  activeRecipe: number | undefined;
  SetRecipe?: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  searchRecipe?: ComplexSearchRecipe | undefined;
  SetSearchRecipe?: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
  setActiveRecipe: React.Dispatch<React.SetStateAction<number | undefined>>;
}
export const FullRecipe = ({
  recipe,
  activeStep,
  setShowRecipe,
  setActiveRecipe,
  searchRecipe,
  activeRecipe,
  SetSearchRecipe,
  SetRecipe,
}: Props) => {
  console.log(activeRecipe); //@ts-ignore
  setActiveRecipe(JSON.parse(localStorage.getItem("activeRecipe")));
  useEffect(() => {
    searchRecipe && //@ts-ignore
      SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe")));
    //@ts-ignore
    recipe && SetRecipe(JSON.parse(localStorage.getItem("randomRecipe")));
  }, []);
  const stringTOHtml = (str: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };
  return (
    <Grid
      container
      boxShadow={5}
      xs={10}
      sx={Styles.App}
      justifyContent="center"
    >
      {recipe &&
        recipe.recipes.map(
          ({
            id,
            summary,
            vegan,
            vegitarian,
            glutenFree,
            title,
            readyInMinutes,
            image,
            extendedIngredients,
            analyzedInstructions,
          }) => {
            const recipeSummary = stringTOHtml(summary).outerHTML;
            return id == activeRecipe ? (
              <React.Fragment>
                <Grid
                  container
                  flexDirection={"column"}
                  alignContent={{ xs: "center", md: "start" }}
                  textAlign={{ xs: "center", md: "start" }}
                  xs={12}
                  md={10}
                >
                  <Typography
                    onClick={() => {
                      setShowRecipe(1);
                    }}
                    variant="caption"
                  >
                    <NavLink to={"/"}>Back</NavLink>{" "}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "underline",
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {title}
                  </Typography>
                  <AdditionalInformation
                    readyInMinutes={readyInMinutes}
                    vegan={vegan}
                    vegitarian={vegitarian}
                    glutenFree={glutenFree}
                  />
                  <Grid container item xs={12}>
                    <Grid
                      xs={12}
                      md={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      item
                      overflow={"hidden"}
                      sx={{
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                      component="img"
                      src={image}
                    ></Grid>
                    <Grid
                      xs={12}
                      md={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      item
                      gap={"10px"}
                      overflow={"hidden"}
                      sx={{
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      <Typography
                        sx={{ padding: "20px" }}
                        variant="subtitle2"
                        dangerouslySetInnerHTML={{ __html: recipeSummary }}
                      ></Typography>
                    </Grid>
                  </Grid>{" "}
                  <Grid container item xs={12}>
                    <Grid
                      xs={12}
                      sm={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      textAlign="start"
                      item
                      overflow={"hidden"}
                      sx={{
                        padding: { xs: "10px" },
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      <Typography variant="h6">Ingredients</Typography>
                      {extendedIngredients.map((i) => {
                        return (
                          <Typography variant="subtitle2">
                            {i.original}
                          </Typography>
                        );
                      })}
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      textAlign="start"
                      item
                      gap={"10px"}
                      overflow={"hidden"}
                      sx={{
                        padding: { xs: "10px" },
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      <Typography sx={{ paddingLeft: "20px" }} variant="h6">
                        Instructions
                      </Typography>
                      {analyzedInstructions[0].steps.map(({ step, number }) => {
                        return (
                          <Grid container item flexDirection={"row"}>
                            <Grid item xs={1}>
                              <Typography>{number}.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                              <Typography>{step}</Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : null;
          }
        )}

      {searchRecipe &&
        searchRecipe.results.map(
          ({
            id,
            summary,
            vegan,
            vegitarian,
            glutenFree,
            title,
            readyInMinutes,
            image,
            extendedIngredients,
            analyzedInstructions,
          }) => {
            const recipeSummary = stringTOHtml(summary).outerHTML;
            return id == activeRecipe ? (
              <React.Fragment>
                <Grid
                  container
                  flexDirection={"column"}
                  alignContent={{ xs: "center", md: "start" }}
                  textAlign={{ xs: "center", md: "start" }}
                  xs={12}
                  md={10}
                >
                  <Typography
                    onClick={() => {
                      setShowRecipe(2);
                    }}
                    variant="caption"
                  >
                    <NavLink to={"/"}>Back</NavLink>{" "}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "underline",
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {title}
                  </Typography>
                  <AdditionalInformation
                    readyInMinutes={readyInMinutes}
                    vegan={vegan}
                    vegitarian={vegitarian}
                    glutenFree={glutenFree}
                  />
                  <Grid container item xs={12}>
                    <Grid
                      xs={12}
                      md={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      item
                      width={"100%"}
                      overflow={"hidden"}
                      sx={{
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                      component="img"
                      src={image}
                    ></Grid>
                    <Grid
                      xs={12}
                      md={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      item
                      gap={"10px"}
                      overflow={"hidden"}
                      sx={{
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      <Typography
                        sx={{ padding: "20px" }}
                        variant="subtitle2"
                        dangerouslySetInnerHTML={{ __html: recipeSummary }}
                      ></Typography>
                    </Grid>
                  </Grid>{" "}
                  <Grid container item xs={12}>
                    <Grid
                      xs={12}
                      sm={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      textAlign="start"
                      item
                      overflow={"hidden"}
                      sx={{
                        padding: { xs: "10px" },
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      <Typography variant="h6">Ingredients</Typography>
                      {extendedIngredients.map((i) => {
                        return (
                          <Typography variant="subtitle2">
                            {i.original}
                          </Typography>
                        );
                      })}
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      alignContent={"start"}
                      justifyContent={"start"}
                      alignSelf={"start"}
                      textAlign="start"
                      item
                      gap={"10px"}
                      overflow={"hidden"}
                      sx={{
                        padding: { xs: "10px" },
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      <Typography sx={{ paddingLeft: "20px" }} variant="h6">
                        Instructions
                      </Typography>
                      {analyzedInstructions[0].steps.map(({ step, number }) => {
                        return (
                          <Grid container item flexDirection={"row"}>
                            <Grid item xs={1}>
                              <Typography>{number}.</Typography>
                            </Grid>
                            <Grid item xs={11}>
                              <Typography>{step}</Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : null;
          }
        )}
    </Grid>
  );
};
export const Styles = {
  App: {
    textAlign: "center",
    backgroundColor: "background.default",
    width: { xs: "100%" },
    minHeight: "100vh",
    marginY: "20px",
    borderRadius: "5px",
    alignItems: "start",
    justifyContent: { sm: "start", md: "center" },
    fontSize: "calc(10px + 2vmin)",
  },
};
