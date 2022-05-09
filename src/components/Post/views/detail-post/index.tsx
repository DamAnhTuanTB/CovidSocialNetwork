import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostItem from '../list-post/views/post-item';
import { useParams } from 'react-router-dom';
import dataRecord from '../list-post/fakeData';
import { DetailPostStyled } from './styled';
import dataCommentRecord from '../list-post/views/post-item/fakeDataComment';
import ModalDeletePost from '../../../Profile/views/profile-detail/views/modal-delete';
import { useGetDetailPost, useGetListCommentPost } from '../../../../hooks/usePost';

const DetailPost = (props: any) => {
  const {
    match,
    isAdmin = false,
  } = props;
  const param: { id_post: any } = useParams();

  const { dataDetailPost, refetchDetailPost, isLoadingDetailPost, isFetchingDetailPost } = useGetDetailPost(param?.id_post);
  const { dataCommentPost, refetchCommentPost, isLoadingCommentPost, isFetchingCommentPost } = useGetListCommentPost(param?.id_post);

  const [detailPost, setDetailPost] = useState({});
  const [listComment, setListComment] = useState([]);
  const [postDelete, setPostDelete] = useState(null);

  const handleConfirmDelete = (idPost: any) => {
    console.log(13123123, idPost);
  }

  const handleClickMoreOption = (key: any, post: any) => {
    console.log(key, post);

    if (key === "delete-admin") {
      setPostDelete(post);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    setDetailPost(dataDetailPost?.data[0]);
    setListComment(dataCommentPost?.data);
  }, [param?.id_post, dataDetailPost, dataCommentPost]);

  return (
    <DetailPostStyled>
      <ModalDeletePost
        isAdmin
        setPostDelete={setPostDelete}
        itemPost={postDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      <div className="detail-post-container">
        <PostItem
          isDetail
          isAdmin={isAdmin}
          detailPost={detailPost}
          listComment={listComment}
          setListComment={setListComment}
          setDetailPost={setDetailPost}
          handleClickMoreOption={handleClickMoreOption}
        />
      </div>
    </DetailPostStyled>
  );
};

export default DetailPost;