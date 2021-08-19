import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { setProfileImage } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
// import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    margin: "1rem auto",
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  input: {
    display: "none",
  },
}));

const ProfilePage = (props) => {
  const classes = useStyles();
  const [imageSelected, setImageSelected] = useState(null);
  const [imageURL, setImageURL] = useState(
    localStorage.getItem("profileImageURL")
      ? localStorage.getItem("profileImageURL")
      : ""
  );
  const dispatch = useDispatch();
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      formData.append("file", imageSelected);
      formData.append("upload_preset", "zkdokqlz");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/fitnesslegion/image/upload/",
        formData
      );
      console.log(response.data.secure_url);
      setImageURL(response.data.secure_url);
      dispatch(setProfileImage(response.data.secure_url));
      const newResponse = await axios.post(
        "/profile/profileImage",
        {
          profileImageURL: response.data.secure_url,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
        }
      );
      console.log(newResponse.data);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center self-center px-8 py-10">
      <div className="flex flex-col ">
        <span className="text-xl text-center">Profile</span>

        <Avatar
          src={imageURL === "" ? "" : imageURL}
          alt="Remy Sharp"
          className={classes.largeAvatar}
        />

        <div className="flex flex-row w-9/12 px-4 py-8 justify-between  self-center">
          <span className="text-lg ">Change Profile Image</span>
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              onChange={(e) => setImageSelected(e.target.files[0])}
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <label htmlFor="contained-button-file">
              <Button
                disabled={imageSelected === null}
                variant="contained"
                color="primary"
                component="span"
                onClick={uploadImage}
              >
                Upload
              </Button>
            </label>
          </div>
        </div>
        {/* <Image cloudName="fitnesslegion" publicId=""/> */}
      </div>
    </div>
  );
};

export default ProfilePage;
