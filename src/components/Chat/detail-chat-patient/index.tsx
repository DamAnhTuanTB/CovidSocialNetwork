/* eslint-disable react/prop-types */
// @ts-nocheck

import { SendOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { useEffect, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import io from 'socket.io-client';
import CHAT_DETAIL_CONSTANTS from './constants';
import { DetailChatComponentStyled } from "./styled";
import ModalRatting from './views/modal-ratting';
import { useGetInfoChatSession, useGetListMessagesPatient } from '../../../hooks/chat/useChat';
import { useQueryClient } from 'react-query';
import StarRating from '../../Base/BaseRatingStar';
import { convertTime } from '../../../commons/utils';
import { CustomButton } from './styled';
import BaseImagePreview from '../../Base/BaseImagePreview';

export const socket = io('http://localhost:4444');

const DetailChatComponent = (props: any) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isShowModalRate, setIsShowModalRate] = useState(false);
  const bottomChatRef = useRef();
  const [evaluate, setEvaluate] = useState(0);

  const handleSetEvaluate = (evaluate) => {
    setEvaluate(evaluate);
  }

  useEffect(() => {
    if (evaluate) {
      socket.emit('evaluate_chat_session', { evaluate, chatSessionId: infoChatSession?.id })
    }
  }, [evaluate])

  const queryClient = useQueryClient();

  const { data: infoChatSession } = useGetInfoChatSession();

  useEffect(() => {
    localStorage.setItem('chatSessionId', infoChatSession?.id);
  }, [infoChatSession])

  const { data: listMessages } = useGetListMessagesPatient(infoChatSession?.id, !!infoChatSession?.id);

  const checkKeyEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmitMessage();
      e.preventDefault();
    }
  }

  const handleEndChatSession = () => {
    socket.emit('end_chat_session', {
      chatSessionId: infoChatSession?.id,
      endTime: new Date().toISOString(),
      expertId: infoChatSession?.expert?.id
    });
    window.location.assign('/post');
  }

  const handleSubmitMessage = () => {
    if (currentMessage) {
      const newMessage = {
        chatSessionId: infoChatSession.id,
        content: currentMessage,
        createdAt: (new Date()).toString(),
        patientId: infoChatSession.patient.id,
        expertId: infoChatSession.expert.id
      }

      socket.emit("patient_send_message", newMessage);

      setCurrentMessage("");
    }
  }

  useEffect(() => {
    socket.on('patient_receiver_message', (data: any) => {
      if (data.id === localStorage.getItem('chatSessionId')) {
        queryClient.invalidateQueries('getListMessagesPatient');
      }
    })
    socket.on('expert_receiver_message', (data: any) => {
      if (data.id === localStorage.getItem('chatSessionId')) {
        queryClient.invalidateQueries('getListMessagesPatient');
      }
    })
  }, []);

  useEffect(() => {
    if (bottomChatRef?.current) {
      bottomChatRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessages])

  return (
    <DetailChatComponentStyled>
      <div className="chat-container">
        {/* <InfoDoctorComponent /> */}
        <div className={`chat-box`}>
          <div className="header-chat">
            <div className="user-received-detail">
              <img className="avatar-image" src="/defaultAvatar.png" alt="" />
              <div>{CHAT_DETAIL_CONSTANTS.anonymous}</div>
            </div>
            <div className="group-function-header-chat">
              <div><Button type="primary" onClick={handleEndChatSession} danger>Kết thúc</Button></div>
              <div>
                {
                  evaluate ? <StarRating rating={evaluate} isEdit={false} /> : <CustomButton type="primary" onClick={() => setIsShowModalRate(true)}>Đánh giá</CustomButton>
                }
              </div>
            </div>
          </div>
          <div className="list-messages">
            <div key={'_0'} className='message message-received'>
              <img className="avatar-image" src="/defaultAvatar.png" alt="" />
              <div className='content-message received'>{CHAT_DETAIL_CONSTANTS.welcome}</div>
            </div>
            {
              listMessages?.length > 0 && listMessages?.map((itemMessage, index) => {

                // check send hay received
                const classMessage = itemMessage?.role === 'patient' ? "message-sended" : "message-received";
                let classContent = itemMessage?.role === 'patient' ? "sended" : "received";
                let classImage = "avatar-image ";

                // check cac tin nhan gui hoac nhan lien tiep
                if (index < listMessages?.length && itemMessage?.role === listMessages[index + 1]?.role) {
                  classContent += " border-radius-bottom";
                  classImage += "hide-avatar";
                }

                if (index > 0 && itemMessage?.role === listMessages[index - 1]?.role) {
                  classContent += " border-radius-top";
                }

                return (
                  <div key={itemMessage.id + itemMessage.content_texts} className={`message ${classMessage}`}>
                    <BaseImagePreview isLoading cancelPreview className={classImage} src={itemMessage?.role === 'patient' ? (infoChatSession?.patient.avatar || "/defaultAvatar.png") : "/defaultAvatar.png"} alt="" />
                    <Popover content={convertTime(itemMessage.created_at)}>
                      <div className={`content-message ${classContent}`}>{itemMessage?.content_texts}</div>
                    </Popover>
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

      <Prompt
        when={true}
        message=""
      />

      <ModalRatting isShowModalRate={isShowModalRate} setIsShowModalRate={setIsShowModalRate} chatSessionId={infoChatSession?.id} handleSetEvaluate={handleSetEvaluate} />

    </DetailChatComponentStyled>
  );
};

export default DetailChatComponent;
