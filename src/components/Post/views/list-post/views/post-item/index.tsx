/* eslint-disable react/prop-types */
// @ts-nocheck
import { HeartTwoTone, LikeTwoTone, MessageTwoTone, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { handleLikePostAdmin } from '../../../../../../api/admin/post';
import { handleLikePost, handleSavePost } from '../../../../../../api/post';
import handleConvertDateStringToDateTime from '../../../../../../helpers/convertDateStringToDate';
import toastCustom from '../../../../../../helpers/toastCustom';
import BaseImagePreview from '../../../../../Base/BaseImagePreview';
import POST_ITEM_CONSTANTS from './constants';
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
    isPostCancelAdmin = false,
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

  const onclickMenu = ({ key }: any) => {
    handleClickMoreOption(key, detailPost);
  }

  const menu = (
    <Menu onClick={onclickMenu}>
      {
        (!isPostSaved && !isPostPending) && (
          <Menu.Item key="edit">{POST_ITEM_CONSTANTS.dropdown.edit}</Menu.Item>
        )
      }
      <Menu.Item key={`${isPostSaved ? "unsave" : "delete"}`}>{isPostSaved ? POST_ITEM_CONSTANTS.dropdown.unsave : POST_ITEM_CONSTANTS.dropdown.delete}</Menu.Item>
    </Menu>
  );

  const menuAdmin = (
    <Menu onClick={onclickMenu}>
      {
        isAdminOwner && (
          <Menu.Item key="edit-admin">{POST_ITEM_CONSTANTS.dropdown.edit}</Menu.Item>
        )
      }
      <Menu.Item key="delete-admin">{POST_ITEM_CONSTANTS.dropdown.delete}</Menu.Item>
    </Menu>
  );

  const mutationLikePost = useMutation(isAdmin ? handleLikePostAdmin : handleLikePost);
  const mutationSavePost = useMutation(handleSavePost);

  const handleClickAuthorPost = () => {
    if (isAdmin) {
      history.push(`/admin/post-management/find-by-user/${detailPost.author_id}`);
    } else {
      history.push(`/profile/${detailPost.author_id}`);
    }
  }

  const handleClickLikeButton = () => {
    let currentLike = true;
    if (detailPost.isLike) {
      currentLike = false;
    }

    mutationLikePost.mutate({
      postId: detailPost.id,
      isLike: currentLike,
    }, {
      onSuccess: (data: any) => {
        if (data?.statusCode === 200) {
          if (isDetail) {
            setDetailPost({
              ...detailPost,
              isLike: !detailPost.isLike,
              totalLike: currentLike ? +detailPost.totalLike + 1 : +detailPost.totalLike - 1
            });
          } else {

            const listPostClone = cloneDeep(listPost);
            const indexItemPostInteract = listPost.findIndex((item: any) => item.id === detailPost.id);
            listPostClone[indexItemPostInteract].isLike = currentLike;
            if (currentLike) {
              listPostClone[indexItemPostInteract].totalLike = +listPostClone[indexItemPostInteract].totalLike + 1;
            } else {
              listPostClone[indexItemPostInteract].totalLike = +listPostClone[indexItemPostInteract].totalLike - 1;
            }
            setListPost(listPostClone);
          }
        }
      },
      onError: (err: any) => {
        console.log(err);
      }
    })

  }

  const handleClickSaveButton = () => {
    let currentSave = true;
    if (detailPost.isSave) {
      currentSave = false;
    }

    mutationSavePost.mutate({
      postId: detailPost.id,
      isSave: currentSave,
    }, {
      onSuccess: (data: any) => {
        if (data?.statusCode === 200) {
          if (currentSave) {
            toastCustom({
              mess: POST_ITEM_CONSTANTS.successMessage.savePost,
              type: "success",
            })
          }
          if (isDetail) {
            setDetailPost({
              ...detailPost,
              isSave: currentSave,
              totalSave: currentSave ? +detailPost.totalSave + 1 : +detailPost.totalSave - 1
            });
          } else {

            const listPostClone = cloneDeep(listPost);
            const indexItemPostInteract = listPost.findIndex((item: any) => item.id === detailPost.id);
            listPostClone[indexItemPostInteract].isSave = currentSave;
            if (currentSave) {
              listPostClone[indexItemPostInteract].totalSave = +listPostClone[indexItemPostInteract].totalSave + 1;
            } else {
              listPostClone[indexItemPostInteract].totalSave = +listPostClone[indexItemPostInteract].totalSave - 1;
            }
            setListPost(listPostClone);
          }
        }
      },
      onError: (err: any) => {
        console.log(err);
      }
    })

    // if (isDetail) {
    //   setDetailPost({
    //     ...detailPost,
    //     isSave: !detailPost.isSave,
    //   });
    // } else {
    //   const listPostClone = cloneDeep(listPost);
    //   const indexItemPostInteract = listPost.findIndex((item: any) => item.id === detailPost.id);
    //   listPostClone[indexItemPostInteract].isSave = currentSave;
    //   setListPost(listPostClone);
    // }
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
        <img src={detailPost?.author_avatar || "/defaultAvatar.png"} alt="" />
        <div>
          <div className="post-author" onClick={handleClickAuthorPost}>
            {detailPost?.author_nick_name}
          </div>
          <div className="create-at">
            {handleConvertDateStringToDateTime(detailPost?.create_at)}
          </div>
        </div>
        {
          // nếu là profile của bản thân hoặc nếu là admin và không phải bài đang đợi duyệt
          ((isProfile && !isGuest) || (isAdmin && !isPostPending && !isPostCancelAdmin)) && (
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
        <div className={`${detailPost?.content_images?.split(";")?.length < 3 ? "list-image" : "list-image-3"}`}>
          {detailPost?.content_images?.split(";")?.map((image: any, index: any) => {
            const key = detailPost.id.toString() + index.toString();
            return (
              <BaseImagePreview isLoading key={key} src={`${image}`} className="item-image" alt="" />
            )
          })}
        </div>
      </div>
      {
        (!isPostDraft && !isPostPending && !isPostCancelAdmin) && (
          <div className="footer-post">
            <div className="detail-interaction">
              <div className="detail-like">
                <img src="/post/likeFbIcon.svg" alt="" />
                {detailPost?.totalLike}
              </div>
              <div className="detail-other">
                <div>{detailPost?.totalComment}{POST_ITEM_CONSTANTS.detailAction.suffix.comment}</div>
                <div>{detailPost?.totalSave}{POST_ITEM_CONSTANTS.detailAction.suffix.save}</div>
              </div>
            </div>
            <div className="list-button">
              <div
                aria-hidden
                className="like-button action-button"
                onClick={handleClickLikeButton}
              >
                <LikeTwoTone twoToneColor={detailPost?.isLike ? "#1877F2" : "#a3a3a3"} />
                <div className={`text ${detailPost?.isLike && "text-like"}`}>{POST_ITEM_CONSTANTS.detailAction.like}</div>
              </div>
              <div className="comment-button action-button" onClick={handleClickCommentButton}>
                <MessageTwoTone twoToneColor="#a3a3a3" />
                <div className="text">{POST_ITEM_CONSTANTS.detailAction.comment}</div>
              </div>
              {
                !isAdmin && (
                  <div
                    aria-hidden
                    className="save-button action-button"
                    onClick={handleClickSaveButton}
                  >
                    <HeartTwoTone twoToneColor={detailPost?.isSave ? "#f21831" : "#a3a3a3"} />
                    <div className={`text ${detailPost?.isSave && "text-save"}`}>{POST_ITEM_CONSTANTS.detailAction.save}</div>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
      {
        (isDetail && !isProfile && !isPostDraft && !isPostPending) && (
          <div className="list-comment">
            <InputComment isAdmin={isAdmin} idPost={detailPost.id} refTextArea={refTextArea} />
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
            <Button type="primary">{POST_ITEM_CONSTANTS.adminAction.approve}</Button>
            <Button type="text">{POST_ITEM_CONSTANTS.adminAction.delete}</Button>
          </div>
        )
      }
    </PostItemStyle>
  );
};

export default PostItem;
