import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGetDetailPostAdmin, useGetListCommentPostAdmin } from '../../../../hooks/admin/usePostAdmin';
import { useGetDetailPost, useGetListCommentPost } from '../../../../hooks/usePost';
import ModalDeletePost from '../../../Profile/views/profile-detail/views/modal-delete';
import PostItem from '../list-post/views/post-item';
import { DetailPostStyled } from './styled';

const DetailPost = (props: any) => {
  const {
    match,
    isAdmin = false,
  } = props;
  const param: { id_post: any } = useParams();
  const history = useHistory();

  const { dataDetailPost, refetchDetailPost, isLoadingDetailPost, isFetchingDetailPost } = useGetDetailPost(param?.id_post, !isAdmin);
  const { dataCommentPost, refetchCommentPost, isLoadingCommentPost, isFetchingCommentPost } = useGetListCommentPost(param?.id_post, !isAdmin);

  const { dataDetailPostAdmin, refetchDetailPostAdmin, isLoadingDetailPostAdmin, isFetchingDetailPostAdmin } = useGetDetailPostAdmin(param?.id_post, isAdmin);
  const { dataCommentPostAdmin, refetchCommentPostAdmin, isLoadingCommentPostAdmin, isFetchingCommentPostAdmin } = useGetListCommentPostAdmin(param?.id_post, isAdmin);


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
    if (dataDetailPost?.statusCode === 400) {
      history.push("/not-found");
      return;
    }
    if (isAdmin) {
      setDetailPost(dataDetailPostAdmin?.data[0]);
      setListComment(dataCommentPostAdmin?.data);
    } else {
      setDetailPost(dataDetailPost?.data[0]);
      setListComment(dataCommentPost?.data);
    }
    
  }, [param?.id_post, dataDetailPost, dataCommentPost, dataDetailPostAdmin, dataCommentPostAdmin]);

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