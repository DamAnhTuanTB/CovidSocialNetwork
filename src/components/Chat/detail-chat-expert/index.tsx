/* eslint-disable react/prop-types */
// @ts-nocheck

import { SendOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import io from 'socket.io-client';
import StarRating from '../../Base/BaseRatingStar';
import { DetailChatComponentStyled } from "./styled";
import { useGetDetailChatSession, useGetListMessagesExpert } from '../../../hooks/chat/useChat';
import { useGetProfileExpert } from '../../../hooks/expert/useProfileExpert';
import { useQueryClient } from 'react-query';
import { Popover } from 'antd';
import { convertTime } from '../../../commons/utils';
import BaseImagePreview from '../../Base/BaseImagePreview';

const socket = io('http://localhost:4444');

const DetailChatComponent = (props: any) => {
  const param = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const bottomChatRef = useRef();

  const queryClient = useQueryClient();

  const { data: infoChatSession } = useGetDetailChatSession(param.chat_session_id);

  const { data: listMessages } = useGetListMessagesExpert(infoChatSession?.id, !!infoChatSession?.id);

  const checkKeyEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmitMessage();
      e.preventDefault();
    }
  }

  const { profile } = useGetProfileExpert(true);

  const handleSubmitMessage = () => {
    if (currentMessage) {
      const newMessage: any = {
        content: currentMessage,
        createdAt: (new Date()).toString(),
        patientId: infoChatSession.patient.id,
        chatSessionId: param.chat_session_id
      }

      socket.emit("expert_send_message", newMessage);

      setCurrentMessage("");
    }
  }

  useEffect(() => {
    socket.emit('expert_read_message', { expertId: profile?.id })
  }, []);

  useEffect(() => {
    socket.on('expert_receiver_message', (data: any) => {
      if (data.id === param.chat_session_id) {
        queryClient.invalidateQueries('getListMessagesExpert');
      }
    })
    socket.on('patient_receiver_message', (data: any) => {
      if (data.id === param.chat_session_id) {
        queryClient.invalidateQueries('getListMessagesExpert');
      }
    })
    socket.on('receive_evaluate_chat_session', (data: any) => {
      if (data.chatSessionId === param.chat_session_id) {
        queryClient.invalidateQueries('getDetailChatSession');
      }
    })

    socket.on('receive_end_chat_session', (data: any) => {
      if (data.chatSessionId === param.chat_session_id) {
        queryClient.invalidateQueries('getDetailChatSession');
      }
    })
    // return () => {
    //   socket.off('expert_receiver_message');
    //   socket.off('patient_receiver_message');
    //   socket.off('receive_evaluate_chat_session');
    //   socket.off('receive_end_chat_session');
    //   socket.off('expert_send_message');
    // }
  }, [])

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
              <BaseImagePreview className="main-avatar" src={infoChatSession?.patient?.avatar || "/defaultAvatar.png"} alt="" />
              <div>{infoChatSession?.patient?.first_name}</div>
            </div>
            <div className="group-rate-expert">
              {
                !infoChatSession?.end_time ? <div className="active">??ang ho???t ?????ng</div> : <div className='end'>???? k???t th??c</div>
              }
              <StarRating rating={infoChatSession?.evaluate} isEdit={false} />
            </div>
          </div>
          <div className="list-messages">
            {
              listMessages?.length > 0 && listMessages.map((itemMessage, index) => {

                // check send hay received
                const classMessage = itemMessage?.role === 'expert' ? "message-sended" : "message-received";
                let classContent = itemMessage?.role === 'expert' ? "sended" : "received";
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
                  <div key={itemMessage.id + itemMessage.content} className={`message ${classMessage}`}>
                    <BaseImagePreview isLoading cancelPreview className={classImage} src={itemMessage?.role === 'expert' ? (profile?.avatar || "/defaultAvatar.png") : (infoChatSession?.patient.avatar || "/defaultAvatar.png")} alt="" />
                    <Popover content={convertTime(itemMessage.created_at)}>
                      <div className={`content-message ${classContent}`}>{itemMessage?.content_texts}</div>
                    </Popover>
                  </div>
                )
              })
            }
            <div ref={bottomChatRef}></div>
          </div>
          {
            !infoChatSession?.end_time && (
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
    </DetailChatComponentStyled>
  );
};

export default DetailChatComponent;
