import styled from "styled-components";
import { Modal } from 'antd';

const ModalCreatePostStyled = styled(Modal)`
    font-family: "Alata";
    .body-modal-create {
        max-height: 50vh;
        overflow: auto;
        ::-webkit-scrollbar {
          width: 6px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
          background-color: #DFDFDF;
          /* border-radius: 10px; */
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #8F8F8F;
          border-radius: 5px;
        }
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        }
    }
    .preview-image {
        margin-top: 10px;
        margin-right: 3%;
        width: 30%;
        position: relative;
        :nth-child(3) {
            margin-right: 0;
        }
        img {
            width: 100%;
            height: 150px;
            border-radius: 20px;
            object-fit: cover;
            object-position: center;
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
    .detail-user {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            object-fit: cover;
            object-position: center;
            margin-right: 10px;
        }
        .name-user {
            font-weight: 600;
        }
    }
    .content-post {
        resize: none;
        min-height: 150px;
        width: 100%;
        border: none;
        outline: none;
        font-size: 24px;
        padding: 0;
        ::placeholder {
            color: #8f8f8f;
        }
    }
    .title-post {
        font-size: 20px;
        font-weight: 700;
        padding: 0;
        width: 100%;
        border: none;
        box-shadow: none;
        /* margin-bottom: 10px; */
        ::placeholder {
            color: #8f8f8f;
        }
    }
    .ant-divider {
        margin: 10px 0;
    }
    .add-image {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        padding: 10px 15px;
        div {
            :first-child {
                font-size: 16px;
                font-weight: 500;
            }
        }
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
    .limit-image {
        margin-left: 10px;
        font-style: italic;
    }
    .list-preview-image {
        display: flex;
    }
`;

export { ModalCreatePostStyled };
