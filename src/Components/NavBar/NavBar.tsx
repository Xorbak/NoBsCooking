import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import { NavSearch } from "./Components/NavSearch";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
interface Props {
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
}
export const NavBar = ({ setShowRecipe }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <NavLink to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            >
              <HomeIcon sx={{ color: "primary.dark" }} />
            </IconButton>{" "}
          </NavLink>
          <Grid
            sx={{
              flexGrow: 1,
              color: "primary.dark",
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
          >
            <NavLink
              style={{ textDecoration: "none", textDecorationColor: "none" }}
              to={"/"}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: "primary.dark",
                  justifyContent: "center",
                }}
              >
                No BS Cooking{" "}
              </Typography>
            </NavLink>
          </Grid>
          <Search
            sx={{
              position: { xs: "sticky", sm: "absolute" },
              right: "30px",
            }}
          >
            <NavSearch setShowRecipe={setShowRecipe} />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
