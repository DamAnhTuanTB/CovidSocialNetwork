import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteExpert } from '../../../../../api/admin/expert-management';
import toastCustom from '../../../../../helpers/toastCustom';
import MODAL_DELETE_EXPERT_CONSTANTS from './constants';

const ModalDeleteExpert = (props: any) => {
  const {
    expertDelete = () => { },
    setExpertDelete = {},
  } = props;

  const mutation = useMutation(deleteExpert);

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {

    setLoading(true);
    mutation.mutate(
      expertDelete?.id,
      {
        onSuccess: (data: any) => {
          setLoading(false);
          if (data?.statusCode === 200) {
            toastCustom({
              mess: MODAL_DELETE_EXPERT_CONSTANTS.message.success,
              type: "success"
            })
            setExpertDelete(null);
            queryClient.invalidateQueries("admin-all-experts");
          }
        },
        onError: (err) => {
          setLoading(false);
          console.log(err);
          toastCustom({
            mess: MODAL_DELETE_EXPERT_CONSTANTS.message.error,
            type: "error"
          })
          setExpertDelete(null);
        }
      }
    )
  }
  return (
    <Modal
      title={MODAL_DELETE_EXPERT_CONSTANTS.title}
      centered
      visible={!!expertDelete?.id}
      onCancel={() => setExpertDelete(null)}
      onOk={onSubmit}
      footer={[
        <Button key="back" onClick={() => setExpertDelete(null)}>
          {MODAL_DELETE_EXPERT_CONSTANTS.cancel}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          {MODAL_DELETE_EXPERT_CONSTANTS.submit}
        </Button>,
      ]}
    >
      <div style={{ fontSize: "20px" }}>
        {MODAL_DELETE_EXPERT_CONSTANTS.content.first}
        <span style={{ fontStyle: "italic", fontWeight: "500" }}>{expertDelete?.nick_name}</span>
        {MODAL_DELETE_EXPERT_CONSTANTS.content.second}
      </div>
    </Modal>
  );
};

export default ModalDeleteExpert;