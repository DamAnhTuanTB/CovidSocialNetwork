import styled from "styled-components";

const ListInputSearchStyled = styled.div`
  .search-form {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .ant-form-item {
      margin: 0;
      flex: 1;
      margin-right: 20px;
    }
    .ant-form-item-control-input {
      .ant-picker {
        width: 100%;
      }
    }
  }
`;

export { ListInputSearchStyled };
