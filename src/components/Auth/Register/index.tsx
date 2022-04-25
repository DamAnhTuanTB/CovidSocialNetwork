// import getImagePath from '@helpers/get-image-path';
import { Button, DatePicker, Form, Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterStyled } from './styled';

const REQUIRED_TEXT = "Vui lòng điền";

const RegisterComponent = () => {
  const onFinish = (values: { birthday: { toDate: () => number; }; }) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = values.birthday?.toDate() - new Date().valueOf();
    const age = Math.round(diffInTime / oneDay);
    console.log(123123123, age);
    
    // if (age < 24)
  };
  const onValuesChange = (values: { role: string; }) => {
  };
  return (
    <RegisterStyled>
      <div className="register-container">
        <div className="logo">
          <img src="/login/facebookLogo.svg" className="logo-image" alt="" />
          <div className="logo-description">Facebook helps you connect and share with the people in your life.</div>
        </div>
        <div className="form-register">
          <div className="title">Đăng ký</div>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
          >
            <Space className="ant-space-align-start">
              <Form.Item
                name="firstName"
                className="firstName"
                rules={[
                  {
                    required: true,
                    message: REQUIRED_TEXT
                  }
                ]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
              <Form.Item
                name="lastName"
                className="lastName"
                rules={[
                  {
                    required: true,
                    message: REQUIRED_TEXT
                  }
                ]}
              >
                <Input
                  placeholder="Họ"
                />
              </Form.Item>
            </Space>
            <Form.Item
              name="nickName"
              className="nick-name"
              rules={[
                {
                  required: true,
                  message: REQUIRED_TEXT
                }
              ]}
            >
              <Input placeholder="Biệt danh" />
            </Form.Item>
            <Form.Item
              name="birthday"
              rules={[
                {
                  required: true,
                  message: REQUIRED_TEXT
                }
              ]}
            >
              <DatePicker placeholder="Ngày sinh" format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="Email"
              className="Email"
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
              <Input placeholder="Email" />
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
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              className="confirm-password"
              rules={[
                {
                  required: true,
                  message: REQUIRED_TEXT
                },
                {
                  min: 6,
                  message: 'Mật khẩu tối thiểu 6 kí tự'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
      
                    return Promise.reject(new Error('Mật khẩu không giống nhau'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Đăng ký
            </Button>
            <div>Bạn đã có tài khoản <Link to="/login">Đăng nhập</Link></div>
          </Form>
        </div>
      </div>
    </RegisterStyled>
  );
};

RegisterComponent.propTypes = {

};

export default RegisterComponent;
