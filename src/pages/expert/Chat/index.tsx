/* eslint-disable react/prop-types */
import React from "react";
import ChatComponent from "../../../components/Chat";
import ExpertChatComponent from "../../../components/expert/Chat";

const ExpertChatPage = ({ match } : any) => {
  return (
    <>
      <ExpertChatComponent match={match} />
    </>
  );
};

export default ExpertChatPage;
