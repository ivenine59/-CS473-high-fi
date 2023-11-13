import { alpha, createTheme, getContrastRatio } from "@mui/material/styles";

const blackBase = "#000000";
const blackMain = alpha(blackBase, 0.9);

const theme = createTheme({
  palette: {
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

export { theme };
