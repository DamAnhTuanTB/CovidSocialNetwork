import styled from "styled-components";

const HeaderAdminStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 100;
  background-color: midnightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 250px;
    display: flex;
    justify-content: center;
    img {
      width: auto;
      height: 50px;
    }
  }

  .logout {
    margin-right: 30px;
    display: flex;
    div {
      color: white;
      margin-right: 20px;
      font-size: 20px;
      font-weight: 500;
    }
    img {
      cursor: pointer;
      width: 30px;
      height: auto;
    }
  }
`;

export { HeaderAdminStyled };
