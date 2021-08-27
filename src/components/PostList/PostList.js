import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import SkeletonLoading from "../SkeletonLoading/SkeletonLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../features/posts/postSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0.7rem",

    flexDirection: "column",
    minHeight: "70vh",
    [theme.breakpoints.down("sm")]: {},
  },
  contentDiv: {
    width: "100%",
    margin: "auto",
  },
}));

const PostList = (props) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.posts.postData);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  const classes = useStyles();
  let page = <div></div>;
  if (postStatus === "loading" || postStatus === "idle") {
    page = (
      <div>
        <SkeletonLoading loading />
        <SkeletonLoading loading />
      </div>
    );
  }
  if (postStatus === "success" && postData.length !== 0) {
    page = (
      <div>
        {postData
          ?.slice(0)
          .reverse()
          .map((post) => {
            return <PostCard key={post._id} postInfo={post} />;
          })}
      </div>
    );
  }
  if (postStatus === "failed") {
    page = (
      <div>
        <Typography variant="body1">Cannot Fetch Post Data</Typography>
        <Typography variant="subtitle2">{postError}</Typography>
      </div>
    );
  }
  // if (postData.length !== 0) {
  //   if (postStatus === "failed") {
  //     page = (
  //       <div>
  //         <Typography variant="body1">Cannot Fetch Post Data</Typography>
  //         <Typography variant="subtitle2">{postError}</Typography>
  //       </div>
  //     );
  //   } else {
  //     page = (
  //       <div>
  //         data
  //         {postData?.map((post) => {
  //           return <PostCard />;
  //         })}
  //       </div>
  //     );
  //   }
  // }

  return (
    <div className="container ">
      <Card className={classes.root}>
        <CardContent className={classes.contentDiv}>{page}</CardContent>
      </Card>
    </div>
  );
};

export default PostList;
