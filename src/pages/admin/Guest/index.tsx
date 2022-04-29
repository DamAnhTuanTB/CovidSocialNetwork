/* eslint-disable react/prop-types */
import React from "react";
import ListGuestComponent from "../../../components/admin/GuestManagement";
import PostManagementComponent from "../../../components/admin/Post";

const GuestManagementPage = ({ match } : any) => {
  return (
    <>
      <ListGuestComponent match={match} />
    </>
  );
};

export default GuestManagementPage;
