import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGetDetailPostAdmin, useGetListCommentPostAdmin } from '../../../../hooks/admin/usePostAdmin';
import { useGetDetailPost, useGetListCommentPost } from '../../../../hooks/usePost';
import ModalDeletePost from '../../../Profile/views/profile-detail/views/modal-delete';
import PostItem from '../list-post/views/post-item';
import ModalCreatePost from '../modal-create-post';
import { DetailPostStyled } from './styled';

const DetailPost = (props: any) => {
  const {
    match,
    isAdmin = false,
  } = props;
  const param: { id_post: any } = useParams();
  const history = useHistory();

  const { dataDetailPost } = useGetDetailPost(param?.id_post, !isAdmin);
  const { dataCommentPost } = useGetListCommentPost(param?.id_post, !isAdmin);

  const { dataDetailPostAdmin } = useGetDetailPostAdmin(param?.id_post, isAdmin);
  const { dataCommentPostAdmin } = useGetListCommentPostAdmin(param?.id_post, isAdmin);


  const [detailPost, setDetailPost] = useState<any>({});
  const [listComment, setListComment] = useState([]);
  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);

  const handleConfirmDelete = (idPost: any) => {
    console.log(13123123, idPost);
  }

  const handleClickMoreOption = (key: any, post: any) => {
    console.log(key, post);

    if (key === "delete-admin" || (key === "delete" && !isAdmin)) {
      setPostDelete(post);
    }

    if ((key === "edit" && !isAdmin) || key === "edit-admin") {
      setPostEdit(post);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (dataDetailPost?.statusCode === 400 && dataDetailPost?.errorCode === 444) {
      history.push("/post-pending");
      return;
    }
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
        isAdmin={isAdmin}
        isDetail
        setPostDelete={setPostDelete}
        itemPost={postDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      <ModalCreatePost
        isEdit
        isDetail
        isAdmin={isAdmin}
        itemPost={postEdit}
        setPostEdit={setPostEdit}
      />
      <div className="detail-post-container">
        <PostItem
          isDetail
          isAdmin={isAdmin}
          isAdminOwner={(!!detailPost?.isAdmin && isAdmin)}
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