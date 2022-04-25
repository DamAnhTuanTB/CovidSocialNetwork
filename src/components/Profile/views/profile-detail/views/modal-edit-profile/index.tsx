// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { CameraOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Progress, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ModalEditProfileStyled } from './styled';
import { getUrlImage } from '../../../../../../api/uploadimage';
const REQUIRED_TEXT = "Vui lòng điền";
const REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const ModalEditProfile = (props: any) => {
  const {
    isShowModalEditProfile,
    setIsShowModalEditProfile = () => { },
    handleConfirmEditProfile = () => { }
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [prog, setProg] = useState(0);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const onFinish = (values: any) => {
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
    <Button key="submit" type="primary" loading={loading} onClick={form.submit}>
      Ok
    </Button>,
  ]

  const handleChangeAvatar = (e: any) => {
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
    setInitialValues({
      firstName: "tuan"
    })
  }, [])

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
            name="firstName"
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
            name="lastName"
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
            name="nickName"
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
            name="birthday"
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
          name="Email"
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
          name="phone"
          className="phone"
          label="Số điện thoại"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || REGEX_PHONE.test(value)) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Số điện thoại không đúng định dạng'));
              },
            }),
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