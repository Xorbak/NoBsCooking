import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  label: string;
  details: boolean;
}

export const DietaryCheck = ({ label, details }: Props) => {
  return (
    <Grid container item xs={12}>
      <Typography sx={{ display: "flex" }} variant="subtitle2">
        {label}
        {details ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <ClearIcon color="error" fontSize="small" />
        )}
      </Typography>
    </Grid>
  );
};
