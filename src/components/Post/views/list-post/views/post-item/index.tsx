/* eslint-disable react/prop-types */
// @ts-nocheck
import { HeartTwoTone, LikeTwoTone, MessageTwoTone, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import handleConvertDateStringToDateTime from '../../../../../../helpers/convertDateStringToDate';
import BaseImagePreview from '../../../../../Base/BaseImagePreview';
import { PostItemStyle } from './styled';
import CommentItem from './views/comment-item';
import InputComment from './views/input-comment';

const PostItem = (props: any) => {
  const {
    isAdmin = false,
    isAdminOwner = false,
    isProfile = false,
    isPostSaved = false,
    isPostPending = false,
    isPostDraft = false,
    isGuest = false,
    handleClickMoreOption = () => { },
    detailPost = {},
    setDetailPost = () => { },
    listPost = {},
    setListPost = () => { },
    isDetail = false,
    listComment = [],
    setListComment = () => { },
  } = props;
  const history = useHistory();
  const refTextArea = useRef(null);

  const onclickMenu = ({ key } : any) => {
    handleClickMoreOption(key, detailPost);
  }

  const menu = (
    <Menu onClick={onclickMenu}>
      {
        (!isPostSaved && !isPostPending) && (
          <Menu.Item key="edit">Chỉnh sửa bài viết</Menu.Item>
        )
      }
      <Menu.Item key={`${isPostSaved ? "unsave" : "delete"}`}>{isPostSaved ? "Bỏ lưu" : "Xóa bài viết"}</Menu.Item>
    </Menu>
  );

  const menuAdmin = (
    <Menu onClick={onclickMenu}>
      {
        isAdminOwner && (
          <Menu.Item key="edit-admin">Chỉnh sửa bài viết</Menu.Item>
        )
      }
      <Menu.Item key="delete-admin">Xóa bài viết</Menu.Item>
    </Menu>
  );

  const handleClickLikeButton = () => {
    if (isDetail) {
      setDetailPost({
        ...detailPost,
        isLike: !detailPost.isLike,
      });
    } else {
      // handleClickLike(detailPost);
      if (!detailPost) return;
      let currentLike = true;
      if (detailPost.isLike) {
        currentLike = false;
      }
      const listPostClone = cloneDeep(listPost);
      const indexItemPostInteract = listPost.findIndex((item: any) => item.id === detailPost.id);
      listPostClone[indexItemPostInteract].isLike = currentLike;
      setListPost(listPostClone);
    }
  }

  const handleClickSaveButton = () => {
    if (isDetail) {
      setDetailPost({
        ...detailPost,
        isSave: !detailPost.isSave,
      });
    } else {
      if (!detailPost) return;
      let currentSave = true;
      if (detailPost.isSave) {
        currentSave = false;
      }
      const listPostClone = cloneDeep(listPost);
      const indexItemPostInteract = listPost.findIndex((item: any) => item.id === detailPost.id);
      listPostClone[indexItemPostInteract].isSave = currentSave;
      setListPost(listPostClone);
    }
  }

  const handleClickCommentButton = () => {
    if (isDetail) {
      refTextArea.current && refTextArea.current.focus();
    } else {
      history.push(`${isAdmin ? "/admin/post-management" : "/post"}/${detailPost.id}`);
    }
  }

  return (
    <PostItemStyle className="post-item">
      <div className="header-post">
        <img src={detailPost?.author_avatar} alt="" />
        <div>
          <div className="post-author">
            {detailPost?.author_nick_name}
          </div>
          <div className="create-at">
            {handleConvertDateStringToDateTime(detailPost?.create_at)}
          </div>
        </div>
        {
          // nếu là profile của bản thân hoặc nếu là admin và không phải bài đang đợi duyệt
          ((isProfile && !isGuest) || (isAdmin && !isPostPending)) && (
            <Dropdown overlay={!isAdmin ? menu : menuAdmin} placement="bottomRight">
              <div className="more-option">
                <MoreOutlined />
              </div>
            </Dropdown>
          )
        }
      </div>
      <div className="body-post">
        <div className="title-post">
          {detailPost?.title}
        </div>
        <div className="detail-post">
          {detailPost?.content_texts}
        </div>
        <div className={`${detailPost?.image?.length < 3 ? "list-image" : "list-image-3"}`}>
          {detailPost?.content_images?.split(";")?.map((image: any, index: any) => {
            const key = detailPost.id.toString() + index.toString();
            return (
              <BaseImagePreview key={key} src={image} alt="" />
            )
          })}
        </div>
      </div>
      {
        (!isPostDraft && !isPostPending) && (
          <div className="footer-post">
            <div className="detail-interaction">
              <div className="detail-like">
                <img src="/post/likeFbIcon.svg" alt="" />
                {detailPost?.totalLike}
              </div>
              <div className="detail-other">
                <div>{detailPost?.totalComment} bình luận</div>
                <div>{detailPost?.totalSave} lượt lưu</div>
              </div>
            </div>
            <div className="list-button">
              <div
                aria-hidden
                className="like-button action-button"
                onClick={handleClickLikeButton}
              >
                <LikeTwoTone twoToneColor={detailPost?.isLike ? "#1877F2" : "#a3a3a3"} />
                <div className={`text ${detailPost?.isLike && "text-like"}`}>Thích</div>
              </div>
              <div className="comment-button action-button" onClick={handleClickCommentButton}>
                <MessageTwoTone twoToneColor="#a3a3a3" />
                <div className="text">Bình luận</div>
              </div>
              <div
                aria-hidden
                className="save-button action-button"
                onClick={handleClickSaveButton}
              >
                <HeartTwoTone twoToneColor={detailPost?.isSave ? "#f21831" : "#a3a3a3"} />
                <div className={`text ${detailPost?.isSave && "text-save"}`}>Lưu</div>
              </div>
            </div>
          </div>
        )
      }
      {
        (isDetail && !isProfile && !isPostDraft && !isPostPending) && (
          <div className="list-comment">
            <InputComment idPost={detailPost.id} refTextArea={refTextArea} />
            <div>
              {
                listComment.map((item) => {
                  return (
                    <CommentItem
                      key={item.id}
                      detailComment={item}
                      listComment={listComment}
                      setListComment={setListComment}
                      isAdmin={isAdmin}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      }
      {
        (isAdmin && isPostPending) && (
          <div className="list-approve-button-admin">
            <Button type="primary">Duyệt bài viết</Button>
            <Button type="text">Xóa bài viết</Button>
          </div>
        )
      }
    </PostItemStyle>
  );
};

export default PostItem;
