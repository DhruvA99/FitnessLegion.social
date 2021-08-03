import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  heading1: {
    width: "95%",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className=" p-5 w-screen">
      <div className="flex flex-col w-full ">
        <Typography className={classes.heading1} gutterBottom variant="h4">
          Connect to the world of fitness
        </Typography>
      </div>
      <div className=""></div>
    </div>
  );
};

export default LandingPage;
