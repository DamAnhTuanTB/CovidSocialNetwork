import { Form, Input, Skeleton, Space } from 'antd';
import React, { useState } from 'react';
import BaseImagePreview from '../../../../Base/BaseImagePreview';
import LoadingImage from '../../../../Base/LoadingImage';
import { ModalProfileGuestStyled } from './styled';

const ModalProfileGuest = (props: any) => {
  const {
    previewGuest = {},
    setPreviewGuest = () => { }
  } = props;

  const handleCancel = () => {
    setPreviewGuest(null);
  }

  return (
    <ModalProfileGuestStyled
      title="Thông tin cá nhân"
      centered
      visible={!!previewGuest}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className='avatar'>
        <BaseImagePreview
          className="avatar-image"
          classNameLoading="loading-image"
          src={previewGuest?.avatar ? previewGuest?.avatar : "/post/avatar_my1.jpg"}
          isLoading
          alt=""
        />
      </div>
      <Form
        name="normal_register"
        className="update-profile-form"
        layout="vertical"
      >
        <Space className="ant-space-align-start fullwitdh">
          <div className="info-item first-name">
            <div className="label">Tên</div>
            <div className="value">{previewGuest?.first_name}</div>
          </div>
          <div className="info-item last-name">
            <div className="label">Họ</div>
            <div className="value">{previewGuest?.last_name}</div>
          </div>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <div className="info-item nick-name">
            <div className="label">Biệt danh</div>
            <div className="value">{previewGuest?.nick_name}</div>
          </div>
          <div className="info-item birthday">
            <div className="label">Ngày sinh</div>
            <div className="value">{previewGuest?.birthday}</div>
          </div>
        </Space>
        <div className="info-item email">
          <div className="label">Email</div>
          <div className="value">{previewGuest?.email}</div>
        </div>
        <div className="info-item phone">
          <div className="label">Số điện thoại</div>
          <div className="value">{previewGuest?.phone}</div>
        </div>
      </Form>
    </ModalProfileGuestStyled>
  );
};

export default ModalProfileGuest;