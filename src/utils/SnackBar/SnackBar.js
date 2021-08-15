import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { useEffect } from "react";

export default function SnackBar(props) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {props.error}
        </Alert>
      </Snackbar>
    </div>
  );
}
