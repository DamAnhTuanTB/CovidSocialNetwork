import { Modal } from "antd";
import styled from "styled-components";

const ModalProfileGuestStyled = styled(Modal)`
  .avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    .avatar-image, .loading-image {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      object-fit: cover;
      object-position: center;
    }
  }
  .fullwitdh {
    width: 100%;
  }
  .ant-space-item {
    flex: 1;
    :first-child {
      margin-right: 10px;
    }
  }
  .info-item {
    margin-bottom: 10px;
    .label {
      margin-bottom: 5px;
    }
    .value {
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #ececec;
      min-height: 40px;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
`;

export { ModalProfileGuestStyled };
