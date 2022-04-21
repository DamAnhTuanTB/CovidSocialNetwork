import styled from "styled-components";

const SideBarAdminStyled = styled.div`
  
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  width: 250px;
  background-color: currentcolor;
  .ant-menu {
    background-color: transparent;
    font-size: 16px;
    .ant-menu-submenu-title, .ant-menu-item {
      height: 50px;
    }
    .ant-menu-item {
      margin: 0;
    }
  }
`;

export { SideBarAdminStyled };
