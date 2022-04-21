import React, { Fragment, useEffect, useState } from 'react';
import { Pagination, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import dataRecord from '../../../../Post/views/list-post/fakeData';
import PostItem from '../../../../Post/views/list-post/views/post-item';
import { ListPostManagementStyled } from './styled';
import ModalDeletePost from '../../../../Profile/views/profile-detail/views/modal-delete';
import ModalCreatePost from '../../../../Post/views/modal-create-post';

const { TabPane } = Tabs;

const ListPostManagement = (props: any) => {

  const history = useHistory();
  const paramsSeacrh = new URL(window.location.href);
  const paramsUrlSearch = paramsSeacrh.searchParams;

  const [typePost, setTypePost] = useState(paramsUrlSearch.get("typePost") || "list-post");
  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);
  const [listPost, setListPost] = useState(dataRecord);
  const [currentPage, setCurrentPage] = useState(paramsUrlSearch.get("page") || "1");

  const handleChangeKey = (value: any) => {
    history.push(`/admin/post-management?typePost=${value}`);
  }

  const handleChangePage = (page: any) => {
    history.push(`/admin/post-management?typePost=${typePost}&page=${page}`);
  };

  const handleConfirmDelete = (idPost: any) => {
    console.log(13123123, idPost);
  }

  const handleClickMoreOption = (key: any, post: any) => {
    console.log(key, post);

    if (key === "delete-admin") {
      setPostDelete(post);
    }
    if (key === "edit-admin") {
      setPostEdit(post);
    }
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
    <ListPostManagementStyled>
      <ModalDeletePost
        isAdmin
        setPostDelete={setPostDelete}
        itemPost={postDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      <ModalCreatePost
        isAdmin
        isEdit
        itemPost={postEdit}
        setPostEdit={setPostEdit}
      />
      <Tabs defaultActiveKey={typePost} key={typePost} onChange={handleChangeKey}>
        <TabPane tab="Bảng tin" key="list-post">
          {
            listPost.map((item) => (
              <Fragment key={item.id}>
                <PostItem
                  detailPost={item}
                  isAdmin
                  handleClickMoreOption={handleClickMoreOption}
                  listPost={listPost}
                  setListPost={setListPost}
                />
              </Fragment>
            ))
          }
        </TabPane>
        <TabPane tab="Bài viết của bạn" key="my-post">
          {
            listPost.map((item) => (
              <Fragment key={item.id}>
                <PostItem
                  detailPost={item}
                  isAdmin
                  isAdminOwner
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
                  isAdmin
                  isPostDraft
                  handleClickMoreOption={handleClickMoreOption}
                />
              </Fragment>
            ))
          }
        </TabPane>
      </Tabs>

      <div className="pagination">
        <Pagination
          current={+currentPage}
          total={50}
          onChange={handleChangePage}
        />
      </div>
    </ListPostManagementStyled>
  );
};

export default ListPostManagement;