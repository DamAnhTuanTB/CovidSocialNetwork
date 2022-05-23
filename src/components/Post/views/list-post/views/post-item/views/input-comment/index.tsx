// @ts-nocheck

import { CameraOutlined, CloseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { createCommentAdmin } from '../../../../../../../../api/admin/post';
import { createComment } from '../../../../../../../../api/post';
import { getUrlImage } from '../../../../../../../../api/uploadimage';
import BaseImagePreview from '../../../../../../../Base/BaseImagePreview';
import POST_ITEM_CONSTANTS from '../../constants';

const InputComment = (props: any) => {
  const {
    isAdmin = false,
    idPost,
    detailPost = {},
    refTextArea,
  } = props;
  const [prog, setProg] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [imageUrlComment, setImageUrlComment] = useState();

  const refInputFile = useRef(null);

  const queryClient = useQueryClient();
  const myProfile: any = queryClient.getQueryData("my-profile");

  const mutationCreateComment = useMutation(isAdmin ? createCommentAdmin : createComment);

  const handleChangeImage = (e: any) => {
    setProg(1);
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setImagePreview(fileUrl);

    getUrlImage(
      e.target.files[0],
      setProg,
      (url) => {
        setImageUrlComment(url);
        setProg(0);
      }
    )
  }

  const checkKeyEnter = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (commentText) {
        handleSubmitComment();
      }
    }
  }

  const handleSubmitComment = (e: any) => {
    if (prog > 0) return;

    const dataComment = {
      postId: idPost,
      content_texts: commentText,
      authorId: detailPost?.author_id,
    }

    if (imageUrlComment) {
      dataComment.content_images = imageUrlComment;
    }

    mutationCreateComment.mutate(
      dataComment,
      {
        onSuccess: (data) => {
          if (data?.statusCode === 201) {
            // reset state
            setCommentText("");
            setImagePreview(null);
            setImageUrlComment(null);

            if (isAdmin) {
              queryClient.invalidateQueries("admin-comments-post");
              queryClient.invalidateQueries("admin-detail-post");
            } else {
              queryClient.invalidateQueries("comments-post");
              queryClient.invalidateQueries("detail-post");
            }
            
          }
        }
      }
    )
    
    
  }

  return (
    <div className="input-comment-container">
      {/* bình luận */}
      <div className="input-comment">

        {/* <img className="avatar-user" src={myProfile?.avatar || "/defaultAvatar.png"} alt="" /> */}
        <BaseImagePreview cancelPreview isLoading className="avatar-user" src={myProfile?.avatar || "/defaultAvatar.png"} alt="" />
        <div className="inputs">
          <ReactTextareaAutosize
            placeholder={POST_ITEM_CONSTANTS.comment.placeholder}
            // onChange={handleChangeInput}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            className="text-input"
            ref={refTextArea}
            onKeyDown={checkKeyEnter}
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
          <>
            <div className="preview-image">
              <img src={imagePreview} alt="" />
              {
                prog === 0 && (
                  <div
                    className="reset-button"
                    onClick={() => {
                      refInputFile.current.value = null;
                      setImagePreview(null);
                      setImageUrlComment(null);
                    }}
                  >
                    <CloseOutlined className="reset-icon" />
                  </div>
                )
              }
              {
                prog > 0 && (
                  <div className="loading-view">
                    <Progress className="loading" type='circle' width={50} percent={prog} />
                  </div>
                )
              }
            </div>
          </>
        )
      }
    </div>
  );
};

export default InputComment;