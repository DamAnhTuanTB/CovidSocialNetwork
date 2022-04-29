import styled from "styled-components";

const ListGuestStyled = styled.div`
  padding: 20px 50px;
  .title {
    font-size: 30px;
    margin-bottom: 30px;
    font-weight: 500;
  }
  .image-icon, .seemore-icon {
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

export { ListGuestStyled };
