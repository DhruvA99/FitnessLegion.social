export const getTime = (updatedAt) => {
  let creationTime = new Date(updatedAt).getTime();
  let currentTime = new Date().getTime();
  let time = (currentTime - creationTime) / 1000;
  if (time < 60) {
    return "less than a minute ago";
  } else if (time > 60 && time < 3600) {
    return `${Math.floor(time / 60)} minutes ago`;
  } else if (time > 3600 && time < 86400) {
    return `${Math.floor(time / (60 * 60))} hours ago`;
  } else if (time > 86400 && time < 2592000) {
    return `${Math.floor(time / (60 * 60 * 24))} days ago`;
  } else {
    return `${Math.floor(time / (60 * 60 * 24 * 30))} months ago`;
  }
};
