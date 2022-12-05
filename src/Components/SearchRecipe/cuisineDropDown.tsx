import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//@ts-ignore
export const CuisineDropDown = ({ field, form, ...props }) => {
  const [cuisine, setCuisine] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCuisine(event.target.value as string);
  };
  const cuisineArr = [
    "African",
    "American",
    "British",
    "Cajun",
    " Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ width: "50%" }}>
        <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cuisine}
          onChange={handleChange}
          label="Cuisine"
          {...field}
          {...props}
        >
          {cuisineArr.map((i) => {
            return <MenuItem value={i}>{i}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
