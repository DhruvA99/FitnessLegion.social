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
import CommentCard from "./CommentCard";
import axios from "axios";

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
  leftSpace: {
    marginLeft: theme.spacing(5),
  },
  textBox: {
    marginBottom: "1rem",
  },
  toolbar: theme.mixins.toolbar,
}));

const CommentSection = ({ postInfo, getPost }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const userID = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.authToken);
  const username = useSelector((state) => state.auth.username);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  //   useEffect(() => {
  //     const likedInfo = postInfo.likes.find((user) => user.userId === userID);
  //     if (likedInfo) {
  //       setLikeStatus(true);
  //     }
  //   }, [postInfo]);

  const addComment = async () => {
    try {
      if (comment.length === 0) {
        setError("You cannot post empty comment!");
        return;
      } else {
        setError("");
        setLoading(true);
        const response = await axios.post(
          `/posts/comment/${postInfo._id}`,
          { body: comment, username },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              userId: userID,
            },
          }
        );
        getPost();
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  let page = <div>Loading</div>;
  if (!loading) {
    page = (
      <Card className={classes.root}>
        <CardContent className={classes.contentDiv}>
          <Grid container spacing={2} className={classes.textBox}>
            <Grid item xs={8}>
              {" "}
              <TextField
                className=""
                error={error !== ""}
                helperText={error ? error : ""}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="outlined-basic"
                label="Add Comment"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Button
                className=""
                variant="contained"
                color="primary"
                onClick={addComment}
              >
                Add Comment
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <div className="flex flex-col justify-center align-middle">
            {postInfo.comments.length !== 0 &&
              postInfo.comments.map((comment) => (
                <CommentCard postInfo={postInfo} />
              ))}
            {postInfo.comments.length === 0 && (
              <div className="px-2 py-3 text-center">
                <Typography variant="body2">No Comments till yet</Typography>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  return <div className="">{page}</div>;
};

export default CommentSection;
