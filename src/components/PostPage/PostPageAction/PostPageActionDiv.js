import { Avatar, makeStyles } from "@material-ui/core";
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
import { likePost, unlikePost } from "../../../features/posts/postSlice";

const useStyles = makeStyles((theme) => ({
  iconCommon: {
    margin: "0.5rem 5rem 0.4rem 0.1rem",
    cursor: "pointer",
  },
}));

const PostPageActionDiv = ({ postInfo }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const userID = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    const likedInfo = postInfo.likes.find((user) => user.userId === userID);
    if (likedInfo) {
      setLikeStatus(true);
    }
  }, [postInfo]);

  const page = <div></div>;
  return (
    <div className="flex flex-row">
      {likeStatus ? (
        <Tooltip title="Unlike" placement="right-end">
          <FavoriteIcon
            color="secondary"
            className={classes.iconCommon}
            onClick={() => {
              dispatch(unlikePost({ postId: postInfo._id }));
              setLikeStatus(false);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Like" placement="right-end">
          <FavoriteBorderIcon
            className={classes.iconCommon}
            onClick={() => {
              dispatch(likePost({ username: username, postId: postInfo._id }));
              setLikeStatus(true);
            }}
          />
        </Tooltip>
      )}
      <Tooltip title="Comment" placement="right-end">
        <MessageIcon className={classes.iconCommon} />
      </Tooltip>
    </div>
  );
};

export default PostPageActionDiv;
