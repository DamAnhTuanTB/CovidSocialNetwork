import { DeleteOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import React from 'react';
import { useMutation } from 'react-query';
import { handleLikeComment } from '../../../../../../../../api/post';
import handleConvertDateStringToDateTimeComment from '../../../../../../../../helpers/convertDateStringtoDateComment';
import BaseImagePreview from '../../../../../../../Base/BaseImagePreview';
import POST_ITEM_CONSTANTS from '../../constants';
import { CommentItemStyled } from './styled';

const CommentItem = (props: any) => {
  const {
    detailComment = {},
    listComment = [],
    setListComment = () => { },
    isAdmin = false,
  } = props;

  const mutationLikeComment = useMutation(handleLikeComment);

  const handleClickLike = () => {
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
    // console.log(111111, detailComment);
    const newListComment = cloneDeep(listComment);
    setListComment(newListComment.filter((item: any) => item.id !== detailComment.id));
  }

  return (
    <CommentItemStyled>
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
            <div className="delete-icon" onClick={handleDeleteComment}>
              <DeleteOutlined />
            </div>
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
          className={`button-like ${detailComment.isLike && "liked"}`}
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