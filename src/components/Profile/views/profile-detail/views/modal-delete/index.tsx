import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalDeletePost = (props: any) => {
  const {
    title = "",
    setPostDelete = () => { },
    itemPost = {},
    handleConfirmDelete = () => { }
  } = props;
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    handleConfirmDelete(itemPost?.id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPostDelete(null);
    }, 2000)
  }
  return (
    <Modal
      title={title}
      centered
      visible={!!itemPost?.id}
      onCancel={() => setPostDelete(null)}
      onOk={onSubmit}
      footer={[
        <Button key="back" onClick={() => setPostDelete(null)}>
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