import { ThemeOptions } from "@mui/material/styles/createTheme";
import createTheme from "@mui/material/styles/createTheme";

const lightModeValues: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#9394a5",
      light: "rgb(168, 169, 183)",
      dark: "rgb(102, 103, 115)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#d2d3db",
      light: "rgb(219, 219, 226)",
      dark: "rgb(147, 147, 153)",
    },
    grey: {
      100: "#f5f5f5",
      900: "#212121",
    },
    background: {
      default: "#fafafa",
      paper: "#e4e5f1",
    },
    action: {
      active: "#FFFFFF",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
    text: {
      primary: "rgba(72,75,106,0.84)",
      secondary: "rgba(72,75,106,0.54)",
      disabled: "rgba(72,75,106,0.25)",
    },
    error: {
      main: "#ff1100",
    },
    success: { main: "#4CAF50" },
  },
  typography: { htmlFontSize: 20 },
  shape: {
    borderRadius: 5,
  },
};

export const lightMode = createTheme(lightModeValues);
