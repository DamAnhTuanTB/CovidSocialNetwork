/* eslint-disable react/prop-types */
import React from "react";
import PostComponent from "../../components/Post";

const PostsPage = ({ match } : any) => {
  return (
    <>
      <PostComponent match={match} />
    </>
  );
};

export default PostsPage;
