import styled from "styled-components";

const ListGuestStyled = styled.div`
  padding: 20px 50px;
  .title-container {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      font-size: 30px;
      font-weight: 500;
    }
  }
  .list-button {
    display: flex;
    margin-top: 20px;
    input {
      box-shadow: none;
    }
  }
  .ant-space-item {
    display: flex;
  }
  .image-icon, .seemore-icon, .delete-icon {
    cursor: pointer;
    margin-right: 10px;
    svg {
      width: 20px;
      height: auto;
    }
  }
  .post-icon {
    width: 20px;
    height: auto;
    cursor: pointer;
    margin-right: 10px;
  }
  .pagination {
    margin-top: 20px;
  }
`;

export { ListGuestStyled };
