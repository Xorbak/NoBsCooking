import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

function App() {
  return (
    <Grid
      sx={Styles.App}
      justifyContent={"center"}
      alignContent={"center"}
      flexDirection={"column"}
      container
      columns={10}
      xs={12}
    >
      <Grid>
        <Button>Get Random recipe!</Button>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        item
        xs={10}
      >
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "red" }}
          xs={1}
          item
        >
          3
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "blue" }}
          xs={1}
          item
        >
          4
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "green" }}
          xs={1}
          item
        >
          5
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "yellow" }}
          xs={1}
          item
        >
          6
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "orange" }}
          xs={1}
          item
        >
          7
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "purple" }}
          xs={1}
          item
        >
          8
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "pink" }}
          xs={1}
          item
        >
          9
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "tan" }}
          xs={1}
          item
        >
          10
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "grey" }}
          xs={1}
          item
        >
          11
        </Grid>
        <Grid
          sx={{ width: "50px", height: "50px", backgroundColor: "red" }}
          xs={1}
          item
        >
          12
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
export const Styles = {
  App: {
    textAlign: "center",
    backgroundColor: "background.default",
    width: { xs: "100%" },
    minHeight: "100vh",

    alignItems: "center",
    justifyContent: { sm: "center", md: "center" },
    fontSize: "calc(10px + 2vmin)",
  },
};
