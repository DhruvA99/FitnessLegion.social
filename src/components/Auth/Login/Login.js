import {
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Login.module.css";
import loginImage from "../../../utils/images/loginImage.svg";
import LoginForm from "./LoginForm/LoginForm";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    [theme.breakpoints.down("sm")]: {},
    flexGrow: "1",
    minHeight: "50vh",
  },
  imageDiv: {
    backgroundColor: "#0071FF",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    color: "#F2FFFF",
    paddingTop: "3rem",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#0fc0bc",
    width: "100%",
  },
  textCommon: {
    padding: "0.4rem 0.7rem ",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [openBackDrop, setOpenBackdrop] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  let page = (
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
              </Grid>{" "}
            </Grid>
          </Hidden>
          <Grid item xs={12} md={8}>
            <LoginForm />
          </Grid>
        </Grid>
      </Paper>
      <Backdrop
        className={classes.backdrop}
        open={authStatus === "loading" ? true : false}
      >
        <CircularProgress color="inherit" thickness="5" size="7rem" />
      </Backdrop>
    </div>
  );

  return <>{page}</>;
};

export default Login;
