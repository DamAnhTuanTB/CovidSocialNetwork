import React, { Fragment, useEffect, useState } from 'react';
import { Form, Pagination, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import dataRecord from '../../../../Post/views/list-post/fakeData';
import PostItem from '../../../../Post/views/list-post/views/post-item';
import { ListPostManagementStyled } from './styled';
import ModalDeletePost from '../../../../Profile/views/profile-detail/views/modal-delete';
import ModalCreatePost from '../../../../Post/views/modal-create-post';
import ListInputSearch from './list-input-search';
import moment from 'moment';
import ConvertObjToParamsURL from '../../../../../helpers/convertObjToUrl';

const { TabPane } = Tabs;

const dateFormat = 'DD-MM-YYYY';

const ListPostManagement = (props: any) => {

  const history = useHistory();
  const paramsSeacrh = new URL(window.location.href);
  const paramsUrlSearch = paramsSeacrh.searchParams;

  const [form] = Form.useForm();

  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);
  const [listPost, setListPost] = useState(dataRecord);
  const [currentPage, setCurrentPage] = useState(paramsUrlSearch.get("page") || "1");

  const [valueSearch, setValueSearch] = useState({
    date: null,
    type: "news",
    freeText: "",
    author: "",
  });

  const handleChangePage = (page: any) => {
    history.push(`/admin/post-management${ConvertObjToParamsURL(valueSearch)}&page=${page}`);
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
    const newValueSearch = {};
    if (paramsUrlSearch.get("type")) {
      (newValueSearch as any).type = paramsUrlSearch.get("type");
    }
    if (paramsUrlSearch.get("author")) {
      (newValueSearch as any).author = paramsUrlSearch.get("author");
    }
    if (paramsUrlSearch.get("date")) {
      (newValueSearch as any).date = moment(paramsUrlSearch.get("date"), dateFormat);
    }
    if (paramsUrlSearch.get("freeText")) {
      (newValueSearch as any).freeText = paramsUrlSearch.get("freeText");
    }
    setCurrentPage(paramsUrlSearch.get("page") || "1");

    setValueSearch({
      ...valueSearch,
      ...newValueSearch,
    })
    form.setFieldsValue({
      ...valueSearch,
      ...newValueSearch,
    })
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
      <ListInputSearch valueSearch={valueSearch} dateFormat={dateFormat} form={form} />
      <div className="list-post-container">
        {
          listPost.map((item, index) => {
            const propsPostItem = {
              detailPost: item,
              isAdmin: true,
              handleClickMoreOption: handleClickMoreOption,
            }
            if ((valueSearch as any).type === "pending") {
              (propsPostItem as any).isPostPending = true;
            } else {
              (propsPostItem as any).listPost = listPost;
              (propsPostItem as any).setListPost = setListPost;
              if ((valueSearch as any).type === "my-post") {
                (propsPostItem as any).isAdminOwner = true;
              }
            }
            return (
              <Fragment key={item.id}>
                <PostItem
                  {
                  ...propsPostItem
                  }
                />
              </Fragment>
            )
          }
          )
        }
      </div>

      {/* <Tabs defaultActiveKey={typePost} key={typePost} onChange={handleChangeKey}>
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
                  isPostPending
                  handleClickMoreOption={handleClickMoreOption}
                />
              </Fragment>
            ))
          }
        </TabPane>
      </Tabs> */}

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