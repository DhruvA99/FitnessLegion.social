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
import CommentMenuButton from "./CommentMenuButton";

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

const CommentCard = ({ commentInfo, postId, deleteCommentHandler }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const userID = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const classes = useStyles();

  const page = <div></div>;
  return (
    <>
      <div className="w-full flex-col px-5 py-6">
        <div className="w-full flex items-center ">
          <div className="w-2/12 md:w-1/12">
            <Avatar
              className=""
              src={
                commentInfo.profileImageURL ? commentInfo.profileImageURL : ""
              }
              alt="img"
            />
          </div>

          <div className="flex flex-col w-9/12 md:w-10/12">
            <Typography variant="body1" color="textPrimary">
              {commentInfo.username}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {commentInfo.body}
            </Typography>
          </div>
          {
            <div className="w-1/12 md:w-1/12">
              <CommentMenuButton
                postId={postId}
                commentId={commentInfo._id}
                commentUserId={commentInfo.userId}
                deleteCommentHandler={deleteCommentHandler}
              />
            </div>
          }
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CommentCard;
