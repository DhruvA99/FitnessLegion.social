import {
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import styles from "./Signup.module.css";
import signupImage from "../../../utils/images/signupImage.svg";
import SignupForm from "./SignupForm/SignupForm";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    width: "80%",
    margin: " 2rem auto",
    boxShadow: "10px 14px 23px -11px rgba(0, 0, 0, 0.6)",
  },
  imageDiv: {
    backgroundColor: "#1156ad",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    color: "#F2FFFF",
    paddingTop: "3rem",
  },
  textCommon: {
    padding: "0.4rem 0.7rem ",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  return (
    <div className={styles.main_container}>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        className={classes.mainDiv}
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
                  className={styles.signup_image}
                  src={signupImage}
                  alt="img"
                />
              </Grid>
            </Grid>
          </Grid>{" "}
        </Hidden>
        <Grid item xs={12} md={8}>
          <SignupForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
