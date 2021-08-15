import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../features/posts/postSlice";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0.7rem",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  inputDiv: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    width: "100%",
    margin: "auto",
  },
}));

const AddPost = (props) => {
  const [text, setText] = useState("");
  const [helperText, setHelperText] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);

  const addPostHandler = () => {
    if (text !== "") {
      setHelperText("");
      dispatch(
        addPost({
          body: text,
          username: username,
          comments: [],
          likes: [],
          user: userId,
        })
      );
    } else {
      setHelperText(`U cannot Post an empty Field,${username}`);
    }
  };

  return (
    <div className="container pt">
      <Card className={classes.root}>
        <CardContent className={classes.inputDiv}>
          <TextField
            fullWidth
            id="outlined-basic"
            error={helperText !== "" ? true : false}
            value={text}
            helperText={helperText}
            onChange={(e) => {
              setText(e.target.value);
              setHelperText("");
            }}
            label={`What's new, ${props.username ? props.username : "User"} ?
          `}
            variant="outlined"
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={addPostHandler}
          >
            Post It!
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AddPost;
