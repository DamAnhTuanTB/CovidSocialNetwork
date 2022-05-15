import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateStatusPostAdmin } from '../../../../../../../../api/admin/post';
import toastCustom from '../../../../../../../../helpers/toastCustom';
import MODAL_CHANGE_STATUS_POST_CONSTANTS from './constants';

const ModalChangeStatusPost = (props: any) => {
  const {
    status = null,
    idPostApproveOrCancel = null,
    setIdPostApproveOrCancel = () => { },
    setStatus = () => { }
  } = props;

  const mutation = useMutation(updateStatusPostAdmin);

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    console.log(status, idPostApproveOrCancel);
    
    mutation.mutate(
      {
        idPost: idPostApproveOrCancel,
        status: status,
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          console.log(123123123, data);
          
          if (data?.statusCode === 200) {
            toastCustom({
              mess: status === "success" ? MODAL_CHANGE_STATUS_POST_CONSTANTS.message.success.approve : MODAL_CHANGE_STATUS_POST_CONSTANTS.message.success.cancel,
              type: "success"
            })
            setIdPostApproveOrCancel(null);
            setStatus(null);
            queryClient.invalidateQueries("admin-all-posts");
            queryClient.invalidateQueries("admin-all-post-user");
          }
        },
        onError: (err) => {
          console.log(err);
          toastCustom({
            mess: status === "success" ? MODAL_CHANGE_STATUS_POST_CONSTANTS.message.error.approve : MODAL_CHANGE_STATUS_POST_CONSTANTS.message.error.cancel,
            type: "success"
          })
          setIdPostApproveOrCancel(null);
          setStatus(null);
        }
      }
    )
  }
  return (
    <Modal
      title={status === "success" ? MODAL_CHANGE_STATUS_POST_CONSTANTS.title.approve : MODAL_CHANGE_STATUS_POST_CONSTANTS.title.cancel}
      centered
      visible={!!idPostApproveOrCancel}
      onCancel={() => { setStatus(null); setIdPostApproveOrCancel(null) }}
      onOk={onSubmit}
      footer={[
        <Button key="back" onClick={() => { setStatus(null); setIdPostApproveOrCancel(null) }}>
          {MODAL_CHANGE_STATUS_POST_CONSTANTS.cancel}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          {MODAL_CHANGE_STATUS_POST_CONSTANTS.submit}
        </Button>,
      ]}
    >
      {status === "success" ? MODAL_CHANGE_STATUS_POST_CONSTANTS.content.approve : MODAL_CHANGE_STATUS_POST_CONSTANTS.content.cancel}
    </Modal>
  );
};

export default ModalChangeStatusPost;