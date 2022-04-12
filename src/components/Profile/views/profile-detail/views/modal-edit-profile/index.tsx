import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

const ModalEditProfile = (props: any) => {
  const {
    isShowModalEditProfile,
    setIsShowModalEditProfile = () => { },
    handleConfirmEditProfile = () => { }
  } = props;
  const [loading, setLoading] = useState(false);
  const formdata = 1;
  const onSubmit = () => {
    handleConfirmEditProfile(formdata);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsShowModalEditProfile(false);
    }, 2000)
  }

  const footerEdit = [
    <Button key="back" onClick={() => setIsShowModalEditProfile(false)}>
      Hủy
    </Button>,
    <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
      Ok
    </Button>,
  ]

  return (
    <Modal
      title="Chỉnh sửa thông tin cá nhân"
      centered
      visible={isShowModalEditProfile}
      onCancel={() => setIsShowModalEditProfile(false)}
      onOk={onSubmit}
      footer={footerEdit}
    >
      form ở đây
    </Modal>
  );
};

ModalEditProfile.propTypes = {

};

export default ModalEditProfile;