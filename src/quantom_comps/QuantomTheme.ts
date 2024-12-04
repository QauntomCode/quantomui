// theme.js
import { createTheme } from '@mui/material/styles';

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
export const QuantomColors={SelectedElementTextColor:"#F1F3F3"}
const QuantomTheme = createTheme({
    palette: {
      primary: {
        main:  "#16423C",
        dark: '#004ba0',
        contrastText: QuantomColors.SelectedElementTextColor,
        light:'rgba(22, 66, 60, .6)'
      },
      secondary: {
        main:  "#6A9C89",
      },
      background: {
        default: "#E9EFEC",
        paper: "#E3EBE7", // Optional: white for cards, dialogs, etc.
      },
      text: {
        primary:  "#16423C",
        secondary:'#2c2e2c'
      },
    },
  });


export default QuantomTheme;
