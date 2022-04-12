import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

const ModalDeletePost = (props: any) => {
  const {
    title = "",
    idModalDelete,
    setIdModalDelete = () => { },
    itemPost = {},
    handleConfirmDelete = () => { }
  } = props;
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    handleConfirmDelete(idModalDelete);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIdModalDelete(null);
    }, 2000)
  }
  return (
    <Modal
      title={title}
      centered
      visible={idModalDelete === itemPost.id}
      onCancel={() => setIdModalDelete(null)}
      onOk={onSubmit}
      footer={[
        <Button key="back" onClick={() => setIdModalDelete(null)}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          Ok
        </Button>,
      ]}
    >
      Bạn có muốn xóa bài viết này không
    </Modal>
  );
};

export default ModalDeletePost;