// @ts-nocheck

import { CameraOutlined, CloseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import React, { useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { getUrlImage } from '../../../../../../../../api/uploadimage';
import POST_ITEM_CONSTANTS from '../../constants';

const InputComment = (props: any) => {
  const { 
    idPost,
    refTextArea,
   } = props;
  const [prog, setProg] = useState(1);
  const [imagePreview, setImagePreview] = useState();
  const [imageUrlComment, setImageUrlComment] = useState();

  const refInputFile = useRef(null);

  const handleChangeImage = (e: any) => {
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

  const handleChangeInput = (e: any) => {

  }

  return (
    <div className="input-comment-container">
      {/* bình luận */}
      <div className="input-comment">
        <img className="avatar-user" src="/post/avatar_my1.jpg" alt="" />
        <div className="inputs">
          <ReactTextareaAutosize
            placeholder={POST_ITEM_CONSTANTS.comment.placeholder}
            onChange={handleChangeInput}
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
          <>
            <div className="preview-image">
              <img src={imagePreview} alt="" />
              {
                prog === 0 && (
                  <div className="reset-button" onClick={() => { refInputFile.current.value = null; setImagePreview(null); }}>
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