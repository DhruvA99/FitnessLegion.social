import { Avatar, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0.7rem",
    [theme.breakpoints.down("sm")]: {},
  },
  contentDiv: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
}));

const PostCard = ({ postInfo }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const page = <div></div>;
  return (
    <div className="container ">
      <Card className={classes.root}>
        <CardContent className={classes.contentDiv}>
          <div className="w-full px-4 py-3 flex items-center">
            <Avatar />
            <div className="flex flex-col p-2">
              <Typography variant="body1">{postInfo.username}</Typography>
              <Typography variant="subtitle1">time</Typography>
            </div>
          </div>
          <div className="w-full px-5 py-3">
            <Typography variant="body2">{postInfo.body}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCard;
