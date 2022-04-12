/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CameraOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';
import { ModalCreatePostStyled } from './styled';

const ModalCreatePost = (props: any) => {
  const {
    isEdit = false,
    idModalEdit = null,
    itemPost = {},
    setIdModalEdit = () => { }
  } = props;
  const refInputFile = useRef(null);
  const [listImage, setListImage] = useState<string[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && idModalEdit) {
      setListImage(itemPost?.image);
      setContent(itemPost?.content);
    }
  }, [idModalEdit])

  const handleChangeImage = (e: any) => {
    if (e.target.files.length === 0) return;

    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setListImage([...listImage, fileUrl]);
  }
  const handleDeleteImage = (indexImage: any) => {
    const newListImage = [...listImage];
    setListImage(newListImage.filter((item, index) => index !== indexImage))
  }

  const handleCancel = () => {
    setIdModalEdit(null);
  }

  const onSubmit = () => {

  }
  return (
    <ModalCreatePostStyled
      title="Chỉnh sửa bài viết"
      className="modal-create-post"
      visible={idModalEdit === itemPost.id}
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
            <input ref={refInputFile} disabled={listImage.length >= 3} onChange={handleChangeImage} type="file" />
            <CameraOutlined className="camera-icon" />
          </div>
        </div>
        <div className="list-preview-image">
          {
            listImage.length > 0 && listImage.map((imageSrc, index) => (
              <div className="preview-image">
                <img src={imageSrc} alt="" />
                <div className="reset-button" onClick={() => handleDeleteImage(index)}>
                  <CloseOutlined className="reset-icon" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </ModalCreatePostStyled>
  );
};

export default ModalCreatePost;