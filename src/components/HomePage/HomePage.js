import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import Loader from "../LoaderComponent/Loader";
import PostList from "../PostList/PostList";
import AddPost from "./AddPost/AddPost";

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
    margin: "1rem 0.4rem",
  },
  loginButton: {
    width: "70%",
    margin: "2rem 1rem",
    padding: "0.9rem 0.5rem",
  },
  heading: {
    letterSpacing: "0.4px",
    fontSize: "1.725rem",
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  return (
    <div className="container w-full p-6 ">
      <div className="flex flex-col">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <AddPost />
          </Grid>
          <Grid item xs={12}>
            <PostList />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
