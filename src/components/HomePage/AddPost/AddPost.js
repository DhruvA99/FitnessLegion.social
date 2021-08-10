import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React from "react";

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
  const classes = useStyles();
  return (
    <div className="container pt-5">
      <Card className={classes.root}>
        <CardContent className={classes.inputDiv}>
          <TextField
            fullWidth
            id="outlined-basic"
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
          >
            Post It!
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AddPost;
