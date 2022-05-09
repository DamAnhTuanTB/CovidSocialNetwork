import styled from "styled-components";

const CommentItemStyled = styled.div`
    &:hover {
        .delete-icon {
            opacity: 1 !important;
        }
    }
    .item-comment {
        display: flex;
        /* padding: 20px; */
        margin-top: 20px;
        .avatar {
            height: 100%;
            margin-right: 5px;
            img {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                object-fit: cover;
                object-position: center;
            }
        }
        .content-comment {
            background-color: #F0F2F5;
            border-radius: 20px;
            padding: 5px 10px;
            flex: unset;
            max-width: 85%;
            .name-user {
                font-weight: bold;
                span {
                    :nth-child(2) {
                        margin-left: 20px;
                        font-size: smaller;
                        font-weight: normal;
                    }
                }
            }
            .text {
                word-break: break-all;
            }
        }
        .delete-icon {
            cursor: pointer;
            border-radius: 50%;
            opacity: 0;
            margin-top: 10px;
            margin-left: 5px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F0F2F5;
            :hover {
                background-color: #e5e5e5;
            }
        }
    }
    .image {
        margin-left: 45px;
        width: 200px;
        position: relative;
        .image-comment {
            width: 100%;
            height: auto;
            border-radius: 20px;
        }
    }
    .like {
        display: flex;
        align-items: flex-end;
        margin-left: 55px;
        margin-top: 3px;
        .button-like {
            font-weight: 600;
            cursor: pointer;
        }
        .liked {
            color: #1877F2;
        }
        .total-like {
            display: flex;
            background-color: #F0F2F5;
            margin-left: 10px;
            align-items: center;
            padding-right: 3px;
            border-radius: 8px;
            img {
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }

        }
    }
`;

export { CommentItemStyled };
