import React, { Fragment, useEffect, useState } from 'react';
import { Form, Pagination, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import dataRecord from '../../../../Post/views/list-post/fakeData';
import PostItem from '../../../../Post/views/list-post/views/post-item';
import { ListPostManagementStyled } from './styled';
import ModalDeletePost from '../../../../Profile/views/profile-detail/views/modal-delete';
import ModalCreatePost from '../../../../Post/views/modal-create-post';
import ListInputSearch from './list-input-search';
import moment from 'moment';
import ConvertObjToParamsURL from '../../../../../helpers/convertObjToUrl';
import LIST_POST_MANAGEMENT_CONSTANTS from './constants';
import { useGetListPostAdmin, useGetListPostByUserAdmin } from '../../../../../hooks/admin/usePostAdmin';

const { TabPane } = Tabs;

const dateFormat = 'DD-MM-YYYY';

const ListPostManagement = (props: any) => {
  const {
    isSearchByUser = false,
  } = props;

  const history = useHistory();
  const paramsSeacrh = new URL(window.location.href);
  const paramsUrlSearch = paramsSeacrh.searchParams;

  const param: { id_user: any } = useParams();

  const [form] = Form.useForm();

  const [postDelete, setPostDelete] = useState(null);
  const [postEdit, setPostEdit] = useState(null);
  const [listPost, setListPost] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const limitPostPerPage = 2;
  const [currentPage, setCurrentPage] = useState(paramsUrlSearch.get("page") || "1");

  const [valueSearch, setValueSearch] = useState({
    createAt: null,
    typePost: "success",
    title: "",
    nickName: "",
    typeSort: "DESC",
    limit: limitPostPerPage,
  });

  const { dataPost, isLoadingPost } = useGetListPostAdmin({...valueSearch, page: currentPage}, !param.id_user);

  const { 
    dataPostByUser, refetchPostByUser, isLoadingPostByUser, isFetchingPostByUser 
  } = useGetListPostByUserAdmin({...valueSearch, page: currentPage}, param.id_user)
  console.log(11111, param.id_user);


  const handleChangePage = (page: any) => {
    console.log(page);
    
    const newValueSearch = {...valueSearch};
    newValueSearch.createAt = (newValueSearch as any)?.createAt?.format(dateFormat);
    console.log(newValueSearch);
    
    history.push(`${ConvertObjToParamsURL(newValueSearch)}&page=${page}`);
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
    if (paramsUrlSearch.get("typePost")) {
      (newValueSearch as any).typePost = paramsUrlSearch.get("typePost");
    }
    if (paramsUrlSearch.get("nickName")) {
      (newValueSearch as any).nickName = paramsUrlSearch.get("nickName");
    } else {
      (newValueSearch as any).nickName = "";
    }
    if (paramsUrlSearch.get("createAt")) {
      (newValueSearch as any).createAt = moment(paramsUrlSearch.get("createAt"), dateFormat);
    } else {
      (newValueSearch as any).createAt = null;
    }
    if (paramsUrlSearch.get("title")) {
      (newValueSearch as any).title = paramsUrlSearch.get("title");
    } else {
      (newValueSearch as any).title = "";
    }
    if (paramsUrlSearch.get("typeSort")) {
      (newValueSearch as any).typeSort = paramsUrlSearch.get("typeSort");
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

  useEffect(() => {
    if (!isSearchByUser) {
      setListPost(dataPost?.data);
      setTotalPost(dataPost?.total);
    } else {
      setListPost(dataPostByUser?.data);
      setTotalPost(dataPostByUser?.total);
    }
  }, [dataPost, dataPostByUser])

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
      <div className="title">
        {
          isSearchByUser ? (
            <>
              {LIST_POST_MANAGEMENT_CONSTANTS.titleFindByUser}
              <span>{"123123123"}</span>
            </>
          ) : (
            <>{LIST_POST_MANAGEMENT_CONSTANTS.title}</>
          )
        }

      </div>
      <ListInputSearch valueSearch={valueSearch} dateFormat={dateFormat} form={form} isSearchByUser={isSearchByUser} />
      <div className="list-post-container">
        {
          listPost?.length > 0 && listPost.map((item: any, index) => {
            const propsPostItem = {
              detailPost: item,
              isAdmin: true,
              handleClickMoreOption: handleClickMoreOption,
            }
            if ((valueSearch as any).typePost === "pending") {
              (propsPostItem as any).isPostPending = true;
            } else if ((valueSearch as any).typePost === "cancel") {
              (propsPostItem as any).isPostCancelAdmin = true;
            } else {
              (propsPostItem as any).listPost = listPost;
              (propsPostItem as any).setListPost = setListPost;
              if ((valueSearch as any).typePost === "success_admin") {
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

      {
        totalPost > limitPostPerPage && (
          <div className="pagination">
            <Pagination
              current={+currentPage}
              total={totalPost}
              defaultPageSize={limitPostPerPage}
              onChange={handleChangePage}
            />
          </div>
        )
      }
    </ListPostManagementStyled>
  );
};

export default ListPostManagement;