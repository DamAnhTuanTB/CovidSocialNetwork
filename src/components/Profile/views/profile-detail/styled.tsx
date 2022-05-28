import styled from "styled-components";

const ProfileDetailStyled = styled.div`
    font-family: "Alata";
    width: 1110px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .detail-user {
        position: sticky;
        top: 80px;
        width: 350px;
        padding: 40px 0px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        .avatar {
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
        .button-edit, .button-change-password {
            cursor: pointer;
            border-radius: 15px;
            font-size: 16px;
            margin-top: 15px;
            background-color: #F0FAFF;
            color: #2FB5FA;
            padding: 5px 10px;
            font-weight: 500;
            :hover {
                background-color: #e9eef0;
            }
        }
        .button-change-password {
            margin-top: 10px;
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
    .pagination {
        margin-top: 20px;
        margin-bottom: 50px;
        .ant-pagination-item-link {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export { ProfileDetailStyled };
