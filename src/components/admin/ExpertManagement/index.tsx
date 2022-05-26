import React from 'react';
import { Route } from 'react-router-dom';
import ListChatAdminComponent from '../../Chat/list-chat-admin';
import DetailChatAdminComponent from '../../Chat/detail-chat-admin';
import ListExpertComponent from './views/list-expert';

const ExpertManagementComponent = (props: any) => {
  const { match } = props;
  return (
    <>
      <Route exact path={match?.url} component={ListExpertComponent} />
      <Route exact path={`${match?.url}/list-chat/:id_expert`} render={() => <ListChatAdminComponent match={match} isAdmin />} />
      <Route exact path={`${match?.url}/detail-chat/:chat_session_id`} render={() => <DetailChatAdminComponent match={match} isAdmin />} />
    </>
  );
};

export default ExpertManagementComponent;