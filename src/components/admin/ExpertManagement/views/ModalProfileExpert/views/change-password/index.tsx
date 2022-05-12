import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import toastCustom from '../../../../../../../helpers/toastCustom';
import CHANGE_PASSWORD_CONSTANTS from './constant';
import { ChangePasswordExpertStyled } from './styled';

const ChangePasswordExpert = (props: any) => {
  const {
    previewExpert = {},
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    const bodyUpdatePassword = { ...values };
    delete bodyUpdatePassword.confirm_password;
    setLoading(true);
    console.log(previewExpert.id);

    // mutation.mutate(bodyUpdatePassword, {
    //   onSuccess: (res: any) => {
    //     if (res?.data?.statusCode === 201) {
    //       setLoading(false);
    //       toastCustom({
    //         mess: CHANGE_PASSWORD_CONSTANTS.message.success,
    //         type: "success",
    //       });
    //     }
    //   },
    //   onError: (err: any) => {
    //     console.log(err);
    //     setLoading(false);
    //     if (err?.response?.data?.statusCode === 500) {
    //       toastCustom({
    //         mess: CHANGE_PASSWORD_CONSTANTS.message.error.internalServer,
    //         type: "error",
    //       });
    //       return;
    //     }
    //     if (err?.response?.data?.statusCode === 400) {
    //       toastCustom({
    //         mess: err?.response?.data?.message,
    //         type: "error",
    //       });
    //       return;
    //     }
    //   }
    // })
  }

  return (
    <ChangePasswordExpertStyled>
      <Form
        form={form}
        className="change-password-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="new_password"
          className="newpassword"
          label={CHANGE_PASSWORD_CONSTANTS.label.newPass}
          rules={[
            {
              required: true,
              message: CHANGE_PASSWORD_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
            },
          ]}
        >
          <Input.Password
            placeholder={CHANGE_PASSWORD_CONSTANTS.label.newPass}
          />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          className="confirmpassword"
          label={CHANGE_PASSWORD_CONSTANTS.label.confirmPass}
          rules={[
            {
              required: true,
              message: CHANGE_PASSWORD_CONSTANTS.validate.required
            },
            {
              min: 6,
              message: CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error(CHANGE_PASSWORD_CONSTANTS.validate.verifyNewPass));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={CHANGE_PASSWORD_CONSTANTS.label.confirmPass}
          />
        </Form.Item>
      </Form>
      <div className="button-submit">
        <Button type="primary" onClick={form.submit}>{CHANGE_PASSWORD_CONSTANTS.submit}</Button>
      </div>
    </ChangePasswordExpertStyled>
  );
};

export default ChangePasswordExpert;