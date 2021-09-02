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
import { Link } from "react-router-dom";
import { getTime } from "../../../utils/getTime";

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
  // const getTime = () => {
  //   let creationTime = new Date(postInfo.updatedAt).getTime();
  //   let currentTime = new Date().getTime();
  //   let time = (currentTime - creationTime) / 1000;
  //   if (time < 60) {
  //     return "less than a minute ago";
  //   } else if (time > 60 && time < 3600) {
  //     return `${Math.floor(time / 60)} minutes ago`;
  //   } else if (time > 3600 && time < 86400) {
  //     return `${Math.floor(time / (60 * 60))} hours ago`;
  //   } else if (time > 86400 && time < 2592000) {
  //     return `${Math.floor(time / (60 * 60 * 24))} days ago`;
  //   } else {
  //     return `${Math.floor(time / (60 * 60 * 24 * 30))} months ago`;
  //   }
  // };

  const time = getTime(postInfo.updatedAt);

  const classes = useStyles();
  const page = <div></div>;
  return (
    <div className="container  my-4">
      <Card className={classes.root}>
        <CardContent className={classes.contentDiv}>
          <div className="w-full px-4 py-3 flex items-center">
            <div className="w-11">
              <Link to={`/home/profile/${postInfo.user}`}>
                <Avatar
                  src={
                    postInfo.profileImageURL !== "" && postInfo.profileImageURL
                      ? postInfo.profileImageURL
                      : ""
                  }
                  className={classes.avatar}
                />
              </Link>
            </div>
            <div className="flex flex-col p-2 w-10/12">
              <Typography variant="body1">{postInfo.username}</Typography>
              <Typography variant="caption">{time}</Typography>
            </div>
            <div className="w-2/12 self-end">
              <MenuButton UserID={postInfo.user} postId={postInfo._id} />
            </div>
          </div>
          <Divider />
          <Link to={`/home/post/${postInfo._id}`} className=" no-underline ">
            <div className={`w-full px-5 py-3 ${classes.leftSpace}`}>
              <Typography variant="body1">{postInfo.body}</Typography>
            </div>
          </Link>
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
