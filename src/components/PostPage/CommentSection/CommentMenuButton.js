import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../features/posts/postSlice";

const ITEM_HEIGHT = 48;

export default function CommentMenuButton({
  commentId,
  commentUserId,
  postId,
  deleteCommentHandler,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userID = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {commentUserId === userID ? (
          <MenuItem
            onClick={() => {
              deleteCommentHandler(postId, commentId);
              // handleClose();
            }}
          >
            Delete
          </MenuItem>
        ) : null}
        {commentUserId === userID ? (
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        ) : null}
        <MenuItem onClick={handleClose}>Report</MenuItem>
      </Menu>
    </div>
  );
}
