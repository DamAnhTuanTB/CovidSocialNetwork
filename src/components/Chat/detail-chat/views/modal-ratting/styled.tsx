// @ts-nocheck
import styled from "styled-components";
import { Modal } from 'antd';

const ModalRattingStyled = styled(Modal)`
  .icon-emotion {
    display: flex;
    justify-content: center;
    span {
      svg {
        width: 60px;
        height: 60px;
      }
    }
    .anticon-frown {
      path {
        fill: ${(props) => props.rating === 2 ? "#fc9700" : "#fc3700"};
      }
    }
    .anticon-meh {
      path {
        fill: #00fc08;
      }
    }

    .anticon-smile {
      path {
        fill: ${(props) => props.rating === 4 ? "#0086fc" : "#2a00fc"};
      }
    }
  }
`;

export { ModalRattingStyled };
