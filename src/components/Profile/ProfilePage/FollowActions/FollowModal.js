import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: "0.5rem 0.6rem",
    cursor: "pointer",
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialog: {
    padding: "3rem 2rem",
    minWidth: "4rem",
  },
}));

const FollowModal = (props) => {
  const classes = useStyles();

  const { onClose, open, data, type } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth
      className={classes.dialog}
    >
      <DialogTitle id="simple-dialog-title">{type} List</DialogTitle>
      <List>
        {data.length !== 0 &&
          data.map((email) => (
            <ListItem
              button
              onClick={() => handleListItemClick(email)}
              key={email}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
        {data.length === 0 && <span className="px-5">No {type} yet</span>}
      </List>
    </Dialog>
  );
};

export default FollowModal;
