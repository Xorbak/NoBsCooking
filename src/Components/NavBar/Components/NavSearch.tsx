import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import { NavSearchInput } from "./NavSearchInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
interface Props {
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
}
export const NavSearch = ({ setShowRecipe }: Props) => {
  const StyledInputBase = styled("div")(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const navigate = useNavigate(); //@ts-ignore
  const handleSubmit = () => {
    // 👇️ redirect to /contacts
    navigate("/search");
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={{ input: "" }}
        onSubmit={({ input }) => {
          console.log(input);
          handleSubmit();
          const SearchParams = {
            method: "GET",
            params: {
              query: input,
              apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
              addRecipeInformation: true,
              fillIngredients: true,
              offset: 0,
              number: 12,
            },
            url: `https://api.spoonacular.com/recipes/complexSearch`,
          };

          axios
            .request(SearchParams)
            .then((response) => {
              console.log("worked");
              console.log(response.data);
              localStorage.setItem(
                //Save response in local storage to use when moving to the next page
                "searchParams",
                JSON.stringify({
                  query: input,
                  apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
                  addRecipeInformation: true,
                  fillIngredients: true,
                  offset: 0,
                  number: 12,
                })
              );
              localStorage.setItem(
                "searchRecipe",
                JSON.stringify(response.data)
              );
            })
            .then(() => setShowRecipe(2))
            .then(() => console.log("Did it work?"))

            .catch((e) => {
              console.log("error");

              setShowRecipe(2);
            });
        }}
      >
        {() => (
          <StyledInputBase>
            <Form
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <IconButton
                sx={{
                  color: "primary.dark",
                }}
                type="submit"
              >
                <SearchIcon />
              </IconButton>

              <Field name="input" type="input" component={NavSearchInput} />
            </Form>
          </StyledInputBase>
        )}
      </Formik>
    </React.Fragment>
  );
};
