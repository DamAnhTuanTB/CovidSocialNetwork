// @ts-nocheck
import { CameraOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Progress, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateProfile } from '../../../../../../api/profile';
import { getUrlImage } from '../../../../../../api/uploadimage';
import toastCustom from '../../../../../../helpers/toastCustom';
import MODAL_EDIT_PROFILE_CONSTANTS from './constants';
import { ModalEditProfileStyled } from './styled';


const ModalEditProfile = (props: any) => {
  const {
    profile = {},
    isShowModalEditProfile,
    setIsShowModalEditProfile = () => { },
    handleConfirmEditProfile = () => { }
  } = props;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [prog, setProg] = useState(0);
  const [avatar, setAvatar] = useState(profile?.avatar || null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || null);

  const mutation = useMutation(updateProfile);


  const onFinish = (values: any) => {
    setLoading(true);
    const bodyUpdateProfile = { ...values };
    bodyUpdateProfile.date_of_birth = bodyUpdateProfile.date_of_birth.format("YYYY/MM/DD");
    bodyUpdateProfile.avatar = avatar;



    mutation.mutate(bodyUpdateProfile, {
      onSuccess: (res: any) => {
        if (res?.data?.statusCode === 200) {
          setLoading(false);
          toastCustom({
            mess: res?.data?.message,
            type: "success",
          });
          queryClient.setQueryData("my-profile", (oldData) => {
            return {
              ...oldData,
              ...bodyUpdateProfile
            }
          });
          queryClient.invalidateQueries('profile');
          handleCancel();
        }
      },
      onError: (err: any) => {
        setLoading(false);
        if (err?.response?.data?.statusCode === 500) {
          toastCustom({
            mess: MODAL_EDIT_PROFILE_CONSTANTS.message.error.internalServer,
            type: "error",
          });
        } 
      }
    })
  }

  const handleCancel = () => {
    setIsShowModalEditProfile(false);
    form.resetFields();
    setAvatar(undefined);
    setAvatarPreview(undefined);
  }

  const footerEdit = [
    <Button key="back" onClick={handleCancel}>
      {MODAL_EDIT_PROFILE_CONSTANTS.cancel}
    </Button>,
    <Button disabled={!!prog} key="submit" type="primary" loading={loading} onClick={form.submit}>
      {MODAL_EDIT_PROFILE_CONSTANTS.submit}
    </Button>,
  ]

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

  useEffect(() => {
    const cloneProfile = { ...profile };
    cloneProfile.date_of_birth = moment(cloneProfile.date_of_birth, "YYYY/MM/DD");

    setInitialValues(cloneProfile);
    setAvatar(profile?.avatar);
    setAvatarPreview(profile?.avatar);
  }, [isShowModalEditProfile])

  return (
    <ModalEditProfileStyled
      title={MODAL_EDIT_PROFILE_CONSTANTS.title}
      centered
      visible={isShowModalEditProfile}
      onCancel={handleCancel}
      onOk={form.submit}
      footer={footerEdit}
    >
      <div className='formedit-avatar'>
        <img src={avatarPreview ? avatarPreview : "/post/avatar_my1.jpg"} alt=""></img>
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
      <Form
        form={form}
        className="update-profile-form"
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
      >
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="first_name"
            className="firstName"
            label={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.firstName}
            rules={[
              {
                required: true,
                message: MODAL_EDIT_PROFILE_CONSTANTS.validate.required
              }
            ]}
          >
            <Input placeholder={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.firstName} />
          </Form.Item>
          <Form.Item
            name="last_name"
            className="lastName"
            label={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.lastName}
            rules={[
              {
                required: true,
                message: MODAL_EDIT_PROFILE_CONSTANTS.validate.required
              }
            ]}
          >
            <Input
              placeholder={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.lastName}
            />
          </Form.Item>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="nick_name"
            className="nickname"
            label={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.nickName}
            rules={[
              {
                required: true,
                message: MODAL_EDIT_PROFILE_CONSTANTS.validate.required
              },
            ]}
          >
            <Input
              placeholder={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.nickName}
            />
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            label={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.birthday}
            rules={[
              {
                required: true,
                message: MODAL_EDIT_PROFILE_CONSTANTS.validate.required
              }
            ]}
          >
            <DatePicker placeholder={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.birthday} format="DD-MM-YYYY" />
          </Form.Item>

        </Space>
        <Form.Item
          name="email"
          className="Email"
          label={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.email}
          rules={[
            {
              type: 'email',
              message: MODAL_EDIT_PROFILE_CONSTANTS.validate.email
            },
            {
              required: true,
              message: MODAL_EDIT_PROFILE_CONSTANTS.validate.required
            }
          ]}
        >
          <Input placeholder={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.email} />
        </Form.Item>
        <Form.Item
          name="telephone"
          className="phone"
          label={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.phone}
          rules={[
            {
              pattern: new RegExp(MODAL_EDIT_PROFILE_CONSTANTS.regexPhone),
              message: MODAL_EDIT_PROFILE_CONSTANTS.validate.phone
            }
          ]}
        >
          <Input
            placeholder={MODAL_EDIT_PROFILE_CONSTANTS.placeholder.phone}
          />
        </Form.Item>
      </Form>
    </ModalEditProfileStyled>
  );
};

ModalEditProfile.propTypes = {

};

export default ModalEditProfile;