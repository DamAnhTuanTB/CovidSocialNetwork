import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ChatPage from '../../pages/Chat';
import ExpertChatPage from '../../pages/expert/Chat';

export default function ExpertPageWrapper() {
  // const isAuthenticated = !!Cookies.get('token');
  // const { profile } = useGetProfile(isAuthenticated);

  // if (!isAuthenticated) return <Redirect to="/login" />;
  // if (!profile) return null;
  return (
    <div>
      {/* <SideNav /> */}
      <div>
        <PageHeader isExpert />
        <div className="covid-container">
          <Suspense fallback={null}>
            <Switch>
              <Route path="/expert/chat" component={ExpertChatPage}/>
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
