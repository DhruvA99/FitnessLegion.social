import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { themeOptions } from "./utils/theme";
import reportWebVitals from "./reportWebVitals";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

const mode = "light";

const theme = createTheme({
  ...themeOptions,
  palette: {
    ...themeOptions.palette,
    type: mode === "light" ? "light" : "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
