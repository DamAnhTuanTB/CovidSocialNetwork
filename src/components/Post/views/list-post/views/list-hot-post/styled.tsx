import styled from "styled-components";

const ListHotPostStyled = styled.div`
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    .title {
        font-size: 16px;
        padding: 10px;
        border-bottom: 1px solid #D0D0D0;
    }
    .posts {
        .post-item {
            display: flex;
            padding: 15px;
            img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 50%;
                margin-right: 10px;
            }
            .post-title {
                font-size: 14px;
                font-weight: bold;
            }
            .post-author {
                display: flex;
                align-items: flex-end;
                .name-author {
                    font-size: 12px;
                    margin-right: 5px;
                }
                .create-at {
                    margin-left: 5px;
                    font-size: 10px;
                }
            }
        }
    }
`;

export { ListHotPostStyled };
