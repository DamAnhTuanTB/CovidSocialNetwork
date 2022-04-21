import { Pagination, Tabs } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import dataRecord from '../../../Post/views/list-post/fakeData';
import PostItem from '../../../Post/views/list-post/views/post-item';
import ModalCreatePost from '../../../Post/views/modal-create-post';
import { ProfileDetailStyled } from './styled';
import ModalDeletePost from './views/modal-delete';
import ModalEditProfile from './views/modal-edit-profile';

const ProfileDetail = (props: any) => {
  const { isGuest = false } = props;
  const { TabPane } = Tabs;
  const param: { id_user: any } = useParams();
  const paramsSeacrh = new URL(window.location.href);
  const paramsUrlSearch = paramsSeacrh.searchParams;

  const history = useHistory();

  const [typePost, setTypePost] = useState(paramsUrlSearch.get("typePost") || "my-post");
  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);
  const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false);
  const [listPost, setListPost] = useState(dataRecord);
  const [currentPage, setCurrentPage] = useState(paramsUrlSearch.get("page") || "1");

  const handleChangePage = (page: any) => {
    history.push(`profile?typePost=${typePost}&page=${page}`);
  };

  const handleChangeKey = (value: any) => {
    history.push(`/profile?typePost=${value}`);
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
    if (!paramsUrlSearch.get("typePost")) {
      history.push("?typePost=my-post");
      return;
    }
    setCurrentPage(paramsUrlSearch.get("page") || "1");
    setTypePost(paramsUrlSearch.get("typePost") || "my-post");
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
        <Tabs defaultActiveKey={typePost} key={typePost} onChange={handleChangeKey}>
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
                <TabPane tab="Bài viết đã lưu" key="saved">
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
                <TabPane tab="Bài viết đang chờ duyệt" key="unapproved">
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
        <div className="pagination">
          <Pagination
            current={+currentPage}
            total={50}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </ProfileDetailStyled>
  );
};

ProfileDetail.propTypes = {
  isGuest: PropTypes.bool,
};

export default ProfileDetail;