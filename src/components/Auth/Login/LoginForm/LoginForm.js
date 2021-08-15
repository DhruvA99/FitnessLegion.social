import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../../features/auth/authSlice";
import styles from "./LoginForm.module.css";

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    paddingTop: "1rem",
    [theme.breakpoints.up("sm")]: {},
  },
  loginDiv: {
    paddingTop: "2rem",
    width: "70%",
    margin: "auto",
  },
  textField: {
    margin: "1rem 0",
  },
  loginButton: {
    margin: "2rem auto",
    padding: "0.9rem 0.5rem",
  },
  heading: {
    letterSpacing: "0.4px",
    fontSize: "1.725rem",
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
  });

  const LoginHandler = () => {
    if (!emailRegex.test(email)) {
      setHelperText((helperText) => ({
        ...helperText,
        email: "Email is not Valid",
      }));
    }
    if (password.length < 8) {
      setHelperText((helperText) => ({
        ...helperText,
        password: "Password cannot be less than 8 characters",
      }));
    }
    if (emailRegex.test(email) && password.length >= 8) {
      setHelperText({ email: "", password: "" });
      dispatch(loginUser({ email, password }));
      if (authToken) {
        navigate("/home");
      }
    }
  };

  return (
    <div className={styles.main_container}>
      <Grid container className={classes.mainDiv}>
        <Grid item xs={12} alignItems="center">
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            className={classes.heading}
          >
            Login
          </Typography>
          <Typography align="center" variant="subtitle1">
            Login to your account
          </Typography>
        </Grid>
        <Grid container className={classes.loginDiv}>
          <Grid item xs={12}>
            <TextField
              error={helperText.email !== ""}
              helperText={helperText.email}
              fullWidth
              className={classes.textField}
              id="outlined-basic"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={helperText.password !== ""}
              helperText={helperText.password}
              fullWidth
              className={classes.textField}
              id="outlined-basic"
              password={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} alignContent="left">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  name="showPassword"
                  color="primary"
                />
              }
              label="Show Password"
            />
          </Grid>
          <Grid item xs={12} alignContent="center">
            {" "}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.loginButton}
              onClick={LoginHandler}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              OR
            </Typography>
          </Grid>
          <Grid item xs={12} alignContent="center">
            {" "}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.loginButton}
              onClick={async () => {
                await dispatch(
                  loginUser({ email: "admin@da.com", password: "Admin@123" })
                );
                if (authToken) {
                  navigate("/home");
                }
              }}
            >
              Login as Guest
            </Button>
          </Grid>
          <Grid item xs={12} gutterBottom style={{ marginBottom: "3rem" }}>
            <Typography variant="body1">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-blue-600 underline">Sign Up</span>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
