import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../../features/posts/postSlice";

const ITEM_HEIGHT = 48;

export default function MenuButton({ UserID, postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="text-right">
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
        {userId === UserID ? (
          <MenuItem
            onClick={() => {
              dispatch(deletePost({ postId }));
              handleClose();
            }}
          >
            Delete
          </MenuItem>
        ) : null}{" "}
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Report
        </MenuItem>
      </Menu>
    </div>
  );
}
