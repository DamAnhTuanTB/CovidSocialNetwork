/* eslint-disable react/prop-types */
import { CameraOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Progress } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { createPostAdmin, updatePostAdmin } from '../../../../api/admin/post';
import { createPost, updatePost } from '../../../../api/post';
import { getUrlImage } from '../../../../api/uploadimage';
import toastCustom from '../../../../helpers/toastCustom';
import MODAL_CREATE_POST_CONSTANTS from './constants';
import { ModalCreatePostStyled } from './styled';

const ModalCreatePost = (props: any) => {
  const {
    isAdmin = false,
    isEdit = false,
    isDetail = false,
    itemPost = {},
    setPostEdit = () => { },
    isShowModalCreate = false,
    setIsShowModalCreate = () => { },
    profile = {}
  } = props;
  const history = useHistory();
  const queryClient = useQueryClient();

  const refInputFile = useRef(null);
  const [listImage, setListImage] = useState<string[]>([]);
  const [listImageUrl, setListImageUrl] = useState<string[]>([]);
  const [progressUpload, setProgressUpload] = useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const mutationCreatePost = useMutation(isAdmin ? createPostAdmin : createPost);
  const mutationUpdatePost = useMutation(isAdmin ? updatePostAdmin : updatePost);

  useEffect(() => {
    if (isEdit && itemPost?.id) {
      setListImage(itemPost?.content_images?.split(";"));
      setListImageUrl(itemPost?.content_images?.split(";"));
      setContent(itemPost?.content_texts);
      setTitle(itemPost?.title);
    }
  }, [itemPost?.id])

  const handleChangeImage = (e: any) => {
    if (e.target.files.length === 0) return;

    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setListImage([...listImage, fileUrl]);
    setProgressUpload(1);
    getUrlImage(
      e.target.files[0],
      setProgressUpload,
      (url) => {
        setListImageUrl([...listImageUrl, url]);
        setProgressUpload(0);
        e.target.value = null;
      }
    )
  }
  const handleDeleteImage = (indexImage: any) => {
    if (progressUpload) return;
    const newListImage = [...listImage];
    const newListImageUrl = [...listImageUrl];
    setListImage(newListImage.filter((item, index) => index !== indexImage));
    setListImageUrl(newListImageUrl.filter((item, index) => index !== indexImage));
  }

  const handleCancel = () => {
    if (isEdit) {
      setPostEdit(null);
    } else {
      setTitle("");
      setContent("");
      setListImage([]);
      setListImageUrl([]);
      setIsShowModalCreate(false);
    }
  }

  const onSubmit = () => {
    setLoadingSubmit(true);
    const bodyCreatePost = {
      content_texts: content,
      content_images: listImageUrl.join(";"),
      title: title,
    }
    if (isEdit) {
      mutationUpdatePost.mutate(
        {
          idPost: itemPost?.id,
          ...bodyCreatePost,
        },
        {
          onSuccess: (data) => {
            setLoadingSubmit(false);
            if (data?.statusCode === 200) {
              toastCustom({
                mess: MODAL_CREATE_POST_CONSTANTS.successMessage.edit,
                type: "success",
              });
              if (isAdmin) {
                if (isDetail) {
                  queryClient.invalidateQueries('admin-detail-post');
                } else {
                  history.push('/admin/post-management?typePost=success_admin');
                  queryClient.invalidateQueries('admin-all-posts');
                }
              } else {
                queryClient.invalidateQueries('my-posts');
                history.push(`/profile?type=pending-post`);
              }
              handleCancel();
            }
          },
          onError: (err) => {
            setLoadingSubmit(false);
            console.log(err);
          }
        }
      )
    } else {
      mutationCreatePost.mutate(bodyCreatePost, {
        onSuccess: (data) => {
          setLoadingSubmit(false);
          if (data?.statusCode === 201) {
            toastCustom({
              mess: MODAL_CREATE_POST_CONSTANTS.successMessage.create,
              type: "success",
            })
          }
          if (isAdmin) {
            history.push('/admin/post-management?typePost=success_admin');
            queryClient.invalidateQueries('admin-all-posts');
          } else {
            queryClient.invalidateQueries('my-posts');
            history.push(`/profile?type=pending-post`);
          }
          handleCancel();
        },
        onError: (err: any) => {
          setLoadingSubmit(true);
          console.log(err);
          // const dataErr = err?.response;
          // if (dataErr?.data?.statusCode === 400) {
          //   toastCustom({
          //     mess: dataErr?.data?.message,
          //     type: "error",
          //   })
          // }
        }
      });
    }
  }
  return (
    <ModalCreatePostStyled
      title={isEdit ? MODAL_CREATE_POST_CONSTANTS.title.edit : MODAL_CREATE_POST_CONSTANTS.title.create}
      className="modal-create-post"
      visible={isEdit ? !!itemPost?.id : isShowModalCreate}
      style={{ top: 100 }}
      width={800}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {MODAL_CREATE_POST_CONSTANTS.cancel}
        </Button>,
        <Button loading={loadingSubmit} key="submit" type="primary" disabled={!title || !content || listImage.length < 1 || !!progressUpload} onClick={onSubmit}>
          {MODAL_CREATE_POST_CONSTANTS.submit}
        </Button>,
      ]}
    >
      <div className="detail-user">
        <img src={(isEdit ? itemPost?.author_avatar : profile?.avatar) || "/defaultAvatar.png"} alt="" />
        <div className="name-user">{isEdit ? itemPost?.author_nick_name : profile?.nick_name}</div>
      </div>
      <div className="body-modal-create">
        <Input
          className="title-post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={MODAL_CREATE_POST_CONSTANTS.placeholder.title}
          maxLength={100}
        />
        <Divider />
        <TextareaAutosize
          className="content-post"
          placeholder={MODAL_CREATE_POST_CONSTANTS.placeholder.content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="add-image">
          <div>{MODAL_CREATE_POST_CONSTANTS.placeholder.image}</div>
          <div className="file-input">
            <input ref={refInputFile} disabled={listImage.length >= 3 || !!progressUpload} onChange={handleChangeImage} type="file" />
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