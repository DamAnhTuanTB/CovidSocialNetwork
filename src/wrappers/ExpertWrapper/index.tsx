import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, Route, Switch } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useGetProfileExpert } from '../../hooks/expert/useProfileExpert';
import ExpertChatPage from '../../pages/expert/Chat';

export default function ExpertPageWrapper() {
  const isAuthenticated = !!Cookies.get('tokenExpert');
  const { profile } = useGetProfileExpert(isAuthenticated);
  
  const queryClient = useQueryClient();

  queryClient.setQueryData("profile-expert", profile);

  if (!isAuthenticated) return <Redirect to="/expert/login" />;
  if (!profile) return null;
  if (profile?.role !== "expert") {
    Cookies.remove('tokenExpert');
    return <Redirect to="/expert/login" />;
  }
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
