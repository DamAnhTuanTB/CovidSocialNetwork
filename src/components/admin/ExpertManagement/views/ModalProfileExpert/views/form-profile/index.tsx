import { CameraOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Progress, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateExpert } from '../../../../../../../api/admin/expert-management';
import { getUrlImage } from '../../../../../../../api/uploadimage';
import toastCustom from '../../../../../../../helpers/toastCustom';
import BaseImagePreview from '../../../../../../Base/BaseImagePreview';
import MODAL_PROFILE_EXPERT_CONSTANTS from '../../constants';
import { FormProfileStyled } from './styled';

const FormProfile = (props: any) => {
  const {
    previewExpert = {},
    isEditProfile = false,
    setIsEditProfile = () => { },
    form,
    handleCancel = () => { },
    isExpert = false,
  } = props;

  // const [form] = Form.useForm();
  const [prog, setProg] = useState(0);
  const [initialValues, setInitialValues] = useState({});
  const [avatar, setAvatar] = useState(previewExpert?.avatar || null);
  const [avatarPreview, setAvatarPreview] = useState(previewExpert?.avatar || null);

  const queryClient = useQueryClient();
  const mutation = useMutation(updateExpert);

  const handleCancelEdit = () => {
    form.setFieldsValue(initialValues);
    setIsEditProfile(false);
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

  const onFinish = (values: any) => {
    if (prog) {
      return;
    }
    const bodyUpdateExpert = { ...values };
    bodyUpdateExpert.date_of_birth = bodyUpdateExpert.date_of_birth.format("YYYY-MM-DD");
    if (avatar) {
      bodyUpdateExpert.avatar = avatar;
    }

    mutation.mutate({
      ...bodyUpdateExpert,
      idExpert: previewExpert?.id
    }, {
      onSuccess: (data) => {
        if (data?.statusCode === 200) {
          queryClient.invalidateQueries("admin-all-experts");
          handleCancel();
          toastCustom({
            mess: "Thay đổi thông tin thành công",
            type: "success",
          })
        }
      }
    })

  }

  useEffect(() => {
    const cloneProfile = { ...previewExpert };

    cloneProfile.date_of_birth = moment(cloneProfile.date_of_birth, "YYYY-MM-DD");

    setInitialValues(cloneProfile);

    setAvatar(previewExpert?.avatar);
    setAvatarPreview(previewExpert?.avatar);
  }, [previewExpert])

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues])

  return (
    <FormProfileStyled isEditProfile={isEditProfile}>
      <div className='avatar'>
        {
          isEditProfile ? (
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
          ) : (
            <BaseImagePreview
              className="avatar-image"
              classNameLoading="loading-image"
              src={previewExpert?.avatar ? previewExpert?.avatar : "/defaultAvatar.png"}
              isLoading
              alt=""
            />
          )
        }
      </div>
      <Form
        form={form}
        name="normal_register"
        className="update-profile-form"
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="first_name"
            className="firstName"

            label={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.firstName}
            rules={[
              {
                required: true,
                message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <Input disabled={!isEditProfile} placeholder={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.firstName} />
          </Form.Item>
          <Form.Item
            name="last_name"
            className="lastName"
            label={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.lastName}
            rules={[
              {
                required: true,
                message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <Input
              disabled={!isEditProfile}
              placeholder={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.lastName}
            />
          </Form.Item>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="nick_name"
            className="nickname"
            label={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.nickName}
            rules={[
              {
                required: true,
                message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              },
            ]}
          >
            <Input
              disabled={!isEditProfile}
              placeholder={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.nickName}
            />
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            label={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.birthday}
            rules={[
              {
                required: true,
                message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.required
              }
            ]}
          >
            <DatePicker disabled={!isEditProfile} placeholder={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.birthday} format="DD-MM-YYYY" />
          </Form.Item>

        </Space>
        <Form.Item
          name="email"
          className="Email"
          label={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.email}
          rules={[
            {
              type: 'email',
              message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.email
            },
            {
              required: true,
              message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.required
            }
          ]}
        >
          <Input disabled={!isEditProfile} placeholder={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.email} />
        </Form.Item>
        <Form.Item
          name="telephone"
          className="phone"
          label={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.phone}
          rules={[
            {
              pattern: new RegExp(MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.regexPhone),
              message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.phone
            },
            {
              required: true,
              message: MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.validate.required
            }
          ]}
        >
          <Input
            disabled={!isEditProfile}
            placeholder={MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.placeholder.phone}
          />
        </Form.Item>
      </Form>

      {
        !isExpert && (
          <div className="list-button-profile">
            {
              !isEditProfile ? (
                <Button type='primary' onClick={() => setIsEditProfile(true)}>{MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.edit}</Button>
              ) : (
                <Space>
                  <Button type='default' onClick={handleCancelEdit}>{MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.cancel}</Button>
                  <Button type='primary' onClick={form.submit}>{MODAL_PROFILE_EXPERT_CONSTANTS.modalEditConstant.submit}</Button>
                </Space>
              )
            }
          </div>
        )
      }

    </FormProfileStyled>
  );
};

export default FormProfile;