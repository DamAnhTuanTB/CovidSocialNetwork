/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ListPost from './views/list-post';
import DetailPost from './views/detail-post';

const PostComponent = (props: any) => {
  const { match } = props;
  return (
    <div>
      <Route exact path={match?.url} render={() => <ListPost match={match} />} />
      <Route exact path={`${match?.url}/:id_post`} render={() => <DetailPost match={match} />} />
    </div>
  );
};

PostComponent.propTypes = {
    match: PropTypes.any,
};

export default PostComponent;
