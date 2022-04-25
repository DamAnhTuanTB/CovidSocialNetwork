import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ModalChangePasswordStyled } from './styled';

const ModalChangePassword = (props: any) => {
  const {
    isShowModalChangePassword,
    setIsShowModalChangePassword = () => { },
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsShowModalChangePassword(false)
    form.resetFields();
  }

  const onFinish = (value: any) => {
    console.log(123123,value);
    
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setIsShowModalChangePassword(false);
    // }, 2000)
  }

  const footerEdit = [
    <Button key="back" onClick={handleCancel}>
      Hủy
    </Button>,
    <Button key="submit"type="primary" loading={loading} onClick={form.submit}>
      Ok
    </Button>,
  ]

  return (
    <ModalChangePasswordStyled
      title="Đổi mật khẩu"
      centered
      visible={isShowModalChangePassword}
      onCancel={handleCancel}
      onOk={form.submit}
      footer={footerEdit}
      width={500}
    >
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldpassword"
          className="oldpassword"
          label="Mật khẩu hiện tại"
          rules={[
            {
              required: true,
              message: "Vui lòng điền"
            },
            {
              min: 6,
              message: 'Mật khẩu tối thiểu 6 kí tự'
            }
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu hiện tại"
          />
        </Form.Item>
        <Form.Item
          name="newpassword"
          className="newpassword"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng điền"
            },
            {
              min: 6,
              message: 'Mật khẩu tối thiểu 6 kí tự'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('oldpassword') !== value) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu cũ'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu mới"
          />
        </Form.Item>
        <Form.Item
          name="confirmpassword"
          className="confirmpassword"
          label="Nhập lại mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng điền"
            },
            {
              min: 6,
              message: 'Mật khẩu tối thiểu 6 kí tự'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newpassword') === value) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error('Mật khẩu không giống nhau'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="nhập lại mật khẩu mới"
          />
        </Form.Item>
      </Form>
    </ModalChangePasswordStyled>
  );
};

ModalChangePassword.propTypes = {

};

export default ModalChangePassword;