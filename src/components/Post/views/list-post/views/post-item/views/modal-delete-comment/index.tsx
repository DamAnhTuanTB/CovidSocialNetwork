import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCommentPostAdmin } from '../../../../../../../../api/admin/post';
import { deleteComment } from '../../../../../../../../api/post';
import toastCustom from '../../../../../../../../helpers/toastCustom';
import MODAL_CHANGE_STATUS_POST_CONSTANTS from './constants';

const ModalDeleteComment = (props: any) => {
  const {
    isAdmin = false,
    idCommentDelete,
    setIdCommentDelete = () => { },
  } = props;

  const mutation = useMutation(isAdmin ? deleteCommentPostAdmin : deleteComment);

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);

    mutation.mutate(
      idCommentDelete,
      {
        onSuccess: (data) => {
          setLoading(false);
          if (data?.statusCode === 200) {
            toastCustom({
              mess: MODAL_CHANGE_STATUS_POST_CONSTANTS.message.success,
              type: "success"
            })
            setIdCommentDelete(null);
            if (isAdmin) {
              queryClient.invalidateQueries("admin-detail-post");
              queryClient.invalidateQueries("admin-comments-post");
            } else {
              queryClient.invalidateQueries("detail-post");
              queryClient.invalidateQueries("comments-post");
            }
          }
        },
        onError: (err) => {
          console.log(err);
          toastCustom({
            mess: MODAL_CHANGE_STATUS_POST_CONSTANTS.message.error,
            type: "success"
          })
          setIdCommentDelete(null);
        }
      }
    )
  }
  return (
    <Modal
      title={MODAL_CHANGE_STATUS_POST_CONSTANTS.title}
      centered
      visible={!!idCommentDelete}
      onCancel={() => setIdCommentDelete(null) }
      onOk={onSubmit}
      footer={[
        <Button key="back" onClick={() => setIdCommentDelete(null)}>
          {MODAL_CHANGE_STATUS_POST_CONSTANTS.cancel}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          {MODAL_CHANGE_STATUS_POST_CONSTANTS.submit}
        </Button>,
      ]}
    >
      {MODAL_CHANGE_STATUS_POST_CONSTANTS.content}
    </Modal>
  );
};

export default ModalDeleteComment;