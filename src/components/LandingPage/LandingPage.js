import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import LandingPageImage from "../../utils/images/landingImageMain.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading1: {
    letterSpacing: "0.035rem",
  },
  customButton: {
    margin: "1rem 0.8rem",
    padding: "0.5rem 0.8rem",
    width: "100%",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className=" p-5 pt-36">
      <div className="flex flex-col w-full items-center ">
        <Typography className={`${classes.heading1}`} gutterBottom variant="h4">
          Connect to the world of fitness
        </Typography>
        <Typography variant="body1">
          Find the like minded Fitness Enthusiast and connect with them
        </Typography>
        <Link to="/login" className="w-6/12 md:w-3/12">
          <Button
            variant="contained"
            color="primary"
            className={`  ${classes.customButton}`}
          >
            Connect
          </Button>
        </Link>
      </div>
      <div className="w-full">
        <img className="w-full" src={LandingPageImage} alt="img" />
      </div>
    </div>
  );
};

export default LandingPage;
