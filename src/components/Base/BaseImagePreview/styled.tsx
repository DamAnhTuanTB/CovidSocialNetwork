import styled from "styled-components";

const BaseImagePreviewStyled = styled.div`
    cursor: pointer;
    .preview-image-fixed {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.7);
        .image-temp {
            max-height: 80%;
            max-width: 80%;
            object-fit: contain !important;
        }
        .close-button {
            cursor: pointer;
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            span {
                margin: auto;
                svg {
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
`;

export { BaseImagePreviewStyled };
