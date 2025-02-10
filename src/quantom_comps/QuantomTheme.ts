// theme.js
import { createTheme } from "@mui/material/styles";

// const QuantomTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#536493',       // Custom primary color
//       light: '#536493',      // Light shade of primary color
//       dark: '#536493',       // Dark shade of primary color
//       contrastText: '#536493',  // Text color when using primary color
//     },
//     secondary: {
//       main: '#536493',       // Custom secondary color
//       light: '#536493',      // Light shade of secondary color
//       dark: '#536493',       // Dark shade of secondary color
//       contrastText: '#536493',  // Text color when using secondary color
//     },
//     // You can add more custom colors if needed
//     success: {
//       main: '#4caf50',
//     },
//     warning: {
//       main: '#ff9800',
//     },
//   },
// });
export const QuantomColors = { SelectedElementTextColor: "#FF70B2" };
const QuantomTheme = createTheme({
  palette: {
    primary: {
      main: "#A16EFF", // changed
      dark: "#FFB925",
      contrastText: "#FFFFFF", // CHANGED QuantomColors.SelectedElementTextColor,
      light: "#FF70B2",
    },
    secondary: {
      main: "#05D890",
      contrastText: "#4d524f",
      light: "#05D890",
    },
    background: {
      default: "#1B1B37", //changed
      paper: "#323259", // changed
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
      disabled: "#e4e7ed",
    },
  },
});

export const QuantomLightTheme = createTheme({
  palette: {
    primary: {
      main: "#3366FF", // changed
      dark: "#3366FF",
      contrastText: "#FFFFFF", // CHANGED QuantomColors.SelectedElementTextColor,
      light: "#FF70B2",
    },
    secondary: {
      main: "#FFAB04",
      contrastText: "#FFFFFF",
      light: "#05D890",
    },
    background: {
      default: "#FFFFFF", //changed
      paper: "#EDF1F7", // changed
    },
    text: {
      primary: "#222B45",
      secondary: "#FFFFFF",
      disabled: "#878683",
    },
  },
});

export default QuantomTheme;
