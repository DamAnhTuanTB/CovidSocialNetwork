import styled from "styled-components";

const ListPostComponentStyled = styled.div`
    font-family: Montserrat,Raleway,sans-serif ;
    display: flex;
    flex-direction: column;
    .list-post-container {
        width: 1110px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin: auto;
        .list-post {
            width: 700px;
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
            position: sticky;
            top: 80px;
            width: 350px;
            background-color: white;
        }
        
    }
`;

export { ListPostComponentStyled };
