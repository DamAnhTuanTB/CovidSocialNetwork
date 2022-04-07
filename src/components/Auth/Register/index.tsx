// import getImagePath from '@helpers/get-image-path';
import { Button, DatePicker, Form, Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterStyled } from './styled';

const REQUIRED_TEXT = "Please fill in";

const RegisterComponent = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const onFinish = (values: { birthday: { toDate: () => number; }; }) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = values.birthday?.toDate() - new Date().valueOf();
    const age = Math.round(diffInTime / oneDay);
    console.log(123123123, age);
    
    // if (age < 24)
  };
  const onValuesChange = (values: { role: string; }) => {
    console.log(123123, values);
    if (values?.role === "1") {
      setIsDoctor(false);
    } else if (values?.role === "2") {
      setIsDoctor(true);
    }
  };
  return (
    <RegisterStyled>
      <div className="register-container">
        <div className="logo">
          <img src="/login/facebookLogo.svg" className="logo-image" alt="" />
          <div className="logo-description">Facebook helps you connect and share with the people in your life.</div>
        </div>
        <div className="form-register">
          <div className="title">Sign up</div>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
          >
            <Space>
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
                <Input placeholder="First Name" />
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
                  placeholder="Last Name"
                />
              </Form.Item>
            </Space>
            <Form.Item
              name="birthday"
              rules={[
                {
                  required: true,
                  message: 'Please select your date of birth'
                }
              ]}
            >
              <DatePicker placeholder="Date of birth" format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item name="role">
              <Radio.Group defaultValue="1">
                <Radio value="1">Guest</Radio>
                <Radio value="2">Doctor</Radio>
              </Radio.Group>
            </Form.Item>
            {
              isDoctor && (
                <Form.Item
                  name="idDoctor"
                  className="idDoctor"
                  rules={[
                    {
                      required: isDoctor,
                      message: REQUIRED_TEXT
                    }
                  ]}
                >
                  <Input placeholder="Mã bác sĩ" />
                </Form.Item>
              )
            }
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
              <Input
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Đăng kí
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
