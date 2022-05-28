import styled from "styled-components";

const RegisterStyled = styled.div`
  background-image: url("../register_bg.jpg");
  font-family: "Alata";
  display: flex;
  height: 100vh;
  .register-container {
    width: 900px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 450px;
      .logo-image {
        width: 450px;
      }
      .logo-description {
        font-size: 22px;
        line-height: 32px;
        text-align: center;
        margin-top: 5px;
        filter: drop-shadow(1px 1px 2px #ff0000);
        color: #ffffff;
      }
    }
    .form-register {
      width: 400px;
      background-color: white;
      padding: 20px 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
      .title {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .ant-form-item {
        margin-bottom: 15px;
      }
      .ant-divider {
        margin-top: 0;
        margin-bottom: 15px;
      }
      .ant-input {
        height: 45px;
        border-radius: 5px;
      }
      .ant-picker {
        height: 45px;
        width: 100%;
        border-radius: 5px;
      }
      .forgot-pass {
        margin-bottom: 10px;
        text-align: center;
      }
      .register-form-button {
        height: 50px;
        border-radius: 5px;
        font-size: 20px;
        margin-bottom: 15px;
        width: 100%;
        font-weight: 500;
      }
      .register-button {
        height: 50px;
        border-radius: 5px;
        font-size: 20px;
        width: 80%;
        background-color: #42b72a;
        color: white;
        margin-left: 10%;
      }
    }
  }
`;

export { RegisterStyled };
