import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import Slide from "@mui/material/Slide";
interface Data {
  lable: string;
  color: string;
}
export const RandomRecipeCarousel = () => {
  const [showRecipe, SetShowRecipe] = useState<number>(0);
  const RandomRecipeArray: Data[] = [
    { lable: "1", color: "#124516" },
    { lable: "2", color: "#312342" },
    { lable: "3", color: "#412456" },
    { lable: "4", color: "#414456" },
    { lable: "5", color: "#234136" },
    { lable: "6", color: "#426512" },
    { lable: "7", color: "#753423" },
    { lable: "8", color: "#948347" },
    { lable: "9", color: "#213531" },
    { lable: "10", color: "#321423" },
  ];
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        item
        xs={10}
      >
        <Grid container justifyContent={"center"} xs={10}>
          <Grid
            sx={{
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
            xs={1}
            item
          >
            <Typography
              onClick={() => {
                showRecipe == 0
                  ? SetShowRecipe(9)
                  : SetShowRecipe(showRecipe - 1);
              }}
              variant="h5"
            >{`${"<"}`}</Typography>
          </Grid>
          <Grid
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: RandomRecipeArray[showRecipe].color,
            }}
            xs={8}
            item
          >
            {RandomRecipeArray[showRecipe].lable}
          </Grid>
          <Grid
            sx={{
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
            xs={1}
            item
          >
            <Typography
              onClick={() => {
                showRecipe == 9
                  ? SetShowRecipe(0)
                  : SetShowRecipe(showRecipe + 1);
              }}
              variant="h5"
            >{`${">"}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
