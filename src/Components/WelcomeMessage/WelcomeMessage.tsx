import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

export const WelcomeMessage = () => {
  return (
    <Grid item container flexDirection={"column"} xs={11} md={8} sx={{}}>
      <Grid>
        <Typography sx={{ marginBottom: "100px" }} variant="h2">
          Welcome to NOBS cooking!
        </Typography>{" "}
      </Grid>
      <Grid>
        <Typography sx={{ marginBottom: "10px" }} variant="h5">
          The home of recipes without any frills or life stories
        </Typography>
      </Grid>{" "}
      <Grid>
        <Typography variant="body1">
          Have you ever tried to get a recipe, only to be forced to read through
          the authors entire life story. When all you wanted to know was how
          many cups of flour you need for pancakes? Well, NO MORE! I decided to
          make a simple webpage using the SPOONACULAR api to display only the
          information that you want to see!
        </Typography>
      </Grid>{" "}
      <Grid>
        <Typography sx={{ marginBottom: "20px" }} variant="body1">
          No more weeding through a mountain of useless information to get to
          the good stuff.{" "}
        </Typography>
      </Grid>{" "}
      <Grid item container justifyContent={"center"}>
        <NavLink style={{ textDecoration: "none" }} to={`/search`}>
          <Button>
            <Typography
              sx={{
                color: "primary.main",
                display: { xs: "none", md: "block" },
                width: "fit-content",
                "&:hover": {
                  cursor: "pointer",
                  fontWeight: "bold",
                },
              }}
              variant="h1"
            >
              CLICK HERE TO GET STARTED
            </Typography>{" "}
            <Typography
              sx={{
                color: "primary.main",
                display: { xs: "block", md: "none" },
                width: "fit-content",
                "&:hover": {
                  cursor: "pointer",
                  fontWeight: "bold",
                },
              }}
              variant="h2"
            >
              CLICK HERE TO GET STARTED
            </Typography>
          </Button>
        </NavLink>
      </Grid>{" "}
      <Grid>
        <Typography sx={{ marginTop: "100px" }} variant="subtitle2">
          *The website is still under construction so things that used to work
          might magically stop working{" "}
        </Typography>
      </Grid>
    </Grid>
  );
};
