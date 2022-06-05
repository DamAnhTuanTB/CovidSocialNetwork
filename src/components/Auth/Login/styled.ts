import { url } from "inspector";
import styled from "styled-components";

interface Props {
  isAdmin: boolean;
  isExpert: boolean;
}

const LoginStyled = styled.div<Props>`
  background-image: ${(props) =>
    props.isExpert
      ? "url('/login/background_login_expert.png')"
      : props.isAdmin
      ? "url('/login/background_login_admin.png')"
      : "url('/login/background_login.png')"};
  /* background-image: url("https://lh3.googleusercontent.com/xpF04rfmwAa2E8TeksiC4fjei4JHrgcgVAr3iPIgG5CFKEekHC2d5DyNxktnDRY8JYu8S6I1hE0CkzHjJ6v0DGCdQjuS_Yy3iSM-wLnmyTjXPYGLWMcw2YRaFmuW-zN9HlFJ8qN5LGAU1X-U3BR0jVvJB4bMenJ_r_ckiRVltcBWKOQmowPU2FTuKkZixrtecKRrPL3b1CcKnhnjWyazfD4ffs_hOdXp8N8KDtb3Zlm25bbe5bdMwPk44ifSV-5Sa2sUsF_MEaR0Id9GdGwCI331zQvKpl5yQow7QKEIrvR2Nsxj6oja2awvgZ3o2Xtje8VF3JqLXnF66gihinyxY-H1lV9-3BzrdV53jeWM-eL0J08z7EMPhGamGXcd2ViHI-btw-H5PX3MrBznElYZks9KcNX46ij8lSeteNcHJgBTlGDTQ2h5RE6xI6f6-F22IizIYrapQzw0cp6eO_FBF5BBgCMiRhv3ArmHA2n8uUwa3j_7xZXPTs9bV1DtchQtEHyA4poLybRLmw6Sg92QSbT3U82Pt_l5DeWD2IPpFNscityD-2ANBaDQOHRRCrZ6wLzKJ-vkY7G_cqKjMhEWDi62DcG6KmMlAl101DMkAz8TVh4Alz0f8GXaqKShZH_J_q-WH425j729uiQFcFHChm4RvLJ9M5J43SOS7YEgijUx1sH0bvAVePNLmtxEF0zfrvimFacBUThltk7s9lrv27x5Fkuen1ndwxzJHqrUB4tqPPtDzNtDgmacvXMdvWFgU44Y-LbesV8LAqcpSZckVkq9OZPlAav67Qm5hE1nNvNaihTSUGUJvbK7VOLT674rX_12VXhl62ZVu3pv5kRirsI-0YGxhqZKvd0KHhho3A=w1500-h993-no?authuser=3"); */
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Alata";
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.isAdmin && "#1254a2"};
  background-color: ${(props) => props.isExpert && "#1254a2"};
  .login-container {
    width: 900px;
    margin: auto;
    display: flex;
    justify-content: ${(props) =>
      props.isAdmin || props.isExpert ? "center" : "space-between"};
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
    .form-login {
      width: 400px;
      background-color: white;
      padding: ${(props) =>
        props.isAdmin || props.isExpert ? "20px 40px" : "20px 20px"};
      border-radius: 10px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
      .title-admin {
        font-size: 24px;
        font-weight: bold;
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
        font-size: 17px;
        font-family: "Alata";
      }
      .login-form-button {
        height: 50px;
        border-radius: 5px;
        font-size: 20px;
        margin-bottom: 15px;
        width: 100%;
        font-weight: 500;
        background-color: #fd4d4c;
        border-color: transparent;
        font-family: "Alata";
      }
      .register-button {
        height: 50px;
        border-radius: 5px;
        font-size: 20px;
        width: 80%;
        background-color: #55b043;
        color: white;
        margin-left: 10%;
        font-weight: 500;
        font-family: "Alata";
      }
    }
  }
`;

export { LoginStyled };
