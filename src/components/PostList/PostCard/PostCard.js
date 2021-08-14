import { Avatar, Divider, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActionBar from "./ActionBar/ActionBar";
import MenuButton from "./MenuButton/MenuButton";

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
  avatar: {},
}));

const PostCard = ({ postInfo }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const page = <div></div>;
  return (
    <div className="container my-4">
      <Card className={classes.root}>
        <CardContent className={classes.contentDiv}>
          <div className="w-full px-4 py-3 flex items-center">
            <div className="w-11">
              <Avatar className={classes.avatar} />
            </div>
            <div className="flex flex-col p-2 w-10/12">
              <Typography variant="body1">{postInfo.username}</Typography>
              <Typography variant="caption">time</Typography>
            </div>
            <div className="w-2/12 self-end">
              <MenuButton UserID={postInfo.user} postId={postInfo._id} />
            </div>
          </div>
          <Divider />
          <div className={`w-full px-5 py-3 ${classes.leftSpace}`}>
            <Typography variant="body1">{postInfo.body}</Typography>
          </div>
          <Divider />
          <div className={`w-full px-5 py-5 ${classes.leftSpace}`}>
            <ActionBar postInfo={postInfo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCard;
