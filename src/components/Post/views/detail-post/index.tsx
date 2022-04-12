import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../list-post/views/post-item';
import { useParams } from 'react-router-dom';
import dataRecord from '../list-post/fakeData';
import { DetailPostStyled } from './styled';
import dataCommentRecord from '../list-post/views/post-item/fakeDataComment';

const DetailPost = (props: any) => {
  const { match } = props;
  const param: { id_post: any } = useParams();

  const [detailPost, setDetailPost] = useState(dataRecord.find((item) => item.id === +param.id_post));
  const [listComment, setListComment] = useState(dataCommentRecord);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DetailPostStyled>
      <div className="detail-post-container">
        <PostItem
          isDetail
          detailPost={detailPost}
          listComment={listComment}
          setListComment={setListComment}
          setDetailPost={setDetailPost}
        />
      </div>
    </DetailPostStyled>
  );
};

export default DetailPost;