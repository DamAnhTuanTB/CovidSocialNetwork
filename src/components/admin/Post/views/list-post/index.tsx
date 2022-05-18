/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Pagination } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import ConvertObjToParamsURL from '../../../../../helpers/convertObjToUrl';
import { useGetListPostAdmin, useGetListPostByUserAdmin } from '../../../../../hooks/admin/usePostAdmin';
import PostItem from '../../../../Post/views/list-post/views/post-item';
import ModalCreatePost from '../../../../Post/views/modal-create-post';
import ModalDeletePost from '../../../../Profile/views/profile-detail/views/modal-delete';
import LIST_POST_MANAGEMENT_CONSTANTS from './constants';
import ListInputSearch from './list-input-search';
import { ListPostManagementStyled } from './styled';

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
  const [listPost, setListPost] = useState<any>([]);
  const [totalPost, setTotalPost] = useState(0);
  const limitPostPerPage = 10;
  const [currentPage, setCurrentPage] = useState(paramsUrlSearch.get("page") || "1");
  const initValueSearch = {
    create_at: null,
    typePost: "success",
    title: "",
    nick_name: "",
    typeSort: "DESC",
    limit: limitPostPerPage,
  }

  const [valueSearch, setValueSearch] = useState(initValueSearch);

  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const queryClient = useQueryClient();
  const profileAdmin: any = queryClient.getQueryData("profile-admin");

  const { dataPost, isLoadingPost } = useGetListPostAdmin({ ...valueSearch, page: currentPage }, !param.id_user);

  const {
    dataPostByUser, isLoadingPostByUser
  } = useGetListPostByUserAdmin({ ...valueSearch, page: currentPage }, param.id_user)


  const handleChangePage = (page: any) => {
    console.log(page);

    const newValueSearch = { ...valueSearch };
    delete (newValueSearch as any).limit
    newValueSearch.create_at = (newValueSearch as any)?.create_at?.format(dateFormat);

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
    if (paramsUrlSearch.get("nick_name")) {
      (newValueSearch as any).nick_name = paramsUrlSearch.get("nick_name");
    } else {
      (newValueSearch as any).nick_name = "";
    }
    if (paramsUrlSearch.get("create_at")) {
      (newValueSearch as any).create_at = moment(paramsUrlSearch.get("create_at"), dateFormat);
    } else {
      (newValueSearch as any).create_at = null;
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
      ...initValueSearch,
      ...newValueSearch,
    })
    form.setFieldsValue({
      ...initValueSearch,
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
      <ModalCreatePost
        isAdmin
        isShowModalCreate={isShowModalCreate}
        setIsShowModalCreate={setIsShowModalCreate}
        profile={profileAdmin}
      />
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
      <div className="title-container">
        <div className="title">
          {
            isSearchByUser ? (
              <>
                {LIST_POST_MANAGEMENT_CONSTANTS.titleFindByUser}
                <span>{listPost?.length && listPost[0]?.author_nick_name}</span>
              </>
            ) : (
              <>{LIST_POST_MANAGEMENT_CONSTANTS.title}</>
            )
          }

        </div>
        <Button type="primary" onClick={() => setIsShowModalCreate(true)}>{LIST_POST_MANAGEMENT_CONSTANTS.createPost}</Button>
      </div>
      <ListInputSearch valueSearch={valueSearch} dateFormat={dateFormat} form={form} isSearchByUser={isSearchByUser} />
      <div className="list-post-container">
        {
          (listPost?.length === 0 && !isLoadingPost && !isLoadingPostByUser) && (
            <div className="no-post">
              {LIST_POST_MANAGEMENT_CONSTANTS.noPost}
            </div>
          )
        }
        { 
          listPost?.length > 0 && listPost.map((item: any, index: any) => {
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