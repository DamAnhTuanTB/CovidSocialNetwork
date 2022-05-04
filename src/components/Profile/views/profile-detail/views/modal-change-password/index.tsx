import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { updatePassword } from '../../../../../../api/profile';
import toastCustom from '../../../../../../helpers/toastCustom';
import MODAL_CHANGE_PASSWORD_CONSTANTS from './constants';
import { ModalChangePasswordStyled } from './styled';

const ModalChangePassword = (props: any) => {
  const {
    isShowModalChangePassword,
    setIsShowModalChangePassword = () => { },
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(updatePassword);

  const handleCancel = () => {
    setIsShowModalChangePassword(false)
    form.resetFields();
  }

  const onFinish = (values: any) => {
    const bodyUpdatePassword = {...values};
    delete bodyUpdatePassword.confirm_password;
    setLoading(true);    
    mutation.mutate(bodyUpdatePassword, {
      onSuccess: (res: any) => {
        if (res?.data?.statusCode === 201) {
          setLoading(false);
          toastCustom({
            mess: MODAL_CHANGE_PASSWORD_CONSTANTS.message.success,
            type: "success",
          });
          handleCancel();
        }
      },
      onError: (err: any) => {
        console.log(err);
        setLoading(false);
        if (err?.response?.data?.statusCode === 500) {
          toastCustom({
            mess: MODAL_CHANGE_PASSWORD_CONSTANTS.message.error.internalServer,
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

  const footerEdit = [
    <Button key="back" onClick={handleCancel}>
      {MODAL_CHANGE_PASSWORD_CONSTANTS.cancel}
    </Button>,
    <Button key="submit"type="primary" loading={loading} onClick={form.submit}>
      {MODAL_CHANGE_PASSWORD_CONSTANTS.submit}
    </Button>,
  ]

  return (
    <ModalChangePasswordStyled
      title={MODAL_CHANGE_PASSWORD_CONSTANTS.title}
      centered
      visible={isShowModalChangePassword}
      onCancel={handleCancel}
      onOk={form.submit}
      footer={footerEdit}
      width={500}
    >
      <Form
        form={form}
        className="change-password-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="old_password"
          className="oldpassword"
          label={MODAL_CHANGE_PASSWORD_CONSTANTS.label.currentPass}
          rules={[
            {
              required: true,
              message: MODAL_CHANGE_PASSWORD_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: MODAL_CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
            }
          ]}
        >
          <Input.Password
            placeholder={MODAL_CHANGE_PASSWORD_CONSTANTS.label.currentPass}
          />
        </Form.Item>
        <Form.Item
          name="new_password"
          className="newpassword"
          label={MODAL_CHANGE_PASSWORD_CONSTANTS.label.newPass}
          rules={[
            {
              required: true,
              message: MODAL_CHANGE_PASSWORD_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: MODAL_CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('old_password') !== value) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error(MODAL_CHANGE_PASSWORD_CONSTANTS.validate.verifyOldPass));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={MODAL_CHANGE_PASSWORD_CONSTANTS.label.newPass}
          />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          className="confirmpassword"
          label={MODAL_CHANGE_PASSWORD_CONSTANTS.label.confirmPass}
          rules={[
            {
              required: true,
              message: MODAL_CHANGE_PASSWORD_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: MODAL_CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error(MODAL_CHANGE_PASSWORD_CONSTANTS.validate.verifyNewPass));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={MODAL_CHANGE_PASSWORD_CONSTANTS.label.confirmPass}
          />
        </Form.Item>
      </Form>
    </ModalChangePasswordStyled>
  );
};

ModalChangePassword.propTypes = {

};

export default ModalChangePassword;