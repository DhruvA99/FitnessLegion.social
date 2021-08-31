import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import FollowModal from "./FollowModal";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: "0.5rem 0.6rem",
    cursor: "pointer",
  },
}));

const FollowActions = ({ followersList, followingList }) => {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [type, setType] = React.useState("");
  const classes = useStyles();

  const handleClickOpen = (listData, type) => {
    setOpen(true);
    setList(listData);
    setType(type);
  };

  const handleClose = (value) => {
    setOpen(false);
    setList([]);
    setType("");
  };

  return (
    <div className="flex flex-row justify-center">
      <div
        className="flex"
        onClick={() => handleClickOpen(followersList, "Followers")}
      >
        <Typography className={classes.text}>
          <span className="font-bold px-2">{followersList.length}</span>
          Followers
        </Typography>
      </div>
      <div
        className="flex"
        onClick={() => handleClickOpen(followingList, "Following")}
      >
        <Typography className={classes.text}>
          <span className="font-bold px-2"> {followingList.length}</span>
          Following
        </Typography>
      </div>
      <FollowModal open={open} onClose={handleClose} data={list} type={type} />
    </div>
  );
};

export default FollowActions;
