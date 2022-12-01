import { TextField } from "@mui/material";
//@ts-ignore
export const Myinput = ({ field, form, ...props }) => {
  return <TextField {...field} {...props}></TextField>;
};
