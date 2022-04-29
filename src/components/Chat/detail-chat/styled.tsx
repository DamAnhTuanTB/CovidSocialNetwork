import styled from "styled-components";

const DetailChatComponentStyled = styled.div`
    display: flex;
    .chat-container {
        width: 1110px;
        height: calc(100vh - 80px);
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        /* padding-bottom: 20px; */
        .chat-box {
            margin: auto;
            margin-bottom: 30px;
            border-radius: 5px;
            max-width: 700px;
            max-height: 600px;
            width: 100%;
            height: 100%;
            padding-bottom: 5px;
            background-color: white;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            .header-chat {
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #d0d0d0;
                .user-received-detail {
                    display: flex;
                    align-items: center;
                    img {
                        width: 45px;
                        height: 45px;
                        object-fit: cover;
                        object-position: center;
                        margin-right: 10px;
                        border-radius: 50%;
                    }
                    div {
                        font-size: 16px;
                        font-weight: 600;
                    }
                }
            }
            .list-messages {
                flex-grow: 1;
                background-color: white;
                padding: 15px;
                overflow-y: auto;
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background-color: #DFDFDF;
                }
                ::-webkit-scrollbar-thumb {
                    background: #8F8F8F;
                    border-radius: 5px;
                }
                .message {
                    display: flex;
                    align-items: flex-end;
                    margin-bottom: 5px;
                    img {
                        width: 35px;
                        height: 35px;
                        object-fit: cover;
                        object-position: center;
                        margin-right: 10px;
                        border-radius: 50%;
                    }
                    .content-message {
                        padding: 8px 12px;
                        border-radius: 18px;
                        max-width: 400px;
                        white-space: pre-wrap;
                    }
                    .hide-avatar {
                        visibility: hidden;
                    }
                }
                .received {
                    background-color: #E4E6EB;
                }
                
                .message-received {
                    .border-radius-top {
                        border-top-left-radius: 5px;
                    }
                    .border-radius-bottom {
                        border-bottom-left-radius: 5px;
                    }
                }
                .message-sended {
                    flex-direction: row-reverse;
                    img {
                        margin-left: 10px;
                        margin-right: 0;
                    }
                    .border-radius-top {
                        border-top-right-radius: 5px;
                    }
                    .border-radius-bottom {
                        border-bottom-right-radius: 5px;
                    }
                }
                .sended {
                    background-color: #0084FF;
                    color: white;
                }
            }
            .send-message {
                flex-shrink: 1;
                display: flex;
                align-items: flex-end;
                .input-container {
                    flex: 1;
                    margin: 0 10px;
                    border-radius: 20px;
                    padding: 7px 15px 5px;
                    background-color: #F0F2F5;
                    .input-send {
                        background-color: #F0F2F5;
                        width: 100%;
                        height: 100%;
                        border: none;
                        resize: none;
                        max-height: 100px;
                        border-color: #d0d0d0;
                        outline: none;
                        box-shadow: none;
                        :hover, :focus {
                            border-color: #d0d0d0;
                        }
                    }
                }
                .icon-send-upload {
                    margin-right: 10px;
                    margin-bottom: 10px;
                    .anticon-send {
                        cursor: pointer;
                        svg {
                            height: 20px;
                            width: auto;
                        }
                    }
                }
            }
        }
        .chat-box-admin {
            margin-top: 30px;
            margin-bottom: 0;
        }
    }
`;

export { DetailChatComponentStyled };
