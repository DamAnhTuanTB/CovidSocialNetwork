import { Button, Form, Input } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { updatePasswordExpertByAdmin } from '../../../../../../../api/admin/expert-management';
import { updatePasswordExpert } from '../../../../../../../api/expert/profile';
import toastCustom from '../../../../../../../helpers/toastCustom';
import CHANGE_PASSWORD_CONSTANTS from './constant';
import { ChangePasswordExpertStyled } from './styled';

const ChangePasswordExpert = (props: any) => {
  const {
    previewExpert = {},
    isExpert = false,
    handleCancel = () => {},
  } = props;
  const [form] = Form.useForm();

  const mutation = useMutation(isExpert ? updatePasswordExpert : updatePasswordExpertByAdmin );

  const onFinish = (values: any) => {
    const bodyUpdatePassword = { ...values };
    delete bodyUpdatePassword.confirm_password;

    mutation.mutate(
      {
        ...bodyUpdatePassword,
        idExpert: previewExpert.id,
      },
      {
        onSuccess: (data: any) => {
          if (data?.statusCode === 201) {
            toastCustom({
              mess: CHANGE_PASSWORD_CONSTANTS.message.success,
              type: "success",
            });
            handleCancel();
          } 
        },
        onError: (err) => {
          toastCustom({
            mess: CHANGE_PASSWORD_CONSTANTS.message.error.internalServer,
            type: "error"
          })
        }
      }
    )

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
        {
          isExpert && (
            <Form.Item
              name="old_password"
              className="oldpassword"
              label={CHANGE_PASSWORD_CONSTANTS.label.currentPass}
              rules={[
                {
                  required: true,
                  message: CHANGE_PASSWORD_CONSTANTS.validate.required
                },
                {
                  min: 6,
                  message: CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
                }
              ]}
            >
              <Input.Password
                placeholder={CHANGE_PASSWORD_CONSTANTS.label.currentPass}
              />
            </Form.Item>
          )
        }
        <Form.Item
          name="new_password"
          className="newpassword"
          label={CHANGE_PASSWORD_CONSTANTS.label.newPass}
          rules={
            !isExpert ? [
              {
                required: true,
                message: CHANGE_PASSWORD_CONSTANTS.validate.required
              },
              {
                min: 6,
                message: CHANGE_PASSWORD_CONSTANTS.validate.passMinLength
              },
            ] : [
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
                  if (!value || getFieldValue('old_password') !== value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error(CHANGE_PASSWORD_CONSTANTS.validate.verifyOldPass));
                },
              }),
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