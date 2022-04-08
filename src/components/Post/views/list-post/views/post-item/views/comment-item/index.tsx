import React from 'react';
import PropTypes from 'prop-types';
import { CommentItemStyled } from './styled';
import { cloneDeep } from 'lodash';
import BaseImagePreview from '../../../../../../../Base/BaseImagePreview';

const CommentItem = (props: any) => {
  const {
    detailComment = {},
    listComment = [],
    setListComment = () => { }
  } = props;

  const handleClickLike = () => {
    // console.log(123123123);
    let currentLike = true;
    let changeLike = 1;
    if (detailComment.isLike) {
      currentLike = false;
      changeLike = -1;
    }
    const newListComment = cloneDeep(listComment);
    const commentIndex = newListComment.findIndex((item: any) => item.id === detailComment.id);
    
    newListComment[commentIndex].isLike = currentLike;
    newListComment[commentIndex].totalLike = newListComment[commentIndex].totalLike + changeLike;
    
    setListComment(newListComment);
  }

  return (
    <CommentItemStyled>
      <div className="item-comment">
        <div className="avatar">
          <img src={detailComment?.user?.avatar} alt="" />
        </div>
        <div className="content-comment">
          <div className="name-user">
            <span>{detailComment?.user?.name}</span>
            <span>{detailComment.createdAt}</span>
          </div>
          <div className="text">
            {detailComment.content}
          </div>
        </div>
      </div>
      {
        detailComment.image && (
          <div className="image">
            <BaseImagePreview src={detailComment.image} />
            {/* <img src={detailComment.image} alt="" /> */}
          </div>
        )
      }
      {
        detailComment.totalLike && (
          <div className="like">
            <div
              className={`button-like ${detailComment.isLike && "liked"}`}
              onClick={handleClickLike}
            >
              Thích
            </div>
            <div className="total-like">
              <img src="/post/likeFbIcon.svg" alt="" />
              {detailComment.totalLike}
            </div>
          </div>
        )
      }
    </CommentItemStyled>
  );
};

CommentItem.propTypes = {

};

export default CommentItem;