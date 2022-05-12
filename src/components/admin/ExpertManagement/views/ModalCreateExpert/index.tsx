import { CameraOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Progress, Space } from 'antd';
import React, { useState } from 'react';
import { getUrlImage } from '../../../../../api/uploadimage';
import MODAL_CREATE_EXPERT_CONSTANTS from './constants';
import { ModalCreateExpertStyled } from './styled';

const ModalCreateExpert = (props: any) => {
  const {
    isShowModalCreate = false,
    setIsShowModalCreate = () => { }
  } = props;
  const [form] = Form.useForm();
  const [prog, setProg] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleCancel = () => {
    form.resetFields();
    setIsShowModalCreate(false);
  }

  const onSubmit = (values: any) => {
    console.log(values);
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
      title="tạo tài khoản chuyên gia"
      centered
      visible={isShowModalCreate}
      onCancel={handleCancel}
      onOk={form.submit}
      width={600}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.cancel}
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          {MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.submit}
        </Button>,
      ]}
    >
      <div className='avatar'>
        <div className='formedit-avatar'>
          {/* <BaseImagePreview className="avatar" isLoading cancelPreview src={avatarPreview ? avatarPreview : "defaultAvatar.png"} alt="" /> */}
          <img className="avatar-edit" src={avatarPreview ? avatarPreview : "/defaultAvatar.png"} alt=""></img>
          <span className='button-file'>
            <input onChange={handleChangeAvatar} title={''} type='file' className="input-file" />
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
        initialValues={initialValues}
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
            name="date_of_birth"
            label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.birthday}
            rules={[
              {
                required: true,
                message: MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <DatePicker placeholder={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.birthday} format="DD-MM-YYYY" />
          </Form.Item>

        </Space>
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
        <Form.Item
          name="telephone"
          className="phone"
          label={MODAL_CREATE_EXPERT_CONSTANTS.modalEditConstant.placeholder.phone}
          rules={[
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
      </Form>
    </ModalCreateExpertStyled>
  );
};

export default ModalCreateExpert;