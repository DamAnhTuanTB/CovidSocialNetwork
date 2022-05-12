import styled from "styled-components";

const ListPostManagementStyled = styled.div`
  padding: 20px 50px;
  .ant-tabs-ink-bar-animated {
    transition: unset !important;
  }
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    span {
      font-style: italic;
    }
  }
  .list-post-container {
    padding-top: 20px;
    width: 100%;
    max-width: 700px;
    margin: auto;
  }
  .ant-tabs-tab {
    padding: 12px 5px;
  }
  .pagination {
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    .ant-pagination-item-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
`;

export { ListPostManagementStyled };
