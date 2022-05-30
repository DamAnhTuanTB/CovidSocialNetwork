import { Modal } from "antd";
import styled from "styled-components";

const ModalEditCommentStyled = styled(Modal)`
  .input-comment-container {
    .input-comment {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .avatar-user {
            width: 40px;
            height: 40px;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
            margin-right: 5px;
        }
        .inputs {
            flex: 1;
            display: flex;
            align-items: center;
            background-color: #F0F2F5;
            border-radius: 20px;
            padding-left: 10px;
            .text-input {
                /* border-radius: 20px; */
                background-color: #F0F2F5;
                border: none;
                outline: none;
                resize: none;
                flex: 1;
                :focus {
                    box-shadow: none;
                }
            }
            .file-input-container {
                height: 100%;
                flex: none;
                display: flex;
                align-items: flex-end;
                .file-input {
                    width: 40px;
                    height: 40px;
                    position: relative;
                    border-radius: 50%;
                    :hover {
                        background-color: #e6e6e6;
                    }
                    /* z-index: 10; */
                    input, .camera-icon {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    input {
                        opacity: 0;
                        z-index: 10;
                        cursor: pointer;
                    }
                    .camera-icon {
                        display: flex;
                        svg {
                            width: 20px;
                            height: 20px;
                            margin: auto;
                        }
                    }
                }
            }
        }
    }
    .preview-image {
        margin-top: 10px;
        margin-left: 45px;
        width: 200px;
        position: relative;
        .image, img {
            width: 100%;
            height: auto;
            border-radius: 20px;
        }
        .loading-image {
            height: 150px;
        }
        .reset-button {
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            display: flex;
            border-radius: 20px;
            background-color: rgba(255, 255, 255, 0.7);
            .reset-icon {
                margin: auto;
                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
        .loading-view {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            background-color: rgba(255, 255, 255, 0.5);
            .loading {
                margin: auto;
                width: 50%;
                height: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                /* .ant-progress-inner {
                    width: 100% !important;
                    height: 100% !important;
                    svg
                } */
            }
        }
    }
    .space-button {
        display: flex;
        justify-content: flex-end;
        button {
            margin-left: 10px;
        }
    }
  }
`;

export { ModalEditCommentStyled };
