import {
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import styles from "./Login.module.css";
import loginImage from "../../../utils/images/loginImage.svg";
import LoginForm from "./LoginForm/LoginForm";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    [theme.breakpoints.down("sm")]: {
      minHeight: "90%",
    },
    height: "90%",
    padding: "",
    width: "80%",
    margin: "6rem  auto",
  },
  gridContainer: {
    height: "100%",
  },
  imageDiv: {
    backgroundColor: "#0071FF",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    color: "#F2FFFF",
    paddingTop: "3rem",
  },
  textCommon: {
    padding: "0.4rem 0.7rem ",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  return (
    <div className={styles.main_container}>
      <Paper className={classes.mainDiv} elevation={6}>
        <Grid
          container
          justifyContent="center"
          className={classes.gridContainer}
        >
          <Hidden xsDown>
            <Grid item xs={12} md={4} className={classes.imageDiv}>
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
            </Grid>
          </Hidden>
          <Grid item xs={12} md={8}>
            <LoginForm />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
