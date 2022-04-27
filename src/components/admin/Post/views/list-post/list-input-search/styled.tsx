import styled from "styled-components";

const ListInputSearchStyled = styled.div`
  .search-form {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .ant-form-item {
      margin: 0;
      margin-right: 20px;
    }
    .ant-form-item-control-input {
      width: 200px;
      .ant-picker {
        width: 100%;
      }
    }
  }
`;

export { ListInputSearchStyled };
