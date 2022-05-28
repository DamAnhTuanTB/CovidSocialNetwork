import Cookies from 'js-cookie';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdminStyled } from './styled';

const HeaderAdmin = (props: any) => {
  const history = useHistory();
  const logout = () => {
    Cookies.remove('tokenAdmin');
    history.push('/admin/login');
  }
  return (
    <HeaderAdminStyled>
      <div className="logo">
        <img src="/login/logo_2.png" alt="" />
      </div>
      <div className="logout">
        <div>Admin</div>
        <img
          src={"/admin/navLogout.svg"}
          alt="logout-icon"
          onClick={logout}
        />
      </div>
    </HeaderAdminStyled>
  );
};

HeaderAdmin.propTypes = {

};

export default HeaderAdmin;