import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DetailChatComponent from './detail-chat';
import ListChatComponent from './list-chat';

const ChatComponent = (props: any) => {
    const { match } = props;
    return (
        <div>
            <Route exact path={match?.url} render={() => <ListChatComponent match={match} />} />
            <Route exact path={`${match?.url}/:chat`} render={() => <DetailChatComponent />} />
        </div>
    );
};

export default ChatComponent;