// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { CameraOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Progress, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ModalEditProfileStyled } from './styled';
import { getUrlImage } from '../../../../../../api/uploadimage';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { updateProfile } from '../../../../../../api/profile';
import toastCustom from '../../../../../../helpers/toastCustom';

const REQUIRED_TEXT = "Vui lòng điền";
const REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

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
            mess: "Lỗi hệ thống",
            type: "error",
          });
        } 
      }
    })

    // handleConfirmEditProfile(formdata);
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setIsShowModalEditProfile(false);
    // }, 2000)
  }

  const handleCancel = () => {
    setIsShowModalEditProfile(false);
    form.resetFields();
    setAvatar(undefined);
    setAvatarPreview(undefined);
  }

  const footerEdit = [
    <Button key="back" onClick={handleCancel}>
      Hủy
    </Button>,
    <Button disabled={!!prog} key="submit" type="primary" loading={loading} onClick={form.submit}>
      Ok
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
      title="Chỉnh sửa thông tin cá nhân"
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
        name="normal_register"
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
            label="Tên"
            rules={[
              {
                required: true,
                message: REQUIRED_TEXT
              }
            ]}
          >
            <Input placeholder="Tên" />
          </Form.Item>
          <Form.Item
            name="last_name"
            className="lastName"
            label="Họ"
            rules={[
              {
                required: true,
                message: REQUIRED_TEXT
              }
            ]}
          >
            <Input
              placeholder="Họ"
            />
          </Form.Item>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <Form.Item
            name="nick_name"
            className="nickname"
            label="Biệt danh"
            rules={[
              {
                required: true,
                message: REQUIRED_TEXT
              },
            ]}
          >
            <Input
              placeholder="Biệt danh"
            />
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            label="Ngày sinh"
            rules={[
              {
                required: true,
                message: REQUIRED_TEXT
              }
            ]}
          >
            <DatePicker placeholder="Ngày sinh" format="DD-MM-YYYY" />
          </Form.Item>

        </Space>
        <Form.Item
          name="email"
          className="Email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Email không đúng định dạng'
            },
            {
              required: true,
              message: REQUIRED_TEXT
            }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="telephone"
          className="phone"
          label="Số điện thoại"
          rules={[
            {
              pattern: new RegExp(REGEX_PHONE),
              message: "Số điện thoại không đúng định dạng"
            }
          ]}
        >
          <Input
            placeholder="Số điện thoại"
          />
        </Form.Item>
      </Form>
    </ModalEditProfileStyled>
  );
};

ModalEditProfile.propTypes = {

};

export default ModalEditProfile;