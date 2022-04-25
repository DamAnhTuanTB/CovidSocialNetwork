import styled from "styled-components";

const LoginStyled = styled.div`
  display: flex;
  height: 100vh;
  .login-container {
    width: 900px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 450px;
      .logo-image {
        width: auto;
        height: 106px;
        margin-left: -28px;
      }
      .logo-description {
        font-size: 20px;
        font-weight: normal;
        line-height: 32px;
      }
    }
    .form-login {
        width: 400px;
        background-color: white;
        padding: 20px 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
        .ant-form-item {
          margin-bottom: 20px;
        }
        .ant-divider {
          margin-top: 0;
          margin-bottom: 20px;
        }
        .ant-input-affix-wrapper {
          border-radius: 5px;
          .ant-input {
            height: 35px;
          }
        }
        .ant-input-prefix {
          margin-right: 10px;
          svg {
            width: 20px;
            height: 20px;
          }
        }
        .forgot-pass {
          margin-bottom: 10px;
          text-align: center;
        }
        .login-form-button {
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
          font-weight: 500;
        }
    }
  }
`;

export { LoginStyled };
