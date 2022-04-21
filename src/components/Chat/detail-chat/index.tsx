/* eslint-disable react/prop-types */
// @ts-nocheck

import { SendOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import socketio from 'socket.io-client';
import dataRecordMessages from './fakeDataMessages';
import { DetailChatComponentStyled } from "./styled";
import InfoDoctorComponent from "./views/info-doctor";

const DetailChatComponent = ({ match }: any) => {
  const param = useParams();
  const [listMessage, setListMessage] = useState(dataRecordMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const bottomChatRef = useRef();

  const checkKeyEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmitMessage();
      e.preventDefault();
    }
  }

  const handleSubmitMessage = () => {
    if (currentMessage) {
      const newMessage = {
        id: listMessage.length + 1,
        content: currentMessage,
        createdAt: (new Date()).toString(),
        sender: {
          id: 1,
          name: "Tuan",
          avatar: "/post/avatar_my1.jpg",
        },
        isSend: true,
      }
      // call api send message
      // socket?.emit("chat", newMessage);
      setListMessage([
        ...listMessage,
        newMessage,
      ])
      setCurrentMessage("");
    }
  }

  const addMessage = (data: any) => {
    console.log(data);

    setListMessage(prevListMessage => [...prevListMessage, data]);
  }

  useEffect(() => {
    // const socket = socketio.connect('http://localhost:1234');
    // socket.on("exception", (data: any) => { });
    // socket.on("error", (data: any) => { });
    // socket?.on('chat-received', addMessage);
    // return () => {
    //   socket.off('chat-received', addMessage);
    // };
  }, [])

  useEffect(() => {
    if (bottomChatRef?.current) {
      bottomChatRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage])

  return (
    <DetailChatComponentStyled>
      <div className="chat-container">
        <InfoDoctorComponent />
        <div className="chat-box">
          <div className="header-chat">
            <div className="user-received-detail">
              <img src="/post/avatar_my1.jpg" alt="" />
              <div>Tuan Cules</div>
            </div>
          </div>
          <div className="list-messages">
            {
              listMessage.length > 0 && listMessage.map((itemMessage, index) => {
                const classMessage = itemMessage?.isSend ? "message-sended" : "message-received";
                let classContent = itemMessage?.isSend ? "sended" : "received";
                let classImage = "";
                if (index < listMessage.length && itemMessage?.isSend === listMessage[index + 1]?.isSend) {
                  classContent += " border-radius-bottom";
                  classImage = "hide-avatar"
                }
                if (index > 0 && itemMessage?.isSend === listMessage[index - 1]?.isSend) {
                  classContent += " border-radius-top";
                }
                return (
                  <div key={itemMessage.id + itemMessage.content} className={`message ${classMessage}`}>
                    <img className={classImage} src={itemMessage?.sender?.avatar} alt="" />
                    <div className={`content-message ${classContent}`}>{itemMessage.content}</div>
                  </div>
                )
              })
            }
            <div ref={bottomChatRef}></div>
          </div>
          <div className="send-message">
            <div className="input-container">
              <ReactTextareaAutosize
                placeholder="Aa"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="input-send"
                onKeyDown={checkKeyEnter}
              />
            </div>
            <div className="icon-send-upload">
              <SendOutlined onClick={handleSubmitMessage} />
            </div>
          </div>
        </div>
      </div>
    </DetailChatComponentStyled>
  );
};

export default DetailChatComponent;
