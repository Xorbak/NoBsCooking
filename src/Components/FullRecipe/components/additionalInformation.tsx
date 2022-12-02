import Typography from "@mui/material/Typography";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  readyInMinutes: string;
  vegan: boolean;
  vegitarian: boolean;
  glutenFree: boolean;
}
export const AdditionalInformation = ({
  readyInMinutes,
  vegan,
  vegitarian,
  glutenFree,
}: Props) => {
  return (
    <React.Fragment>
      <Typography>Ready in:{readyInMinutes} Min</Typography>
      <Typography sx={{ display: "flex" }} variant="subtitle2">
        Vegan :
        {vegan ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <ClearIcon color="error" fontSize="small" />
        )}
      </Typography>
      <Typography sx={{ display: "flex" }} variant="subtitle2">
        Vegitarian :
        {vegitarian ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <ClearIcon color="error" fontSize="small" />
        )}
      </Typography>
      <Typography sx={{ display: "flex" }} variant="subtitle2">
        Gluten free:
        {glutenFree ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <ClearIcon color="error" fontSize="small" />
        )}
      </Typography>
    </React.Fragment>
  );
};
