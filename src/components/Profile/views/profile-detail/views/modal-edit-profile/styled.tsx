// @ts-nocheck
import styled from "styled-components";
import { Modal } from 'antd';

const ModalEditProfileStyled = styled(Modal)`
  .ant-form-item {
    margin-bottom: 10px;
  }
  .ant-form-item-explain {
    min-height: auto;
    font-size: 14px;
  }
  .ant-form-item-label {
    padding-bottom: 5px;
  }
  .ant-picker {
    width: 100%;
  }
  .formedit-avatar {
    position: relative;
    width: 120px;
    margin: auto;
    margin-bottom: 20px;
    border-radius: 50%;
    .avatar {    
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
    }
    .loading-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      background-color: rgba(255, 255, 255, 0.5);
      .loading {
        margin: auto;
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .button-file {
      cursor: pointer;
      display: flex;
      justify-content: center;
      position: absolute;
      right: 3px;
      bottom: 3px;
      z-index: 10;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #bbbcbe;
      background-color: #D8DADF;
      :hover {
        background-color: #c9ccd4;
      }
      .input-file {
          cursor: pointer;
          position:absolute;
          left: 0px;
          height: 100%;
          width: 100%;
          opacity: 0;
          z-index:999;
      }
      .camera-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .update-profile-form {
    .fullwitdh {
      width: 100%;
      .ant-space-item {
        flex: 1;
        :first-child {
          margin-right: 10px;
        }
      }
    }
  }
`;

export { ModalEditProfileStyled };
