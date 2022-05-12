import styled from "styled-components";

interface Props {
  isAdmin: boolean,
  isExpert: boolean,
}

const LoginStyled = styled.div<Props>`
  display: flex;
  height: 100vh;
  background-color: ${props => (props.isAdmin) && "#1254a2"};
  background-color: ${props => (props.isExpert) && "#1254a2"};
  .login-container {
    width: 900px;
    margin: auto;
    display: flex;
    justify-content: ${props => (props.isAdmin || props.isExpert) ? "center" : "space-between" };
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
        padding: ${props => (props.isAdmin || props.isExpert) ? "20px 40px" : "20px 20px" };
        border-radius: 10px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
        .title-admin {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 20px;
          text-align: center;
        }
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
