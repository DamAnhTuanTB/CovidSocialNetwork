import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { ProfileDetailStyled } from './styled';
import { Button, Input, Modal, Tabs } from 'antd';
import dataRecord from '../../../Post/views/list-post/fakeData';
import PostItem from '../../../Post/views/list-post/views/post-item';
import ModalDeletePost from './views/modal-delete';
import ModalEditProfile from './views/modal-edit-profile';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import ModalCreatePost from '../../../Post/views/modal-create-post';

const ProfileDetail = (props: any) => {
  const { isGuest = false } = props;
  const { TabPane } = Tabs;
  const param: { id_user: any } = useParams();
  const [idModalEdit, setIdModalEdit] = useState(null);
  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);
  const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false);
  const handleClickMoreOption = (key: any, post: any) => {
    console.log(key, post);

    if (key === "delete") {
      setPostDelete(post);
    }
    if (key === "edit") {
      setPostEdit(post)
    }
  }
  const handleConfirmDelete = (idPost: any) => {
    console.log(13123123, idPost);
  }
  const handleConfirmEditProfile = (formdata: any) => {
    console.log(12312312312312, formdata);
  }

  return (
    <ProfileDetailStyled>
      <ModalDeletePost
        setPostDelete={setPostDelete}
        itemPost={postDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      <ModalCreatePost
        isEdit
        itemPost={postEdit}
        setPostEdit={setPostEdit}
      />
      <div className="detail-user">
        <img src="/post/avatar_my1.jpg" alt="" />
        <div className="name-user">Lê Tuấn</div>
        <div className="name-tag">@tuancules</div>
        {
          !param.id_user && (
            <>
              <div className="button-edit" onClick={() => setIsShowModalEditProfile(true)}>Chỉnh sửa</div>
              <ModalEditProfile
                {...{
                  isShowModalEditProfile,
                  setIsShowModalEditProfile,
                  handleConfirmEditProfile,
                }}
              />
            </>
          )
        }
      </div>
      <div className="list-post">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bài viết" key="1">
            {
              dataRecord.map((item) => (
                <Fragment key={item.id}>
                  <PostItem
                    detailPost={item}
                    isProfile
                    isGuest={isGuest}
                    handleClickMoreOption={handleClickMoreOption}
                  />
                </Fragment>
              ))
            }
          </TabPane>
          {
            !param.id_user && (
              <>
                <TabPane tab="Bài viết đã lưu" key="2">
                  {
                    dataRecord.map((item) => (
                      <Fragment key={item.id}>
                        <PostItem
                          detailPost={item}
                          isProfile
                          isPostSaved
                          handleClickMoreOption={handleClickMoreOption}
                        />
                      </Fragment>
                    ))
                  }
                </TabPane>
                <TabPane tab="Bài viết đang chờ duyệt" key="3">
                  {
                    dataRecord.map((item) => (
                      <Fragment key={item.id}>
                        <PostItem
                          detailPost={item}
                          isProfile
                          isPostDraft
                          handleClickMoreOption={handleClickMoreOption}
                        />
                      </Fragment>
                    ))
                  }
                </TabPane>
              </>
            )
          }
        </Tabs>
      </div>
    </ProfileDetailStyled>
  );
};

ProfileDetail.propTypes = {
  isGuest: PropTypes.bool,
};

export default ProfileDetail;