import { Modal } from "antd";
import styled from "styled-components";

const ModalListImageStyled = styled(Modal)`
  .list-image {
    display: flex;
    flex-wrap: wrap;
    max-height: 550px;
    overflow-y: auto;
    .item-image {
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
      margin-right: 15px;
      :nth-child(4n) {
        margin-right: 0;
      }
      .img-preview {
        width: 100%;
        height: 100%;
        .img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    .no-image-text {
      font-size: 20px;
    }
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background-color: #DFDFDF;
    }
    ::-webkit-scrollbar-thumb {
      background: #8F8F8F;
      border-radius: 5px;
    }
  }
  .loading-spin {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export { ModalListImageStyled };
