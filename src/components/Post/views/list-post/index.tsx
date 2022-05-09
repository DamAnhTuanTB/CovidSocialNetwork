/* eslint-disable react/prop-types */
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGetListPost } from '../../../../hooks/usePost';
import LIST_POST_CONSTANTS from './constant';
import dataRecord from './fakeData';
import { ListPostComponentStyled } from './styled';
import Filter from "./views/filter";
import ListHotPostComponent from './views/list-hot-post';
import PostItem from './views/post-item';

const ListPostComponent = (props: any) => {
  const { match } = props;
  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);
  const limitPerPage = 10;
  const [activeTab, setActiveTab] = useState(paramsUrl.get("sort") || LIST_POST_CONSTANTS.listTab[0].key);
  const [listPost, setListPost] = useState([]);
  const history = useHistory();

  const handleClickTab = (type: any) => {
    history.push(`/post?sort=${type}&page=1`);
  };

  const handleChangePage = (page: any) => {
    history.push(`/post?sort=${activeTab}&page=${page}`);
  };

  const { dataPost, isLoadingPost } = useGetListPost({
    sortBy: LIST_POST_CONSTANTS.listTab.find((item) => item.key === activeTab)?.value,
    page: currentPage,
    limit: limitPerPage,
  });


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!paramsUrl.get("sort")) {
      history.replace("/post?sort=new&page=1");
      return;
    }
    const sortBy = paramsUrl.get("sort") || LIST_POST_CONSTANTS.listTab[0].key;
    const page = paramsUrl.get("page") || 1;
    setActiveTab(sortBy);
    setCurrentPage(+page);

    if (dataPost?.statusCode === 200) {
      setListPost(dataPost?.data);
      setTotalPost(dataPost?.total);
    }
  }, [params.href, dataPost]);

  return (
    <ListPostComponentStyled>
      <div className="list-post-container">
        <div className="list-post">
          <Filter activeTab={activeTab} handleClickTab={handleClickTab} />
          <div>
            {listPost.map((item: any) => (
              <PostItem
                key={item.id}
                detailPost={item}
                listPost={listPost}
                setListPost={setListPost}
              />
            ))}
          </div>
          {
            totalPost > 0 && (
              <div className="pagination">
                <Pagination
                  defaultPageSize={limitPerPage}
                  current={+currentPage}
                  total={totalPost}
                  onChange={handleChangePage}
                />
              </div>
            )
          }
        </div>
        <div className="list-hot-post">
          <ListHotPostComponent />
        </div>
      </div>
    </ListPostComponentStyled>
  );
};

export default ListPostComponent;
