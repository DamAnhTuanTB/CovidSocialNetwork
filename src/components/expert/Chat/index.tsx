import React from 'react';
import { Route } from 'react-router-dom';
import DetailChatComponent from '../../Chat/detail-chat';
import ListChatComponent from '../../Chat/list-chat';

const ExpertChatComponent = (props: any) => {
    const { match } = props;
    return (
        <div>
            <Route exact path={match?.url} render={() => <ListChatComponent match={match} />} />
            <Route exact path={`${match?.url}/:chat_id`} render={() => <DetailChatComponent isExpert />} />
        </div>
    );
};

export default ExpertChatComponent;