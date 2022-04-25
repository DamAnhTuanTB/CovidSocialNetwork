import styled from "styled-components";

const BaseRatingStarStyled = styled.div`
  display: flex;
  justify-content: center;
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 40px;
    padding: 0;
  }
  .on {
    color: yellow;
  }
  .off {
    color: #ccc;
  }
`;

export { BaseRatingStarStyled };
