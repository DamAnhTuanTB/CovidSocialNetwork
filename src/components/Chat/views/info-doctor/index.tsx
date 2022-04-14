import React from 'react';
import { InfoDoctorComponentStyled } from './styled';

const InfoDoctorComponent = (props: any) => {
  return (
    <InfoDoctorComponentStyled>
      <div className="title">
        Thông tin bác sĩ
      </div>
      <div className="detail">
        <img src="/post/avatar_my1.jpg" alt="" />
        <div className="name-user">Lê Tuấn</div>
        <div className="name-tag">@tuancules</div>
        <div className="more-info-doctor">
          more info
        </div>
      </div>
    </InfoDoctorComponentStyled>
  );
};

export default InfoDoctorComponent;