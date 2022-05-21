import styled from "styled-components";

const InfoDoctorComponentStyled = styled.div`
    width: 350px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    .title {
        padding: 10px 20px;
        border-bottom: 1px solid #d0d0d0;
        font-size: 16px;
        font-weight: 600;
    }
    .detail {
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
        }
        .name-user {
            font-size: 20px;
            font-weight: bold;
            margin-top: 15px;
        }
        .name-tag {
            color: #C3CCD7;
            font-size: 14px;
        }
    }
`;

export { InfoDoctorComponentStyled };
