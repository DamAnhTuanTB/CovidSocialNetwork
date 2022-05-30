import styled from "styled-components";

const ListExpertStyled = styled.div`
  padding: 20px 50px;
  .title-container {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .title {
      font-size: 30px;
      font-weight: 500;
    }
  }

  .list-button {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .search {
    display: flex;
    margin-top: 20px;
    input {
      box-shadow: none;
    }
  }

  .image-icon, .seemore-icon, .delete-icon {
    cursor: pointer;
    margin-right: 10px;
    svg {
      width: 20px;
      height: auto;
    }
  }
  .avg-rate, .count-rate {
    display: flex;
    justify-content: center;
  }

  .pagination {
    margin-top: 20px;
  }
`;

export { ListExpertStyled };
