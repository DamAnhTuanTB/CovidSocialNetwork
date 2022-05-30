// @ts-nocheck
import styled from "styled-components";

const ListImageStyled = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  .list-image {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    .item-image {
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
      margin-right: 20px;
      border-radius: 10px;
      border: 0.1px solid #cacaca;
      :nth-child(4n) {
        margin-right: 0;
      }
      .img-preview {
        width: 100%;
        height: 100%;
        .image {
          border-radius: 10px;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
  .load-more {
    border: none;
    cursor: pointer;
    color: black;
    padding: 0;
    :hover {
      color: black;
    }
  }
  
`;

export { ListImageStyled };
