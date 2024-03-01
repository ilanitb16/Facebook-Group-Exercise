import React, { useState } from "react";
import PostItem from "../postItem/PostItem";

function PostListResults({ posts, postList, setPostList, user_name, user_photo, friendsList, setFriendsList }) {
  const [showFriendCard, setShowFriendCard] = useState(false);

  const handleShowFriendCard = () => {
    setShowFriendCard(true);
  };

  const postListOriginal = posts.map((post, index) => {
    return (
      <PostItem
        key={index}
        postList={postList}
        setPostList={setPostList}
        {...post}
        user_name={user_name}
        user_photo={user_photo}
        friendsList={friendsList}
        setFriendsList={setFriendsList}
      />
    );
  });

  return <div className="row gx-3">{postListOriginal}</div>;
}

export default PostListResults;
