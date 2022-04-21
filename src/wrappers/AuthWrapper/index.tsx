import React, { lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import PageHeader from '../../components/PageHeader';
import SideNav from '../../components/SideNav';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useGetProfile } from '../../hooks/useProfile';
import ProfilePage from '../../pages/Profile';
import PostsPage from '../../pages/Post';
import ChatPage from '../../pages/Chat';

const Home = lazy(() => import('../../pages/Home'));

export default function PageWrapper() {
  // const isAuthenticated = !!Cookies.get('token');
  // const { profile } = useGetProfile(isAuthenticated);

  // if (!isAuthenticated) return <Redirect to="/login" />;
  // if (!profile) return null;
  return (
    <div>
      {/* <SideNav /> */}
      <div>
        <PageHeader />
        <div className="covid-container">
          <Suspense fallback={null}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/post" component={PostsPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/chat" component={ChatPage} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
