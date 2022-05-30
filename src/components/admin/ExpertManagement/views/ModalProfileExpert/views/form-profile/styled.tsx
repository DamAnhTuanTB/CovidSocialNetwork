import { Modal } from "antd";
import styled from "styled-components";

interface Props {
  isHideRequired: boolean
}

const FormProfileStyled = styled.div<Props>`
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
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
  .ant-picker {
    width: 100%;
  }

  .formedit-avatar {
    position: relative;
    width: 120px;
    margin: auto;
    border-radius: 50%;
    .avatar-edit {    
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

  .ant-form-item-required {
    ::before {
      display: ${props => props.isHideRequired ? "none" : "inline-block"} !important;
    }
  }

  input[disabled], .ant-picker-disabled {
    cursor: default;
    background-color: #F5F5F5;
    color: black;
  }
`;

export { FormProfileStyled };
