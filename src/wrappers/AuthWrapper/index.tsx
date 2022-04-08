import React, { lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import PageHeader from '../../components/PageHeader';
import SideNav from '../../components/SideNav';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useGetProfile } from '../../hooks/useProfile';
import PostComponent from '../../components/Post';

const Home = lazy(() => import('../../pages/Home'));

export default function PageWrapper() {
  // const isAuthenticated = !!Cookies.get('token');
  // const { profile } = useGetProfile(isAuthenticated);

  // if (!isAuthenticated) return <Redirect to="/login" />;
  // if (!profile) return null;
  return (
    <div>
      <SideNav />
      <div>
        <PageHeader />
        <div>
          <Suspense fallback={null}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/post" component={PostComponent} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
