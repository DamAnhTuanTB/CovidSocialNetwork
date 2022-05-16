import { Form, Space } from 'antd';
import React from 'react';
import { handleConvertDateStringToDate } from '../../../../../helpers/convertDateStringToDate';
import BaseImagePreview from '../../../../Base/BaseImagePreview';
import MODAL_PROFILE_CONSTANTS from './constants';
import { ModalProfileGuestStyled } from './styled';

const TITLE_MODAL = "Thông tin cá nhân";

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
      title={TITLE_MODAL}
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
          src={previewGuest?.avatar ? previewGuest?.avatar : "/defaultAvatar.png"}
          isLoading
          cancelPreview={!previewGuest?.avatar}
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
            <div className="label">{MODAL_PROFILE_CONSTANTS.label.firstName}</div>
            <div className="value">{previewGuest?.first_name}</div>
          </div>
          <div className="info-item last-name">
            <div className="label">{MODAL_PROFILE_CONSTANTS.label.lastName}</div>
            <div className="value">{previewGuest?.last_name}</div>
          </div>
        </Space>
        <Space className="ant-space-align-start fullwitdh">
          <div className="info-item nick-name">
            <div className="label">{MODAL_PROFILE_CONSTANTS.label.nickName}</div>
            <div className="value">{previewGuest?.nick_name}</div>
          </div>
          <div className="info-item birthday">
            <div className="label">{MODAL_PROFILE_CONSTANTS.label.birthday}</div>
            <div className="value">{handleConvertDateStringToDate(previewGuest?.date_of_birth)}</div>
          </div>
        </Space>
        <div className="info-item email">
          <div className="label">{MODAL_PROFILE_CONSTANTS.label.email}</div>
          <div className="value">{previewGuest?.email}</div>
        </div>
        <div className="info-item phone">
          <div className="label">{MODAL_PROFILE_CONSTANTS.label.phone}</div>
          <div className="value">{previewGuest?.telephone}</div>
        </div>
      </Form>
    </ModalProfileGuestStyled>
  );
};

export default ModalProfileGuest;