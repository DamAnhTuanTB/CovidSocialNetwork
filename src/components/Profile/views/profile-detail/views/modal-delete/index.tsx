import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../../../../../api/post';
import toastCustom from '../../../../../../helpers/toastCustom';

const ModalDeletePost = (props: any) => {
  const {
    title = "",
    setPostDelete = () => { },
    itemPost = {},
    handleConfirmDelete = () => { }
  } = props;

  const mutation = useMutation(deletePost);

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    mutation.mutate(
      itemPost?.id,
      {
        onSuccess: (data) => {
          setLoading(false);
          if (data?.statusCode === 200) {
            toastCustom({
              mess: "Xóa bài viết thành công",
              type: "success"
            })
            setPostDelete(null);
            queryClient.invalidateQueries("my-posts");
          }
        },
        onError: (err) => {
          console.log(err);
          toastCustom({
            mess: "Xóa bài viết không thành công",
            type: "success"
          })
          setPostDelete(null);
        }
      }
    )

    // setTimeout(() => {
    //   setLoading(false);
    //   setPostDelete(null);
    // }, 2000)
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