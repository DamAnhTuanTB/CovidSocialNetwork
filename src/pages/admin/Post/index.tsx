/* eslint-disable react/prop-types */
import React from "react";
import PostManagementComponent from "../../../components/admin/Post";

const PostsPageManagement = ({ match } : any) => {
  return (
    <>
      <PostManagementComponent match={match} />
    </>
  );
};

export default PostsPageManagement;
