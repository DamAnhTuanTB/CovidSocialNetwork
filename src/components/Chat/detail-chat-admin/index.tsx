/* eslint-disable react/prop-types */
// @ts-nocheck

import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../detail-chat-patient";
import StarRating from '../../Base/BaseRatingStar';
import { DetailChatComponentStyled } from "./styled";
import { useGetDetailChatSessionAdmin, useGetListMessagesExpertAdmin } from '../../../hooks/chat/useChat';
import { useQueryClient } from 'react-query';
import { Popover } from 'antd';
import { convertTime } from '../../../commons/utils';
import { useGetProfileOtherAdmin } from '../../../hooks/admin/useProfile';

import BaseImagePreview from '../../Base/BaseImagePreview';

const DetailChatAdminComponent = (props: any) => {
    const param = useParams();

    const bottomChatRef = useRef();

    const queryClient = useQueryClient();

    const { data: infoChatSession } = useGetDetailChatSessionAdmin(param.chat_session_id);

    const { data: listMessages } = useGetListMessagesExpertAdmin(infoChatSession?.id, !!infoChatSession?.id);

    const { profileOtherData } = useGetProfileOtherAdmin(Number(localStorage.getItem('id_expert_list_chat')));

    console.log(profileOtherData);

    useEffect(() => {
        socket.on('expert_receiver_message', (data: any) => {
            if (data.id === param.chat_session_id) {
                queryClient.invalidateQueries('getListMessagesExpertAdmin');
            }
        })
        socket.on('patient_receiver_message', (data: any) => {
            if (data.id === param.chat_session_id) {
                queryClient.invalidateQueries('getListMessagesExpertAdmin');
            }
        })
        socket.on('receive_evaluate_chat_session', (data: any) => {
            if (data.chatSessionId === param.chat_session_id) {
                queryClient.invalidateQueries('getDetailChatSessionAdmin');
            }
        })
        socket.on('receive_end_chat_session', (data: any) => {
            if (data.chatSessionId === param.chat_session_id) {
                queryClient.invalidateQueries('getDetailChatSessionAdmin');
            }
        })
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
                                !infoChatSession?.end_time ? <div className="active">Đang hoạt động</div> : <div className='end'>Đã kết thúc</div>
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
                                        <BaseImagePreview isLoading cancelPreview className={classImage} src={itemMessage?.role === 'expert' ? (profileOtherData?.avatar || "/defaultAvatar.png") : (infoChatSession?.patient.avatar || "/defaultAvatar.png")} alt="" />
                                        <Popover content={convertTime(itemMessage.created_at)}>
                                            <div className={`content-message ${classContent}`}>{itemMessage?.content_texts}</div>
                                        </Popover>
                                    </div>
                                )
                            })
                        }
                        <div ref={bottomChatRef}></div>
                    </div>
                </div>
            </div>
        </DetailChatComponentStyled>
    );
};

export default DetailChatAdminComponent;
