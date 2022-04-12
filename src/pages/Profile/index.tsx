/* eslint-disable react/prop-types */
import React from "react";
import ProfileComponent from "../../components/Profile";

const ProfilePage = ({ match } : any) => {
  return (
    <>
      <ProfileComponent match={match} />
    </>
  );
};

export default ProfilePage;
