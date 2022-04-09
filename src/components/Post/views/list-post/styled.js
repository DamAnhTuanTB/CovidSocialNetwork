import styled from "styled-components";

const ListPostComponentStyled = styled.div`
    font-family: Montserrat,Raleway,sans-serif ;
    display: flex;
    .list-post-container {
        /* width: 1000px; */
        display: flex;
        align-items: flex-start;
        margin: auto;
        .list-post {
            width: 700px;
            margin-right: 50px;
            .pagination {
                margin-top: 20px;
                margin-bottom: 50px;
                .ant-pagination-item-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        .list-hot-post {
            width: 350px;
            background-color: white;
        }
        
    }
`;

export { ListPostComponentStyled };
