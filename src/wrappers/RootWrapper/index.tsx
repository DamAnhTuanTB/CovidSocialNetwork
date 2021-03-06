import { Modal } from 'antd';
import React, { lazy, useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Register from '../../pages/Register';
import AuthWrapper from '../../wrappers/AuthWrapper';
import AdminPageWrapper from '../AdminWrapper';
import ExpertPageWrapper from '../ExpertWrapper';
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css';
import LoginAdmin from '../../pages/admin/Login';
import NotFoundPage from '../../pages/NotFound';
import LogoutPage from '../../pages/Logout';
import LoginExpert from '../../pages/expert/Login';
import PendingPostPage from '../../pages/PendingPostPage';

const Login = lazy(() => import('../../pages/Login'));

const ConfirmLeavePage = (props: any) => {
  const historys = useHistory();
  const { setIsConfirm, confirmCallback, isConfirm } = props;
  const submitTransition = () => {
    setIsConfirm(false);
    confirmCallback(true);
    historys.go();
  };
  const cancelTransition = () => {
    setIsConfirm(false);
    confirmCallback(false);
    
  };
  return (
    <>
      <Modal title="Bạn có chắc chắn muốn thoát cuộc trò chuyện" visible={isConfirm} onOk={submitTransition} onCancel={cancelTransition}>
        <p>Tất cả dữ liệu về cuộc trò chuyện sẽ bị mất</p>
      </Modal>
    </>
  );
};


// const useBeforeUnload = ({ when, message }: any) => {
//   useEffect(() => {
//     const handleBeforeUnload = (event: any) => {
//       event.preventDefault()
//       event.returnValue = message
//       return message
//     }

//     if (when) {
//       window.addEventListener('beforeunload', handleBeforeUnload)
//     }

//     return () => window.removeEventListener('beforeunload', handleBeforeUnload)
//   }, [when, message])
// }


export default function AppWrapper() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const getConfirmation = (message: any, callback: any) => {
    setConfirmCallback(() => callback);
    setIsConfirm(true);
  };
  return (
    <BrowserRouter
      getUserConfirmation={getConfirmation}
    >
      <div className="root-wrapper">
      <title>{`aaaaaaaa`}</title>
        <ToastContainer />
        <Switch>
          <Route path="/not-found" exact component={NotFoundPage} />
          <Route path="/post-pending" exact component={PendingPostPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={LogoutPage} />
          <Route path="/admin/login" exact component={LoginAdmin} />
          <Route path="/expert/login" exact component={LoginExpert} />
          <Route path="/register" exact component={Register} />
          <Route path="/admin" component={AdminPageWrapper} />
          <Route path="/expert" component={ExpertPageWrapper} />
          <Route path="/" component={AuthWrapper} />
        </Switch>
      </div>
      {isConfirm && (
        <ConfirmLeavePage
          confirmCallback={confirmCallback}
          setIsConfirm={setIsConfirm}
          isConfirm={isConfirm}
        />
      )}
    </BrowserRouter>
  );
}
