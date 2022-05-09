import { HeartTwoTone, LikeTwoTone, MessageTwoTone, MoreOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import handleConvertDateStringToDateTime from '../../helpers/convertDateStringToDate';
import { useGetListPost } from '../../hooks/usePost';
import BaseImagePreview from '../Base/BaseImagePreview';
import dataRecord from '../Post/views/list-post/fakeData';
import SEARCH_CONSTANTS from './constants';
import { SearchComponentStyled } from './styled';

const SearchComponent = (props: any) => {
  const { match } = props;

  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;

  const history = useHistory();
  const limitPerPage = 10;
  const [listPost, setListPost] = useState<any>([]);
  const [totalPost, setTotalPost] = useState(0);
  const [searchText, setSearchText] = useState(paramsUrl.get("freeText") || "");
  const [currentPage, setCurrentPage] = useState("1");

  const handleChangePage = (page: any) => {
    history.push(`?freeText=${searchText}&page=${page}`);
  };

  const { dataPost, isLoadingPost } = useGetListPost({
    freeText: searchText,
    page: currentPage,
    limit: limitPerPage,
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!paramsUrl.get("freeText")) {
      history.push("/post");
    }
    setSearchText(paramsUrl.get("freeText") || "");
    setCurrentPage(paramsUrl.get("page") || "1");
    if (dataPost?.statusCode === 200) {
      setListPost(dataPost?.data);
      setTotalPost(dataPost?.total);
    }

  }, [params.href, dataPost])

  return (
    <SearchComponentStyled>
      <div className="search-component">
        <div className="title">
          {SEARCH_CONSTANTS.title}{searchText}
        </div>
        {
          listPost.map((item: any) => (
            <div className="item-post" key={item?.id}>
              <BaseImagePreview cancelPreview isLoading src={item?.content_images?.split(";")[0]} className="main-image" />
              {/* <img src={item?.content_images?.split(";")[0]} alt="" /> */}
              <div className="detail-post">
                <div className="title-post" onClick={() => history.push(`/post/${item.id}`)}>
                  {item?.title?.length > 60 ? `${item?.title.slice(0, 60)}...` : item?.title}
                </div>
                <div className="content-post">
                  {item?.content_texts?.length > 100 ? `${item?.content_texts.slice(0, 100)}...` : item?.content_texts}
                </div>
                <div className="author">
                  <BaseImagePreview cancelPreview isLoading src={item?.author_avatar || "/post/avatar_my1.jpg"} className="avatar" />
                  <div>
                    <div className="name-author">{item?.author_nick_name}</div>
                    <div className="date">{handleConvertDateStringToDateTime(item?.create_at)}</div>
                  </div>
                </div>
                <div className="interaction-detail">
                  <div className="item-interaction">{item?.totalLike} <LikeTwoTone twoToneColor={"#a3a3a3"} /></div>
                  <div className="item-interaction">{item?.totalComment} <MessageTwoTone twoToneColor="#a3a3a3" /></div>
                  <div className="item-interaction">{item?.totalSave} <HeartTwoTone twoToneColor={"#a3a3a3"} /></div>
                </div>
              </div>
            </div>
          ))
        }
        {
          totalPost > limitPerPage && (
            <div className="pagination">
              <Pagination
                current={+currentPage}
                defaultPageSize={limitPerPage}
                total={totalPost}
                onChange={handleChangePage}
              />
            </div>
          )
        }
      </div>
    </SearchComponentStyled>
  );
};

export default SearchComponent;