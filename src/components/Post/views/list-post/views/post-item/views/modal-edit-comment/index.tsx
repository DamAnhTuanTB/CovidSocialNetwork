import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCommentPostAdmin, updateStatusPostAdmin } from '../../../../../../../../api/admin/post';
import { updateComment } from '../../../../../../../../api/post';
import toastCustom from '../../../../../../../../helpers/toastCustom';
import InputComment from '../input-comment';
import MODAL_CHANGE_STATUS_POST_CONSTANTS from './constants';
import { ModalEditCommentStyled } from './styled';

const ModalEditComment = (props: any) => {
  const {
    isAdmin = false,
    commentEditOwner = {},
    setCommentEditOwner = () => { },
    idPost,

  } = props;

  const refTextArea = useRef();
  const mutation = useMutation(updateComment);

  const queryClient = useQueryClient();

  const handleSubmitEditComment = (data: any) => {
    mutation.mutate({
      ...data,
      idComment: commentEditOwner?.id
    }, {
      onSuccess: (data) => {
        if (data?.statusCode === 200) {
          toastCustom({
            mess: "Chỉnh sửa bình luận thành công",
            type: "success",
          })
          queryClient.invalidateQueries("comments-post");
          setCommentEditOwner(null);
        }
      },
      onError: (err) => {
        console.log(err);
      }
    })
  }
  return (
    <ModalEditCommentStyled
      title={MODAL_CHANGE_STATUS_POST_CONSTANTS.title}
      centered
      visible={!!commentEditOwner?.id}
      onCancel={() => setCommentEditOwner(null)}
      width={700}
      footer={null}
    >
      <InputComment
        isAdmin={isAdmin}
        idPost={idPost}
        refTextArea={refTextArea}
        isEdit
        detailComment={commentEditOwner}
        setCommentEditOwner={setCommentEditOwner}
        handleSubmitEditComment={handleSubmitEditComment}
      />
    </ModalEditCommentStyled>
  );
};

export default ModalEditComment;