/* eslint-disable react/prop-types */
import React from "react";
import ExpertManagementComponent from "../../../components/admin/ExpertManagement";
import ListExpertComponent from "../../../components/admin/ExpertManagement";

const ExpertManagementPage = ({ match } : any) => {
  return (
    <>
      <ExpertManagementComponent match={match} />
    </>
  );
};

export default ExpertManagementPage;
