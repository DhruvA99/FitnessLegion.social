import { Avatar, makeStyles, Divider, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";

import MenuButton from "../PostList/PostCard/MenuButton/MenuButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import Loader from "../LoaderComponent/Loader";
import PostPageActionDiv from "./PostPageAction/PostPageActionDiv";
import CommentSection from "./CommentSection/CommentSection";

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
  toolbar: theme.mixins.toolbar,
}));

const PostPage = ({ postInfo }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const userID = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { postId } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          userId: userId,
        },
      });
      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  let page = (
    <div>
      <Loader />
    </div>
  );

  if (!loading && data !== null) {
    page = (
      <div className="flex flex-col p-6">
        {/* <div className={`${classes.toolbar}`} /> */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardContent className={classes.contentDiv}>
                <div className="w-full px-4 py-3 flex items-center">
                  <div className="w-11">
                    <Avatar
                      className={classes.avatar}
                      src={data.profileImageURL ? data.profileImageURL : ""}
                    />
                  </div>
                  <div className="flex flex-col p-2 w-10/12">
                    <Typography variant="body1">{data.username}</Typography>
                    <Typography variant="caption"></Typography>
                  </div>
                  <div className="w-2/12 self-end">
                    <MenuButton UserID={data.user} postId={data._id} />
                  </div>
                </div>
                <Divider />

                <div className={`w-full px-5 py-3 ${classes.leftSpace}`}>
                  <Typography variant="body1">{data.body}</Typography>
                </div>
                <Divider />
                <div className={`w-full px-5 py-3 ${classes.leftSpace}`}>
                  <PostPageActionDiv postInfo={data} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <CommentSection postInfo={data} getPost={getPost} />
          </Grid>
        </Grid>
      </div>
    );
  }
  if (!loading && error !== "") {
    page = (
      <div className="flex justify-center w-full h-full flex-col py-10">
        <Typography variant="body1" color="secondary" align="center">
          ERROR
        </Typography>
        <Typography variant="body1" color="secondary" align="center">
          {error}
        </Typography>
      </div>
    );
  }
  return <div>{page}</div>;
};

export default PostPage;
