// import getImagePath from '@helpers/get-image-path';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { signUp } from '../../../api/authentication';
import toastCustom from '../../../helpers/toastCustom';
import REGISTER_CONSTANTS from './constant';
import { RegisterStyled } from './styled';

const RegisterComponent = () => {
  const mutation = useMutation(signUp);
  const history = useHistory();

  const onFinish = (values: any) => {
    const bodyRegister = { ...values };
    delete bodyRegister.confirmPassword;
    bodyRegister.date_of_birth = bodyRegister.date_of_birth.format("YYYY-MM-DD");

    mutation.mutate(bodyRegister, {
      onSuccess: (data) => {
        if (data?.status === 201) {
          toastCustom({
            mess: REGISTER_CONSTANTS.successMessage,
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
          <img src="/logo_main.png" className="logo-image" alt="" />
          <div className="logo-description">{REGISTER_CONSTANTS.slogan}</div>
        </div>
        <div className="form-register">
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
                    message: REGISTER_CONSTANTS.validateMessage.required
                  }
                ]}
              >
                <Input placeholder={REGISTER_CONSTANTS.placeholder.firstName} />
              </Form.Item>
              <Form.Item
                name="last_name"
                className="lastName"
                rules={[
                  {
                    required: true,
                    message: REGISTER_CONSTANTS.validateMessage.required
                  }
                ]}
              >
                <Input
                  placeholder={REGISTER_CONSTANTS.placeholder.lastName}
                />
              </Form.Item>
            </Space>
            <Form.Item
              name="nick_name"
              className="nick-name"
              rules={[
                {
                  required: true,
                  message: REGISTER_CONSTANTS.validateMessage.required
                }
              ]}
            >
              <Input placeholder={REGISTER_CONSTANTS.placeholder.nickName} />
            </Form.Item>
            <Form.Item
              name="date_of_birth"
              rules={[
                {
                  required: true,
                  message: REGISTER_CONSTANTS.validateMessage.required
                }
              ]}
            >
              <DatePicker placeholder={REGISTER_CONSTANTS.placeholder.birthday} format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="email"
              className="Email"
              rules={[
                {
                  type: 'email',
                  message: REGISTER_CONSTANTS.validateMessage.email
                },
                {
                  required: true,
                  message: REGISTER_CONSTANTS.validateMessage.required
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
                  message: REGISTER_CONSTANTS.validateMessage.required
                },
                {
                  min: 6,
                  message: REGISTER_CONSTANTS.validateMessage.passwordMinLength
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
                  message: REGISTER_CONSTANTS.validateMessage.required
                },
                {
                  min: 6,
                  message: REGISTER_CONSTANTS.validateMessage.passwordMinLength
                },
                ({ getFieldValue }: any) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error(REGISTER_CONSTANTS.validateMessage.verifyPass));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={REGISTER_CONSTANTS.placeholder.confirmPass}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              {REGISTER_CONSTANTS.submit}
            </Button>
            <div>{REGISTER_CONSTANTS.prefixLogin}<Link to="/login">{REGISTER_CONSTANTS.login}</Link></div>
          </Form>
        </div>
      </div>
    </RegisterStyled>
  );
};

RegisterComponent.propTypes = {

};

export default RegisterComponent;
