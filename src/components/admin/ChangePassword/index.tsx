import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useMutation } from 'react-query';
import { updatePasswordAdmin } from '../../../api/admin/profile';
import toastCustom from '../../../helpers/toastCustom';
import CHANGE_PASSWORD_ADMIN_CONSTANTS from './constants';
import { ChangePasswordStyled } from './styled';

const ChangePasswordAdmin = (props: any) => {
  const [form] = useForm();
  const mutation = useMutation(updatePasswordAdmin);
  const onFinish = (values: any) => {
    const bodyUpdatePassword = {...values};
    delete bodyUpdatePassword.confirm_password;
    mutation.mutate(bodyUpdatePassword, {
      onSuccess: (res: any) => {
        if (res?.data?.statusCode === 201) {
          toastCustom({
            mess: CHANGE_PASSWORD_ADMIN_CONSTANTS.message.success,
            type: "success",
          });
        }
        form.resetFields();
      },
      onError: (err: any) => {
        console.log(err);
        if (err?.response?.data?.statusCode === 500) {
          toastCustom({
            mess: CHANGE_PASSWORD_ADMIN_CONSTANTS.message.error.internalServer,
            type: "error",
          });
          return;
        }
        if (err?.response?.data?.statusCode === 400) {
          toastCustom({
            mess: err?.response?.data?.message,
            type: "error",
          });
          return;
        }
      }
    })
  }
  return (
    <ChangePasswordStyled>
      <div className="title">{CHANGE_PASSWORD_ADMIN_CONSTANTS.title}</div>
      <Form
        form={form}
        className="change-password-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="old_password"
          className="oldpassword"
          // label={CHANGE_PASSWORD_ADMIN_CONSTANTS.label.currentPass}
          rules={[
            {
              required: true,
              message: CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.passMinLength
            }
          ]}
        >
          <Input.Password
            placeholder={CHANGE_PASSWORD_ADMIN_CONSTANTS.label.currentPass}
          />
        </Form.Item>
        <Form.Item
          name="new_password"
          className="newpassword"
          // label={CHANGE_PASSWORD_ADMIN_CONSTANTS.label.newPass}
          rules={[
            {
              required: true,
              message: CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.passMinLength
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('old_password') !== value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error(CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.verifyOldPass));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={CHANGE_PASSWORD_ADMIN_CONSTANTS.label.newPass}
          />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          className="confirmpassword"
          // label={CHANGE_PASSWORD_ADMIN_CONSTANTS.label.confirmPass}
          rules={[
            {
              required: true,
              message: CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.passMinLength
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error(CHANGE_PASSWORD_ADMIN_CONSTANTS.validate.verifyNewPass));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={CHANGE_PASSWORD_ADMIN_CONSTANTS.label.confirmPass}
          />
        </Form.Item>
        <Button type="primary" className="button-submit" onClick={form.submit}>{CHANGE_PASSWORD_ADMIN_CONSTANTS.submit}</Button>
      </Form>
    </ChangePasswordStyled>
  );
};

export default ChangePasswordAdmin;