import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { handleLikeCommentAdmin } from '../../../../../../../../api/admin/post';
import { handleLikeComment } from '../../../../../../../../api/post';
import handleConvertDateStringToDateTimeComment from '../../../../../../../../helpers/convertDateStringtoDateComment';
import BaseImagePreview from '../../../../../../../Base/BaseImagePreview';
import POST_ITEM_CONSTANTS from '../../constants';
import ModalDeleteComment from '../modal-delete-comment';
import ModalEditComment from '../modal-edit-comment';
import { CommentItemStyled } from './styled';

const CommentItem = (props: any) => {
  const {
    detailComment = {},
    listComment = [],
    setListComment = () => { },
    isAdmin = false,
    idPost,
  } = props;

  const [idCommentDelete, setIdCommentDelete] = useState(null);
  const [commentEditOwner, setCommentEditOwner] = useState(null);
  const queryClient = useQueryClient();
  const myProfile: any = queryClient.getQueryData("my-profile");

  const mutationLikeComment = useMutation(isAdmin ? handleLikeCommentAdmin : handleLikeComment);

  const onclickMenu = ({ key }: any) => {
    if (key === "edit-comment") {
      setCommentEditOwner(detailComment);
    } else {
      setIdCommentDelete(detailComment.id);
    }
  }

  const menu = (
    <Menu onClick={onclickMenu}>
      <Menu.Item key="edit-comment">Chỉnh sửa</Menu.Item>
      <Menu.Item key="delete-comment">Xóa</Menu.Item>
    </Menu>
  );

  const handleClickLike = () => {
    if (isAdmin) return;

    let currentLike = true;
    let changeLike = 1;
    if (detailComment.isLike) {
      currentLike = false;
      changeLike = -1;
    }

    mutationLikeComment.mutate({
      commentId: detailComment.id,
      isLike: currentLike,
    }, {
      onSuccess: (data) => {
        if (data?.statusCode === 200) {

          const newListComment = cloneDeep(listComment);
          const commentIndex = newListComment.findIndex((item: any) => item.id === detailComment.id);

          newListComment[commentIndex].isLike = currentLike;
          newListComment[commentIndex].totalLike = +newListComment[commentIndex].totalLike + changeLike;

          setListComment(newListComment);
        }
      },
      onError: (err) => {
        console.log(err);
      }
    })

  }

  const handleDeleteComment = () => {
    setIdCommentDelete(detailComment.id);
    // const newListComment = cloneDeep(listComment);
    // setListComment(newListComment.filter((item: any) => item.id !== detailComment.id));
  }

  return (
    <CommentItemStyled className="comment">
      <ModalDeleteComment isAdmin={isAdmin} idCommentDelete={idCommentDelete} setIdCommentDelete={setIdCommentDelete} />
      <ModalEditComment isAdmin={isAdmin} idPost={idPost} commentEditOwner={commentEditOwner} setCommentEditOwner={setCommentEditOwner} />
      <div className="item-comment">
        <div className="avatar">
          <img src={detailComment?.commentator_avatar || "/defaultAvatar.png"} alt="" />
        </div>
        <div className="content-comment">
          <div className="name-user">
            <span>{detailComment?.commentator_nick_name}</span>
            <span>{handleConvertDateStringToDateTimeComment(detailComment.create_at)}</span>
          </div>
          <div className="text">
            {detailComment.content_texts}
          </div>
        </div>
        {
          isAdmin && (
            <>
              <div className="delete-icon" onClick={handleDeleteComment}>
                <DeleteOutlined />
              </div>
            </>
          )
        }
        {
          !isAdmin && detailComment?.commentator_id === myProfile?.id && (
            <Dropdown overlay={menu} placement="bottomLeft">
              <div className="more-option delete-icon">
                <MoreOutlined />
              </div>
            </Dropdown>
          )
        }
      </div>
      {
        detailComment.content_images && (
          <div className="image">
            <BaseImagePreview isLoading src={detailComment.content_images} className="image-comment" />
            {/* <img src={detailComment.image} alt="" /> */}
          </div>
        )
      }
      <div className="like">
        <div
          className={`button-like ${detailComment.isLike && "liked"} ${isAdmin && "admin-disable-like"}`}
          onClick={handleClickLike}
        >
          {POST_ITEM_CONSTANTS.detailAction.like}
        </div>
        {
          +detailComment.totalLike > 0 && (
            <div className="total-like">
              <img src="/post/likeFbIcon.svg" alt="" />
              {detailComment.totalLike}
            </div>
          )
        }
      </div>
    </CommentItemStyled>
  );
};

CommentItem.propTypes = {

};

export default CommentItem;