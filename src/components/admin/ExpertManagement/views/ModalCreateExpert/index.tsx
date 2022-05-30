import { CameraOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Progress, Space } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createExpertAdmin } from '../../../../../api/admin/expert-management';
import { getUrlImage } from '../../../../../api/uploadimage';
import { disabledDateFromToday } from '../../../../../helpers/disableDateFromToday';
import toastCustom from '../../../../../helpers/toastCustom';
import MODAL_CREATE_EXPERT_CONSTANTS from './constants';
import { ModalCreateExpertStyled } from './styled';

const ModalCreateExpert = (props: any) => {
  const {
    isShowModalCreate = false,
    setIsShowModalCreate = () => { }
  } = props;
  const [form] = Form.useForm();
  const [prog, setProg] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const mutation = useMutation(createExpertAdmin);
  const queryClient = useQueryClient();

  const handleCancel = () => {
    if (prog) {
      return;
    }
    form.resetFields();
    setAvatar(null);
    setAvatarPreview("");
    setIsShowModalCreate(false);
  }

  const onSubmit = (values: any) => {
    if (prog) {
      return;
    }
    const bodyCreateExpert = { ...values };
    bodyCreateExpert.date_of_birth = bodyCreateExpert.date_of_birth.format("YYYY-MM-DD");
    delete bodyCreateExpert.repassword;
    if (avatar) {
      bodyCreateExpert.avatar = avatar;
    }

    mutation.mutate(
      bodyCreateExpert,
      {
        onSuccess: (data) => {
          toastCustom({
            mess: MODAL_CREATE_EXPERT_CONSTANTS.message.success,
            type: "success",
          })
          queryClient.invalidateQueries("admin-all-experts");
          handleCancel();
        },
        onError: (err: any) => {
          const dataErr = err?.response;
          if (dataErr?.data?.statusCode === 400) {
            toastCustom({
              mess: MODAL_CREATE_EXPERT_CONSTANTS.message.errorEmailExist,
              type: "error",
            })
          }
        }
      }
    )

  }

  const handleChangeAvatar = (e: any) => {
    setProg(1);
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setAvatarPreview(fileUrl);
    getUrlImage(
      file,
      setProg,
      (url) => {
        setAvatar(url);
        setProg(0);
      }
    )
  }

  return (
    <ModalCreateExpertStyled
      title="Tạo tài khoản chuyên gia"
      centered
      visible={isShowModalCreate}
      onCancel={handleCancel}
      onOk={form.submit}
      width={600}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.cancel}
        </Button>,
        <Button key="submit" type="primary" disabled={!!prog} onClick={form.submit}>
          {MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.submit}
        </Button>,
      ]}
    >
      <div className='avatar'>
        <div className='formedit-avatar'>
          {/* <BaseImagePreview className="avatar" isLoading cancelPreview src={avatarPreview ? avatarPreview : "defaultAvatar.png"} alt="" /> */}
          <img className="avatar-edit" src={avatarPreview ? avatarPreview : "/defaultAvatar.png"} alt=""></img>
          <span className='button-file'>
            <input onChange={handleChangeAvatar} title={''} type='file' accept="image/*" className="input-file" />
            <CameraOutlined className="camera-icon" />
          </span>
          {
            prog > 0 && (
              <div className="loading-view">
                <Progress className="loading" type='circle' width={50} percent={prog} />
              </div>
            )
          }
        </div>
      </div>
      <Form
        form={form}
        name="normal_register"
        className="update-profile-form"
        layout="vertical"
        initialValues={{}}
        onFinish={onSubmit}
      >
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="first_name"
            className="firstName"

            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.firstName}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <Input placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.firstName} />
          </Form.Item>
          <Form.Item
            name="last_name"
            className="lastName"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.lastName}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <Input

              placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.lastName}
            />
          </Form.Item>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="nick_name"
            className="nickname"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.nickName}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              },
            ]}
          >
            <Input

              placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.nickName}
            />
          </Form.Item>
          <Form.Item
            name="email"
            className="Email"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.email}
            rules={[
              {
                type: 'email',
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.email
              },
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <Input placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.email} />
          </Form.Item>


        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="date_of_birth"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.birthday}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <DatePicker disabledDate={disabledDateFromToday} placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.birthday} format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="telephone"
            className="phone"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.phone}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              },
              {
                pattern: new RegExp(MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.regexPhone),
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.phone
              }
            ]}
          >
            <Input

              placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.phone}
            />
          </Form.Item>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="password"
            className="password"

            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.password}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              },
              {
                min: 6,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.minLength,
              }
            ]}
          >
            <Input.Password placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.password} />
          </Form.Item>
          <Form.Item
            name="repassword"
            className="repassword"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.repassword}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              },
              {
                min: 6,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.minLength,
              },
              ({ getFieldValue }: any) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error(MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.verifyPass));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.repassword}
            />
          </Form.Item>
        </Space>
      </Form>
    </ModalCreateExpertStyled>
  );
};

export default ModalCreateExpert;