import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { deletePostAdmin } from '../../../../../../api/admin/post';
import { deletePost } from '../../../../../../api/post';
import toastCustom from '../../../../../../helpers/toastCustom';
import MODAL_DELETE_POST_CONSTANTS from './constants';

const ModalDeletePost = (props: any) => {
  const {
    isAdmin = false,
    isDetail = false,
    title = "",
    setPostDelete = () => { },
    itemPost = {},
    handleConfirmDelete = () => { }
  } = props;

  const mutation = useMutation(isAdmin ? deletePostAdmin : deletePost);

  const queryClient = useQueryClient();

  const history = useHistory();
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
              mess: MODAL_DELETE_POST_CONSTANTS.message.success,
              type: "success"
            })
            setPostDelete(null);
            if (isAdmin) {
              queryClient.invalidateQueries("admin-all-posts");
              queryClient.invalidateQueries("admin-all-post-user");
              if (isDetail) {
                history.push("/admin/post-management");
              }
            } else {
              queryClient.invalidateQueries("my-posts");
              if (isDetail) {
                history.push("/post");
              }
            }
          }
        },
        onError: (err) => {
          setLoading(false);
          console.log(err);
          toastCustom({
            mess: MODAL_DELETE_POST_CONSTANTS.message.error,
            type: "error"
          })
          setPostDelete(null);
          if (isAdmin) {
            queryClient.invalidateQueries("admin-all-posts");
            queryClient.invalidateQueries("admin-all-post-user");
          } else {
            queryClient.invalidateQueries("my-posts");
          }
        }
      }
    )
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
          {MODAL_DELETE_POST_CONSTANTS.cancel}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          {MODAL_DELETE_POST_CONSTANTS.submit}
        </Button>,
      ]}
    >
      {MODAL_DELETE_POST_CONSTANTS.content}
    </Modal>
  );
};

export default ModalDeletePost;