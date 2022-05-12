import { Modal } from "antd";
import styled from "styled-components";

interface Props {
  isEditProfile: boolean
}

const ModalProfileExpertStyled = styled(Modal)<Props>`
  .list-tab {
    display: flex;
    margin-bottom: 20px;
    .item-tab {
      padding: 5px;
      cursor: pointer;
      margin-right: 10px;
    }
    .active {
      /* background-color: red; */
      border-bottom: 4px solid #1890ff;
    }
  }
`;

export { ModalProfileExpertStyled };
