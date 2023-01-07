import { InputBase } from "@mui/material";
import React from "react";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField/TextField";
//@ts-ignore
export const NavSearchInput = ({ field, form, ...props }) => {
  return (
    <React.Fragment>
      <InputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        autoComplete="off"
        {...field}
        {...props}
      />
    </React.Fragment>
  );
};
