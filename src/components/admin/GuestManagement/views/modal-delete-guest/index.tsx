import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { deleteGuest } from '../../../../../api/admin/guest-management';
import toastCustom from '../../../../../helpers/toastCustom';
import MODAL_DELETE_GUEST_CONSTANTS from './constants';

const ModalDeleteGuest = (props: any) => {
  const {
    guestDelete = () => { },
    setGuestDelete = {},
  } = props;

  const mutation = useMutation(deleteGuest);

  const queryClient = useQueryClient();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {

    setLoading(true);
    mutation.mutate(
      guestDelete?.id,
      {
        onSuccess: (data) => {
          setLoading(false);
          if (data?.statusCode === 200) {
            toastCustom({
              mess: MODAL_DELETE_GUEST_CONSTANTS.message.success,
              type: "success"
            })
            setGuestDelete(null);
            queryClient.invalidateQueries("admin-all-guests");
          }
        },
        onError: (err) => {
          setLoading(false);
          console.log(err);
          toastCustom({
            mess: MODAL_DELETE_GUEST_CONSTANTS.message.error,
            type: "error"
          })
          setGuestDelete(null);
        }
      }
    )
  }
  return (
    <Modal
      title={MODAL_DELETE_GUEST_CONSTANTS.title}
      centered
      visible={!!guestDelete?.id}
      onCancel={() => setGuestDelete(null)}
      onOk={onSubmit}
      footer={[
        <Button key="back" onClick={() => setGuestDelete(null)}>
          {MODAL_DELETE_GUEST_CONSTANTS.cancel}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          {MODAL_DELETE_GUEST_CONSTANTS.submit}
        </Button>,
      ]}
    >
      <div style={{ fontSize: "20px" }}>
        {MODAL_DELETE_GUEST_CONSTANTS.content.first}
        <span style={{ fontStyle: "italic", fontWeight: "500" }}>{guestDelete?.nick_name}</span>
        {MODAL_DELETE_GUEST_CONSTANTS.content.second}
      </div>
    </Modal>
  );
};

export default ModalDeleteGuest;