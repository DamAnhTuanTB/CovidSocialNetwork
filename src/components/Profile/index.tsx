import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DetailPost from '../Post/views/detail-post';
import ProfileDetail from './views/profile-detail';
import { ProfileComponentStyled } from './styled';

const ProfileComponent = (props: any) => {
  const {match } = props;

  return (
    <ProfileComponentStyled>
      <Route exact path={match?.url} render={() => <ProfileDetail />} />
      <Route exact path={`${match?.url}/:id_user`} render={() => <ProfileDetail isGuest />} />
    </ProfileComponentStyled>
  );
};

ProfileComponent.propTypes = {
  match: PropTypes.any,
};

export default ProfileComponent;