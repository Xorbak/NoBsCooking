import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//@ts-ignore
export const DietDropDown = ({ field, form, ...props }) => {
  const [cuisine, setDiet] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDiet(event.target.value as string);
  };
  const dietArr = [
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ width: "50%" }}>
        <InputLabel id="demo-simple-select-label">Diet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cuisine}
          onChange={handleChange}
          label="Cuisine"
          {...field}
          {...props}
        >
          {dietArr.map((i) => {
            return <MenuItem value={i}>{i}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
