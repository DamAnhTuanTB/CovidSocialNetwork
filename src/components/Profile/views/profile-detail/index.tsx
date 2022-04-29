import { Pagination, Space, Tabs } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import BaseImagePreview from '../../../Base/BaseImagePreview';
import dataRecord from '../../../Post/views/list-post/fakeData';
import PostItem from '../../../Post/views/list-post/views/post-item';
import ModalCreatePost from '../../../Post/views/modal-create-post';
import { ProfileDetailStyled } from './styled';
import ListImage from './views/list-image';
import ModalChangePassword from './views/modal-change-password';
import ModalDeletePost from './views/modal-delete';
import ModalEditProfile from './views/modal-edit-profile';

const ProfileDetail = (props: any) => {
  const { isGuest = false } = props;
  const { TabPane } = Tabs;
  const param: { id_user: any } = useParams();
  const paramsSeacrh = new URL(window.location.href);
  const paramsUrlSearch = paramsSeacrh.searchParams;

  const queryClient = useQueryClient();
  const myProfile : any = queryClient.getQueryData("my-profile");

  const history = useHistory();

  const [type, setType] = useState(paramsUrlSearch.get("type") || "list-image");
  const [currentPage, setCurrentPage] = useState(paramsUrlSearch.get("page") || "1");
  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);
  const [listPost, setListPost] = useState(dataRecord);

  const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false);
  const [isShowModalChangePassword, setIsShowModalChangePassword] = useState(false);

  const handleChangePage = (page: any) => {
    history.push(`?type=${type}&page=${page}`);
  };

  const handleChangeKey = (value: any) => {
    history.push(`?type=${value}`);
  }
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!paramsUrlSearch.get("type")) {
      history.replace("?type=list-image");
      return;
    }
    setCurrentPage(paramsUrlSearch.get("page") || "1");
    setType(paramsUrlSearch.get("type") || "list-image");
  }, [paramsSeacrh.href]);

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
        <BaseImagePreview isLoading className="avatar" src={myProfile?.avatar || "/defaultAvatar.png"} alt="" />
        <div className="name-user">{`${myProfile?.first_name} ${myProfile?.last_name}`}</div>
        <div className="name-tag">@{myProfile?.email}</div>
        {
          !param.id_user && (
            <>
              <div className="button-edit" onClick={() => setIsShowModalEditProfile(true)}>Chỉnh sửa thông tin cá nhân</div>
              <div className="button-change-password" onClick={() => setIsShowModalChangePassword(true)}>Đổi mật khẩu</div>
            </>
          )
        }
      </div>
      <div className="list-post">
        <Tabs defaultActiveKey={type} key={type} onChange={handleChangeKey}>
          <TabPane tab="Ảnh" key="list-image">
            <ListImage />
          </TabPane>
          <TabPane tab="Bài viết" key="my-post">
            {
              listPost.map((item) => (
                <Fragment key={item.id}>
                  <PostItem
                    detailPost={item}
                    isProfile
                    isGuest={isGuest}
                    handleClickMoreOption={handleClickMoreOption}
                    listPost={listPost}
                    setListPost={setListPost}
                  />
                </Fragment>
              ))
            }
          </TabPane>
          {
            !param.id_user && (
              <>
                <TabPane tab="Bài viết đã lưu" key="saved-post">
                  {
                    listPost.map((item) => (
                      <Fragment key={item.id}>
                        <PostItem
                          detailPost={item}
                          isProfile
                          isPostSaved
                          handleClickMoreOption={handleClickMoreOption}
                          listPost={listPost}
                          setListPost={setListPost}
                        />
                      </Fragment>
                    ))
                  }
                </TabPane>
                <TabPane tab="Bài viết đang chờ duyệt" key="pending-post">
                  {
                    listPost.map((item) => (
                      <Fragment key={item.id}>
                        <PostItem
                          detailPost={item}
                          isProfile
                          isPostPending
                          handleClickMoreOption={handleClickMoreOption}
                        />
                      </Fragment>
                    ))
                  }
                </TabPane>
                <TabPane tab="Bài viết bị hủy" key="canceled-post">
                  {
                    listPost.map((item) => (
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
        {
          type !== "list-image" && (
            <div className="pagination">
              <Pagination
                current={+currentPage}
                total={50}
                onChange={handleChangePage}
              />
            </div>
          )
        }
      </div>
      <ModalEditProfile
        {...{
          profile: myProfile,
          isShowModalEditProfile,
          setIsShowModalEditProfile,
          handleConfirmEditProfile,
        }}
      />
      <ModalChangePassword
        {...{
          isShowModalChangePassword,
          setIsShowModalChangePassword,
          handleConfirmEditProfile,
        }}
      />
    </ProfileDetailStyled>
  );
};

ProfileDetail.propTypes = {
  isGuest: PropTypes.bool,
};

export default ProfileDetail;