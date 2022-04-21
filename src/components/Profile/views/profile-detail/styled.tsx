import styled from "styled-components";

const ProfileDetailStyled = styled.div`
    width: 1110px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .detail-user {
        width: 350px;
        padding: 40px 0px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
        }
        .name-user {
            font-size: 20px;
            font-weight: bold;
            margin-top: 15px;
        }
        .name-tag {
            color: #C3CCD7;
            font-size: 14px;
        }
        .button-edit {
            cursor: pointer;
            font-size: 16px;
            margin-top: 15px;
            background-color: #F0FAFF;
            color: #2FB5FA;
            padding: 5px;
            font-weight: 500;
        }
    }
    .list-post {
        width: 700px;
        .ant-tabs-nav {
            background-color: white;
            padding-left: 10px;
            border-radius: 10px;
        }
        .ant-tabs-tab {
            padding-left: 10px;
            padding-right: 10px;
            margin: 0;
            margin-right: 10px;
        }
        .ant-tabs-ink-bar-animated {
            transition: unset !important;
        }
    }
`;

export { ProfileDetailStyled };
