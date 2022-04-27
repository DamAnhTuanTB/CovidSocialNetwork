import styled from "styled-components";

const SearchComponentStyled = styled.div`
  display: flex;
  .search-component {
    margin: auto;
    width: 100%;
    padding: 0 10px;
    min-height: 150px;
    max-width: 700px;
    .title {
      font-size: 24px;
      margin-bottom: 30px;
    }
    .item-post {
      width: 100%;
      display: flex;
      padding: 20px 0px;
      border-top: 2px solid #d6d6d6;
      img {
        max-width: 250px;
        width: 35%;
        height: 150px;
        object-fit: cover;
        object-position: center;
      }
      .detail-post {
        flex: 1;
        padding-left: 10px;
        .author {
          display: flex;
          .name-author {
            margin-right: 20px;
            color: #41455e;
            font-weight: 500;
          }
        }
        .title-post {
          margin-top: 10px;
          font-weight: 500;
          margin-bottom: 10px;
          font-size: 18px;
        }
      }
    }
    .pagination{
      margin-top: 20px;
      margin-bottom: 50px;
    }
  }
`;

export { SearchComponentStyled };
