import { Modal } from "antd";
import styled from "styled-components";

const ModalListImageStyled = styled(Modal)`
  .list-image {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item-image {
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
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
