import React from 'react';
import { Route } from 'react-router-dom';
import DetailChatComponent from '../../Chat/detail-chat';
import ListChatComponent from '../../Chat/list-chat';
import ListExpertComponent from './views/list-expert';

const ExpertManagementComponent = (props: any) => {
  const { match } = props;
  return (
    <>
      <Route exact path={match?.url} component={ListExpertComponent} />
      <Route exact path={`${match?.url}/list-chat/:id_expert`} render={() => <ListChatComponent match={match} isAdmin />} />
      <Route exact path={`${match?.url}/detail-chat/:id_chat`} render={() => <DetailChatComponent match={match} isAdmin />} />
    </>
  );
};

export default ExpertManagementComponent;