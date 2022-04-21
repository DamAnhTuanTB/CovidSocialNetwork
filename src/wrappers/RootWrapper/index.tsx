import React, { lazy } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Register from '../../pages/Register';
import AuthWrapper from '../../wrappers/AuthWrapper';
import AdminPageWrapper from '../AdminWrapper';

const Login = lazy(() => import('../../pages/Login'));

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <div className="root-wrapper">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/admin" component={AdminPageWrapper} />
          <Route path="/" component={AuthWrapper} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
