/* eslint-disable react/prop-types */
// @ts-nocheck

import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from "react";
import { Prompt, useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import socketio from 'socket.io-client';
import StarRating from '../../Base/BaseRatingStar';
import CHAT_DETAIL_CONSTANTS from './constants';
import dataRecordMessages from './fakeDataMessages';
import { DetailChatComponentStyled } from "./styled";
import ModalRatting from './views/modal-ratting';

const DetailChatComponent = (props: any) => {
  const {
    isExpert = false,
    isAdmin = false,
  } = props;
  const param = useParams();
  const [listMessage, setListMessage] = useState(dataRecordMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isShowModalRate, setIsShowModalRate] = useState(false);
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
    if (isExpert) {
      console.log(111111, param.chat_id);
      // call api get chat detail
    }
  }, [param.chat_id])

  useEffect(() => {
    if (bottomChatRef?.current) {
      bottomChatRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage])

  return (
    <DetailChatComponentStyled>
      <div className="chat-container">
        {/* <InfoDoctorComponent /> */}
        <div className={`chat-box ${isAdmin && "chat-box-admin"}`}>
          <div className="header-chat">
            <div className="user-received-detail">
              {
                (!isExpert && !isAdmin) ? (
                  <>
                    <img src="/defaultAvatar.png" alt="" />
                    <div>{CHAT_DETAIL_CONSTANTS.anonymous}</div>
                  </>
                ) : (
                  <>
                    <img src="/post/avatar_my1.jpg" alt="" />
                    <div>Tuan Cules</div>
                  </>
                )
              }
            </div>
            <div className="rate">
              {
                (isExpert || isAdmin) ? (
                  <StarRating rating={4} isEdit={false} />
                ) : (
                  <Button type="primary" onClick={() => setIsShowModalRate(true)}>Đánh giá</Button>
                )
              }
            </div>
          </div>
          <div className="list-messages">
            {
              listMessage.length > 0 && listMessage.map((itemMessage, index) => {

                // check send hay received
                const classMessage = itemMessage?.isSend ? "message-sended" : "message-received";
                let classContent = itemMessage?.isSend ? "sended" : "received";
                let classImage = "";

                // check cac tin nhan gui hoac nhan lien tiep
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
          {
            !isAdmin && (
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
            )
          }
        </div>
      </div>
      {
        (!isExpert && !isAdmin) && (
          <Prompt
            when={true}
            message=""
          />
        )
      }
      <ModalRatting isShowModalRate={isShowModalRate} setIsShowModalRate={setIsShowModalRate} />

    </DetailChatComponentStyled>
  );
};

export default DetailChatComponent;
