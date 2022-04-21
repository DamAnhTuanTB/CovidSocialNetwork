/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DetailPost from '../../Post/views/detail-post';
import ListPostManagement from './views/list-post';

const PostManagementComponent = (props: any) => {
  const { match } = props;
  return (
    <div>
      <Route exact path={match?.url} render={() => <ListPostManagement match={match} />} />
      <Route exact path={`${match?.url}/:id_post`} render={() => <DetailPost isAdmin match={match} />} />
    </div>
  );
};

PostManagementComponent.propTypes = {
    match: PropTypes.any,
};

export default PostManagementComponent;
