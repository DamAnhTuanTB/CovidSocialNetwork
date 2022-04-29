// import getImagePath from '@helpers/get-image-path';
import { Button, DatePicker, Form, Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { signUp } from '../../../api/authentication';
import toastCustom from '../../../helpers/toastCustom';
import { RegisterStyled } from './styled';

const REQUIRED_TEXT = "Vui lòng điền";

const RegisterComponent = () => {
  const mutation = useMutation(signUp);
  const history = useHistory();

  const onFinish = (values: any) => {
    const bodyRegister = { ...values };
    delete bodyRegister.confirmPassword;
    bodyRegister.date_of_birth = bodyRegister.date_of_birth.format("YYYY/MM/DD");

    mutation.mutate(bodyRegister, {
      onSuccess: (data) => {
        if (data?.status === 201) {
          toastCustom({
            mess: "Đăng kí thành công",
            type: "success",
          })
          setTimeout(() => {
            history.push("/login");
          }, 200)
        }
      },
      onError: (err: any) => {
        const dataErr = err?.response;
        if (dataErr?.data?.statusCode === 400) {
          toastCustom({
            mess: dataErr?.data?.message,
            type: "error",
          })
        }
      }
    });
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
            initialValues={{}}
            onFinish={onFinish}
          >
            <Space className="ant-space-align-start">
              <Form.Item
                name="first_name"
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
                name="last_name"
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
              name="nick_name"
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
              name="date_of_birth"
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
              name="email"
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
                ({ getFieldValue }: any) => ({
                  validator(_: any, value: any) {
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
