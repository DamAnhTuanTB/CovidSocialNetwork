import styled from "styled-components";

interface Props {
    isDetail: boolean,
    className: string,
}

const PostItemStyle = styled.div<Props>`
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 50px;
    .header-post {
        display: flex;
        /* margin-bottom: 15px; */
        padding: 15px;
        position: relative;
        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 10px;
        }
        .post-author {
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            .description-admin {
                margin-left: 20px;
                font-weight: 400;
                font-size: 12px;
            }
        }
        .create-at {
            cursor: ${(props) => props?.isDetail ? "default" : "pointer"};
            font-size: 12px;
            .description-admin {
                margin-right: 20px;
                font-weight: 400;
                font-size: 12px;
            }
            :hover {
                text-decoration: ${(props) => props?.isDetail ? "unset" : "underline"};
            }
        }
        .more-option {
            cursor: pointer;
            position: absolute;
            top: 15px;
            right: 15px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            transform: rotate(90deg);
            justify-content: center;
            align-items: center;
            span {
                svg {
                    height: 20px;
                    width: auto;
                }
            }
            :hover {
                background-color: #d0d0d0;
            }
        }
    }
    .body-post {
        margin-bottom: 2px ;
        .title-post {
            padding: 0 15px;
            margin-bottom: 15px;
            text-align: justify;
            font-size: 16px;
            font-weight: 600;
            cursor: ${(props) => props?.isDetail ? "default" : "pointer"}
        }
        .detail-post {
            padding: 0 15px 15px;
            text-align: justify;
            /* margin-bottom: 15px; */
            font-size: 14px;
            white-space: pre-wrap;
        }
        .list-image {
            .item-image {
                width: 100%;
                :first-child {
                    margin-bottom: 3px;
                }
            }
            .loading-image {
                height: 300px;
            }
        }
        .list-image-3 {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .img-preview {
                
                :first-child {
                    width: 100%;
                    height: 400px;
                    margin-bottom: 5px;
                }
                :nth-child(2), :nth-child(3) {
                    width: 49.5%;
                    height: 200px;

                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }
            .loading-image {
                height: 100%;
                width: 100%;
            }
        }
    }
    .footer-post {
        padding: 0 15px 5px;
        font-size: 14px;
        .detail-interaction {
            margin: 10px 0px;
            display: flex;
            justify-content: space-between;
            .detail-like {
                display: flex;
                align-items: center;
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }
            }
            .detail-other {
                display: flex;
                div {
                    margin-left: 10px;
                }
            }
        }
        .list-button {
            border-bottom: 1px solid #d0d0d0;
            border-top: 1px solid #d0d0d0;
            padding: 3px 0;
            display: flex;
            .action-button {
                cursor: pointer;
                border-radius: 5px;
                height: 30px;
                display: flex;
                margin: 0 10px;
                align-items: center;
                flex: 1;
                justify-content: center;
                :hover {
                    background-color: #dfdfdf;
                }
                .anticon {
                    margin-right: 10px;
                    svg {
                        width: 20px;
                        height: auto;
                    }
                }
                .text {
                    margin-top: 2px;
                    font-size: 14px;
                }
                .text-save {
                    color: #f21831;
                }
                .text-like {
                    color: #1877F2;
                }
            }
        }
        .border-top {
            border-top: 1px solid #d0d0d0;
        }
        
    }
    .list-comment {
        padding: 15px;
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
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 20px;
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
        }
        .comment {
            :last-child {
                margin-bottom: 0px;
            }
        }
        .no-comment {
            font-size: 16px;
            font-weight: 400;
        }
    }
    .load-more-comment {
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
    }
    .list-approve-button-admin {
        display: flex;
        padding: 5px 10px 5px;
        button {
            height: 40px;
            flex: 1;
            margin: 0 5px;
            border-radius: 5px;
            :nth-child(2) {
                background-color: #e4e4e4;
            }
        }
    }
`;

export { PostItemStyle };
