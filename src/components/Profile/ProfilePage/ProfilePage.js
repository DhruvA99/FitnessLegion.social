import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
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
  const mainUsername = useSelector((state) => state.auth.username);

  const profileImageURL = useSelector((state) => state.auth.profileImageURL);
  const { userId: profileUserId } = useParams();
  let getProfile = async () => {
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
  useEffect(() => {
    getProfile();
  }, [profileUserId]);

  const followUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/profile/follow/add/${profileUserId}`,
        { profileImageURL, username: mainUsername },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
        }
      );
      if (response.data.success === true) {
        getProfile();
        return;
      }
    } catch (error) {
      console.log("error following user");
      // setError(error.response.data);
      setLoading(false);
    }
  };

  const unFollowUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/profile/follow/remove/${profileUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            userId: userId,
          },
        }
      );
      if (response.data.success === true) {
        getProfile();
        return;
      }
    } catch (error) {
      // setError(error.response.data.errorMessage);
      console.log("error unfollowing user");

      setLoading(false);
    }
  };

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
                followers.find((user) => user.userId === userId) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={unFollowUser}
                  >
                    UnFollow
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={followUser}
                  >
                    Follow
                  </Button>
                )
              ) : null}
            </div>
            <div className="flex flex-col w-full">
              {posts.length !== 0 &&
                posts
                  .slice(0)
                  .reverse()
                  .map((post) => <PostCard key={post._id} postInfo={post} />)}
              {posts.length === 0 && (
                <div className="flex flex-col pt-6  justify-center items-center">
                  <span className="p-5">No Posts till yet!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{page}</>;
};

export default ProfilePage;
