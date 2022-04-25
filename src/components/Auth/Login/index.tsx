import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginStyled } from './styled';

const REQUIRED_TEXT = "Please fill in";

const LoginComponent = () => {
  const history = useHistory();
  const onFinish = (values: object) => {
    console.log('Received values of form: ', values);
  };
  return (
    <LoginStyled>
      <div className="login-container">
        <div className="logo">
          <img src="/login/facebookLogo.svg" className="logo-image" alt="" />
          <div className="logo-description">Facebook helps you connect and share with the people in your life.</div>
        </div>
        <div className="form-login">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              className="email"
              rules={[
                {
                  type: 'email',
                  message: 'Email không đúng định dạng'
                },
                {
                  required: true,
                  message: REQUIRED_TEXT
                }
              ]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              className="password"
              rules={[
                {
                  required: true,
                  message: REQUIRED_TEXT
                },
                {
                  min: 6,
                  message: 'Mật khẩu tối thiểu 6 kí tự'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
            <Form.Item className="forgot-pass">
              <Link className="login-form-forgot" to="">
                Quên mật khẩu
              </Link>
            </Form.Item>

            <Divider />

            <Form.Item>
              <Button type="default" className="register-button" onClick={() => history.push('/register')}>
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginStyled>
  );
};

LoginComponent.propTypes = {

};

export default LoginComponent;
