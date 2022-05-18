import styled from "styled-components";

const SearchComponentStyled = styled.div`
  display: flex;
  .search-component {
    margin: auto;
    width: 100%;
    padding: 0 20px 20px;
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
      .main-image-container {
        .img-preview {
          position: relative;
          padding-top: 60%;
          width: 100%;
          min-width: 240px;
          .main-image {
            /* max-width: 250px; */
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
        }
      }
      .detail-post {
        flex: 1;
        padding-left: 10px;
        position: relative;
        .author {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .name-author {
            margin-right: 20px;
            color: #41455e;
            font-weight: 500;
          }
          .avatar {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            object-fit: cover;
            object-position: center;
            margin-right: 10px;
          }
          .date {
            font-size: 12px;
          }
        }
        .title-post {
          cursor: pointer;
          font-weight: 500;
          margin-bottom: 10px;
          font-size: 18px;
        }
        .interaction-detail {
          display: flex;
          position: absolute;
          right: 0;
          bottom: 0;
          .item-interaction {
            margin-left: 10px;
            svg {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
    .pagination{
      margin-top: 20px;
      margin-bottom: 50px;
    }
  }

  @media (max-width: 638px) {
    .item-post {
      flex-direction: column;
      .detail-post {
        padding-left: 0 !important;
        margin-top: 10px;
      }
    }
  }
`;

export { SearchComponentStyled };
