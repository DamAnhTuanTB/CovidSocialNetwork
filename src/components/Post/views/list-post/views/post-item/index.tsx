/* eslint-disable react/prop-types */
// @ts-nocheck
import { HeartTwoTone, LikeTwoTone, MessageTwoTone, MoreOutlined, CameraOutlined, CloseOutlined, DeleteFilled } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import BaseImagePreview from '../../../../../Base/BaseImagePreview';
import dataCommentRecord from './fakeDataComment';
import { PostItemStyle } from './styled';
import CommentItem from './views/comment-item';

const PostItem = (props: any) => {
  const {
    isProfile = false,
    isPostSaved = false,
    isPostDraft = false,
    isGuest = false,
    handleClickMoreOption = () => { },
    detailPost = {},
    setDetailPost = () => { },
    handleClickLike = () => { },
    handleClickSave = () => { },
    isDetail = false,
    listComment = [],
    setListComment = () => { },
  } = props;
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState();
  const refInputFile = useRef(null);
  const refTextArea = useRef(null);
  const handleChangeImage = (e: any) => {
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setImagePreview(fileUrl);
  }

  const onclickMenu = ({ key }) => {
    handleClickMoreOption(key, detailPost);
  }

  const menu = (
    <Menu onClick={onclickMenu}>
      {
        !isPostSaved && (
          <Menu.Item key="edit">Chỉnh sửa bài viết</Menu.Item>
        )
      }
      <Menu.Item key={`${isPostSaved ? "unsave" : "delete"}`}>{isPostSaved ? "Bỏ lưu" : "Xóa bài viết"}</Menu.Item>
    </Menu>
  );

  const handleClickLikeButton = () => {
    if (isDetail) {
      setDetailPost({
        ...detailPost,
        isLike: !detailPost.isLike,
      });
    } else {
      handleClickLike(detailPost);
    }
  }

  const handleClickSaveButton = () => {
    if (isDetail) {
      setDetailPost({
        ...detailPost,
        isSave: !detailPost.isSave,
      });
    } else {
      handleClickSave(detailPost);
    }
  }

  const handleClickCommentButton = () => {
    if (isDetail) {
      refTextArea.current && refTextArea.current.focus();
    } else {
      history.push(`/post/${detailPost.id}`);
    }
  }

  return (
    <PostItemStyle className="post-item">
      <div className="header-post">
        <img src={detailPost?.user?.avatar} alt="" />
        <div>
          <div className="post-author">
            {detailPost?.user?.name}
          </div>
          <div className="create-at">
            {detailPost?.createdAt}
          </div>
        </div>
        {
          (isProfile && !isGuest) && (
            <Dropdown overlay={menu} placement="bottomRight">
              <div className="more-option">
                <MoreOutlined />
              </div>
            </Dropdown>
          )
        }
      </div>
      <div className="body-post">
        <div className="detail-post">
          {detailPost?.content}
        </div>
        <div className={`${detailPost?.image?.length < 3 ? "list-image" : "list-image-3"}`}>
          {detailPost?.image?.map((image: any, index: any) => {
            const key = detailPost.id.toString() + index.toString();
            return (
              <BaseImagePreview key={key} src={image} alt="" />
            )
          })}
        </div>
      </div>
      {
        !isPostDraft && (
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
            {
              !isProfile && (
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
              )
            }
          </div>
        )
      }
      {
        (isDetail && !isProfile && !isPostDraft) && (
          <div className="list-comment">
            <div className="input-comment-container">
              {/* bình luận */}
              <div className="input-comment">
                <img className="avatar-user" src="/post/avatar_my1.jpg" alt="" />
                <div className="inputs">
                  <TextareaAutosize
                    placeholder="Nhập bình luận"
                    onChange={(e) => console.log(e.target.value)}
                    className="text-input"
                    ref={refTextArea}
                  />
                  <div className="file-input-container">
                    <div className="file-input">
                      <input ref={refInputFile} disabled={!!imagePreview} onChange={handleChangeImage} type="file" />
                      <CameraOutlined className="camera-icon" />
                    </div>
                  </div>
                </div>
              </div>
              {
                imagePreview && (
                  <div className="preview-image">
                    <img src={imagePreview} alt="" />
                    <div className="reset-button" onClick={() => { refInputFile.current.value = null; setImagePreview(""); }}>
                      <CloseOutlined className="reset-icon" />
                    </div>
                  </div>
                )
              }
            </div>
            <div>
              {
                listComment.map((item) => {
                  return (
                    <CommentItem
                      key={item.id}
                      detailComment={item}
                      listComment={listComment}
                      setListComment={setListComment}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      }
    </PostItemStyle>
  );
};

export default PostItem;
