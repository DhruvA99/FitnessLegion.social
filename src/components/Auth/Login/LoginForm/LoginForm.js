import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../../features/auth/authSlice";
import styles from "./LoginForm.module.css";

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
              fullWidth
              className={classes.textField}
              id="outlined-basic"
              password={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} alignContent="center">
            {" "}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.loginButton}
              onClick={async () => {
                await dispatch(loginUser({ email, password }));
                if (authToken) {
                  console.log("navigate called");
                  navigate("/home");
                }
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
