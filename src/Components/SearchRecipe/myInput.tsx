import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
//@ts-ignore
export const Myinput = ({ field, form, ...props }) => {
  return (
    <TextField
      autoComplete="off"
      {...field}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};
