import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, Route, Switch } from 'react-router-dom';
import HeaderAdmin from '../../components/admin/Header';
import SideBarAdmin from '../../components/admin/SideBar';
import { useGetProfile } from '../../hooks/useProfile';
import ChangePasswordAdminPage from '../../pages/admin/ChangePassword';
import ExpertManagementPage from '../../pages/admin/Expert';
import GuestManagementPage from '../../pages/admin/Guest';
import PostsPageManagement from '../../pages/admin/Post';
import { AdminStyled } from './styled';

export default function AdminPageWrapper() {
  const isAuthenticated = !!Cookies.get('token');
  // const isAuthenticated = !!Cookies.get('tokenAdmin');
  const { profile } = useGetProfile(isAuthenticated);
  // const { profile } = useGetProfileAdmin(isAuthenticated);

  const queryClient = useQueryClient();

  queryClient.setQueryData("profile-admin", profile);

  if (!isAuthenticated) return <Redirect to="/admin/login" />;
  if (!profile) return null;
  return (
    <AdminStyled>
      <HeaderAdmin />
      <div className="admin-container">
        <SideBarAdmin />
        <div className="admin-management-container">
          <Suspense fallback={null}>
            <Switch>
              <Route path="/admin/post-management" component={PostsPageManagement} />
              <Route path="/admin/guest-management" component={GuestManagementPage} />
              <Route path="/admin/expert-management" component={ExpertManagementPage} />
              <Route path="/admin/change-password" component={ChangePasswordAdminPage} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </AdminStyled>
  );
}
