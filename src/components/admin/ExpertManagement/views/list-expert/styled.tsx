import styled from "styled-components";

const ListExpertStyled = styled.div`
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

  .image-icon, .seemore-icon, .delete-icon {
    cursor: pointer;
    margin-right: 10px;
    svg {
      width: 20px;
      height: auto;
    }
  }
  .pagination {
    margin-top: 20px;
  }
`;

export { ListExpertStyled };
