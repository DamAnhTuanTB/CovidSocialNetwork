import styled from "styled-components";

const ListChatStyled = styled.div`
    display: flex;
    justify-content: center;
    height: calc(100vh - 80px);
    .list-chat {
        width: 900px;
        .title {
            font-size: 28px;
            font-weight: 500;
            margin-bottom: 20px;
        }
        .search-bar {
            margin-bottom: 20px;
            .button-search {
                margin-left: 10px;
            }
        }
        .detail-action {
            cursor: pointer;
        }
    }
    .list-chat-admin {
        padding-top: 30px;
        .title {
            font-size: 30px;
        }
    }
    .pagination {
        margin-top: 20px;
    }
`;

export { ListChatStyled };
