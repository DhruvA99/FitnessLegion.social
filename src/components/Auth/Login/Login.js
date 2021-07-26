import { Grid, Hidden, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import styles from "./Login.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  mainDiv: {
    padding: "2rem 1rem",
    minHeight: "90vh",
  },
  imageDiv: {
    backgroundColor: "#0071FF",
    color: "#F2FFFF",
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
                <Typography variant="h6">FitnessLegion</Typography>
                <Typography variant="body1">
                  A few clicks away from connecting to you the world
                </Typography>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item xs={12} md={8}></Grid>
      </Grid>
    </div>
  );
};

export default Login;
