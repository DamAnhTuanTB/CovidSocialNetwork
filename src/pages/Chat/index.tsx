/* eslint-disable react/prop-types */
import React from "react";
import ChatComponent from "../../components/Chat";

const ChatPage = ({ match } : any) => {
  return (
    <>
      <ChatComponent match={match} />
    </>
  );
};

export default ChatPage;
