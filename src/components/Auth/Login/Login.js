import {
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import styles from "./Login.module.css";
import loginImage from "../../../utils/images/loginImage.svg";
import LoginForm from "./LoginForm/LoginForm";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    minHeight: "90vh",
    width: "80%",
    margin: " 2rem auto",
    boxShadow: "10px 14px 23px -11px rgba(0, 0, 0, 0.6)",
  },
  imageDiv: {
    backgroundColor: "#0071FF",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    color: "#F2FFFF",
    paddingTop: "5rem",
  },
  textCommon: {
    padding: "0.4rem 0.7rem ",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  return (
    <div className={styles.main_container}>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        className={classes.mainDiv}
      >
        <Grid item xs={12} md={4} className={classes.imageDiv}>
          <Hidden xsDown>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  className={classes.textCommon}
                >
                  FitnessLegion
                </Typography>

                <Typography
                  variant="h6"
                  className={classes.textCommon}
                  align="center"
                  style={{ paddingTop: "5rem" }}
                >
                  A few clicks away from connecting to the world
                </Typography>
              </Grid>
              <Grid item>
                <img
                  className={styles.login_image}
                  src={loginImage}
                  alt="img"
                />
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item xs={12} md={8}>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
