/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CameraOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Progress } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';
import { ModalCreatePostStyled } from './styled';
import { getUrlImage } from '../../../../api/uploadimage';

const ModalCreatePost = (props: any) => {
  const {
    isEdit = false,
    itemPost = {},
    setPostEdit = () => { },
    isShowModalCreate = false,
    setIsShowModalCreate = () => { },
  } = props;
  const refInputFile = useRef(null);
  const [listImage, setListImage] = useState<string[]>([]);
  const [listImageUrl, setListImageUrl] = useState<string[]>([]);
  const [progressUpload, setProgressUpload] = useState(1);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && itemPost?.id) {
      setListImage(itemPost?.image);
      setContent(itemPost?.content);
    }
  }, [itemPost?.id])

  const handleChangeImage = (e: any) => {
    console.log(12312123123);
    
    if (e.target.files.length === 0) return;

    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setListImage([...listImage, fileUrl]);
    getUrlImage(
      e.target.files[0],
      setProgressUpload,
      (url) => {
        setListImageUrl([...listImageUrl, url]);
        setProgressUpload(1);
        e.target.value = null;
      }
    )
  }
  const handleDeleteImage = (indexImage: any) => {
    if (progressUpload !== 1) return;
    const newListImage = [...listImage];
    const newListImageUrl = [...listImageUrl];
    setListImage(newListImage.filter((item, index) => index !== indexImage));
    setListImageUrl(newListImageUrl.filter((item, index) => index !== indexImage));
  }

  const handleCancel = () => {
    if (isEdit) {
      setPostEdit(null);
    } else {
      setIsShowModalCreate(false);
      // setContent("");
      // setListImage([]);
    }
  }

  const onSubmit = () => {

  }
  return (
    <ModalCreatePostStyled
      title={isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
      className="modal-create-post"
      visible={isEdit ? !!itemPost?.id : isShowModalCreate}
      style={{ top: 100 }}
      width={800}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Ok
        </Button>,
      ]}
    >
      <div className="detail-user">
        <img src="/post/avatar_my1.jpg" alt="" />
        <div className="name-user">Tuan cules</div>
      </div>
      <div className="body-modal-create">
        <TextareaAutosize
          className="content-post"
          placeholder="Bạn đang muốn chia sẻ gì thế?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="add-image">
          <div>Thêm ảnh vào bài viết</div>
          <div className="file-input">
            <input ref={refInputFile} disabled={listImage.length >= 3 || progressUpload !== 1} onChange={handleChangeImage} type="file" />
            <CameraOutlined className="camera-icon" />
          </div>
        </div>
        <div className="list-preview-image">
          {
            listImage.length > 0 && listImage.map((imageSrc, index) => (
              <div key={imageSrc + index} className="preview-image">
                <img src={imageSrc} alt="" />
                <div className="reset-button" onClick={() => handleDeleteImage(index)}>
                  <CloseOutlined className="reset-icon" />
                </div>
                {
                  (index > listImageUrl.length - 1 && progressUpload > 0) && (
                    <div className="loading-view">
                      <Progress className="loading" type='circle' width={50} percent={progressUpload} />
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </ModalCreatePostStyled>
  );
};

export default ModalCreatePost;