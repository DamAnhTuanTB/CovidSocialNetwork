import styled from "styled-components";
interface Props {
    isAdmin: boolean,
}

const CommentItemStyled = styled.div<Props>`
    margin-bottom: 20px;
    &:hover {
        .delete-icon {
            opacity: 1 !important;
        }
    }
    .item-comment {
        display: flex;
        /* padding: 20px; */
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
                white-space: pre-wrap;
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
        .more-option {
            transform: rotate(90deg);
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
        margin-left: ${props => props.isAdmin ? "45px" : "55px"};
        margin-top: 3px;
        .button-like {
            font-weight: 600;
            cursor: pointer;
            margin-right: 10px;
        }
        .liked {
            color: #1877F2;
        }
        .admin-disable-like {
            cursor: default;
        }
        .total-like {
            display: flex;
            background-color: #F0F2F5;
            /* margin-left: 10px; */
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
