import React from 'react';
import PropTypes from 'prop-types';
import { HeaderAdminStyled } from './styled';

const HeaderAdmin = (props: any) => {
  return (
    <HeaderAdminStyled>
      <div className="logo">
          <img src="/login/facebookLogo.svg" alt="" />
      </div>
      <div className="logout">
        <div>Admin</div>
        <img
          src={"/admin/navLogout.svg"}
          alt="logout-icon"
        />
      </div>
    </HeaderAdminStyled>
  );
};

HeaderAdmin.propTypes = {

};

export default HeaderAdmin;