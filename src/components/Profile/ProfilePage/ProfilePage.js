import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import { setProfileImage } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "../../../features/auth/authSlice";
import { useParams } from "react-router";
import Loader from "../../LoaderComponent/Loader";
import FollowActions from "./FollowActions/FollowActions";
import PostCard from "../../PostList/PostCard/PostCard";

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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);
  const userId = useSelector((state) => state.auth.userId);
  const { userId: profileUserId } = useParams();
  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/profile/${profileUserId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
        });
        setError("");
        setPosts(response.data.postsData);
        setImageURL(response.data.userData.profileImageURL);
        setUsername(response.data.userData.username);
        setFollowers(response.data.userData.followers);
        setFollowing(response.data.userData.following);
      } catch (error) {
        setError(error.response.data.errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  let page;
  if (loading) {
    page = (
      <div className="w-full h-screen">
        <Loader />
      </div>
    );
  } else {
    if (error !== "") {
      page = (
        <div>
          <span>Error:{error}</span>
        </div>
      );
    } else {
      page = (
        <div className="flex flex-col justify-center self-center px-8 py-10">
          <div className="flex flex-col ">
            <Avatar
              src={imageURL === "" ? "" : imageURL}
              alt="Remy Sharp"
              className={classes.largeAvatar}
            />
            <span className="text-xl text-center">{username}</span>

            <FollowActions
              followersList={followers}
              followingList={following}
            />

            <div className="w-full md:w-11/12 flex justify-end">
              {userId !== profileUserId ? (
                following.find((user) => user.userId === profileUserId) ? (
                  <Button variant="contained" color="primary">
                    UnFollow
                  </Button>
                ) : (
                  <Button variant="contained" color="primary">
                    Follow
                  </Button>
                )
              ) : null}
            </div>
            <div className="flex flex-col w-full">
              {posts
                .slice(0)
                .reverse()
                .map((post) => (
                  <PostCard key={post._id} postInfo={post} />
                ))}
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{page}</>;
};

export default ProfilePage;
