import styled from "styled-components";

interface Props {
    totalNotify: number,
}

const PageHeaderStyled = styled.div<Props>`
    background-color: white;
    border-bottom: 1px solid #d0d0d0;
    width: calc(100vw);
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    .header-container {
        width: 1110px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        height: 60px;
        .logo {
            height: 100%;
            img {
                margin-left: -17px;
                height: 100%;
                width: auto;
            }
        }
        .list-button {
            display: flex;
            align-items: center;
            .input-search {
                width: 200px;
                margin-right: 50px;
                .ant-input, .ant-input-search-button {
                    height: 30px;
                    :focus {
                        box-shadow: none;
                    }
                }
            }
            .icon-header {
                cursor: pointer;
                border-radius: 50%;
                height: 40px;
                width: 40px;
                display: flex;
                margin-right: 10px;
                svg {
                    margin: auto;
                    height: 50%;
                    width: 50%;
                }
                :hover {
                    background-color: #ebebeb;
                }
            }
            .icon-logout {
                margin-right: 0;
                margin-left: 10px;
                img {
                    margin: auto;
                    height: 60%;
                    width: 60%;
                }
                :hover {
                    background-color: transparent;
                }
            }
            .user-avatar {
                margin-right: 10px;
                border-radius: 50%;
                .avatar {
                    cursor: pointer;
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                    object-fit: cover;
                    object-position: center;
                }
            }
            .ant-btn {
                height: 40px;
                font-size: 16px;
            }
            .notification {
                position: relative;
                svg {
                    animation: ${ (props) => props.totalNotify ? "rotation 1.5s infinite linear" : "none"};
                }
                .unread-notification {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: red;
                    color: white;

                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                }
                .dropdown {
                    z-index: 100;
                    width: 400px;
                    background-color: white;
                    border: 1px solid #d0d0d0;
                    position: absolute;
                    top: 55px;
                    left: -180px;
                    max-height: 500px;
                    padding: 10px;
                    ::after {
                        content: "";
                        position: absolute;
                        top: -10px;
                        left: 190px;
                        z-index: 101;
                        width: 0;
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid white;
                    }
                    ::before {
                        content: "";
                        position: absolute;
                        top: -11px;
                        left: 190px;
                        z-index: 101;
                        width: 0;
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 11px solid #d0d0d0;
                    }
                    .title-notification {
                        font-size: 20px;
                        font-weight: 500;
                        margin-bottom: 15px;
                    }
                    .item-notification {
                        padding: 10px;
                        background-color: #EDF2F7;
                        display: flex;
                        align-items: flex-start;
                        img {
                            width: 40px;
                            height: 40px;
                            object-fit: cover;
                            object-position: center;
                            margin-right: 10px;
                            border-radius: 50%;
                        }
                        .detail {
                            .content {
                                font-size: 16px;
                                span {
                                    margin-right: 5px;
                                    color: rgba(74,85,104,1);
                                    font-weight: 700;
                                }
                            }
                            .created-at {
                                font-size: 12px;
                                font-weight: 500;
                                color: #A0AEC0;
                            }
                        }
                    }
                }
            }
        }
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        10% {
            transform: rotate(30deg);
        }

        30% {
            transform: rotate(-30deg);
        }
        50% {
            transform: rotate(30deg);
        }
        60% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
        /* 50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-30deg);
        } */
        /* 100% {
            transform: rotate(30deg);
        } */
    }
`;

export { PageHeaderStyled };
