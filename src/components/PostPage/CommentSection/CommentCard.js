import { Avatar, Divider, Grid, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import MessageIcon from "@material-ui/icons/Message";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0.7rem",
    [theme.breakpoints.down("sm")]: {},
  },
  contentDiv: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
  },
  leftSpace: {
    marginLeft: theme.spacing(5),
  },
  textBox: {
    marginBottom: "1rem",
  },
  toolbar: theme.mixins.toolbar,
}));

const CommentCard = ({ postInfo }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const userID = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const classes = useStyles();

  const page = <div></div>;
  return (
    <div className="flex">
      <Divider />
    </div>
  );
};

export default CommentCard;
