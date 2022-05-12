import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../../api/authentication';
import toastCustom from '../../../helpers/toastCustom';
import LOGIN_PATIENT_CONSTANTS from './constant';
import { LoginStyled } from './styled';

const LoginComponent = (props: any) => {
  const {
    isAdmin = false,
    isExpert = false,
  } = props;
  const history = useHistory();
  const mutation = useMutation(login);

  const onFinish = (values: object) => {
    if (isAdmin) {
      return;
    }
    if (isExpert) {
      return;
    }
    mutation.mutate(values, {
      onSuccess: (data) => {
        if (data?.data?.token) {
          Cookies.set('token', data?.data?.token);
          history.push('/post');
        }
      },
      onError: (err: any) => {
        const dataError = err?.response;
        if (dataError?.data?.statusCode === 401) {
          toastCustom({
            mess: LOGIN_PATIENT_CONSTANTS.errorMessage.errAccount,
            type: "error",
          })
        }
      }
    });
  };
  return (
    <LoginStyled isAdmin={isAdmin} isExpert={isExpert}>
      <div className="login-container">
        {
          !isAdmin && !isExpert && (
            <div className="logo">
              <img src="/login/facebookLogo.svg" className="logo-image" alt="" />
              <div className="logo-description">{LOGIN_PATIENT_CONSTANTS.slogan}</div>
            </div>
          )
        }
        <div className="form-login">
          {
            isAdmin && (
              <div className="title-admin">Đăng nhập ADMIN</div>
            )
          }
          {
            isExpert && (
              <div className="title-admin">Đăng nhập chuyên gia</div>
            )
          }
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              className="email"
              rules={[
                {
                  type: 'email',
                  message: LOGIN_PATIENT_CONSTANTS.validateMessage.email
                },
                {
                  required: true,
                  message: LOGIN_PATIENT_CONSTANTS.validateMessage.required
                }
              ]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={LOGIN_PATIENT_CONSTANTS.placeholder.email} />
            </Form.Item>
            <Form.Item
              name="password"
              className="password"
              rules={[
                {
                  required: true,
                  message: LOGIN_PATIENT_CONSTANTS.validateMessage.required
                },
                {
                  min: 6,
                  message: LOGIN_PATIENT_CONSTANTS.validateMessage.passwordMinLength
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={LOGIN_PATIENT_CONSTANTS.placeholder.password}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              {LOGIN_PATIENT_CONSTANTS.submit}
            </Button>

            {
              !isAdmin && !isExpert && (
                <>
                  <Form.Item className="forgot-pass">
                    <Link className="login-form-forgot" to="">
                      {LOGIN_PATIENT_CONSTANTS.forgotPass}
                    </Link>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button type="default" className="register-button" onClick={() => history.push('/register')}>
                      {LOGIN_PATIENT_CONSTANTS.register}
                    </Button>
                  </Form.Item>
                </>
              )
            }
          </Form>
        </div>
      </div>
    </LoginStyled>
  );
};

export default LoginComponent;
