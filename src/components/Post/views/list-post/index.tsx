/* eslint-disable react/prop-types */
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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
  const [activeTab, setActiveTab] = useState(LIST_POST_CONSTANTS.listTab.find((item) => item.text === paramsUrl.get("sort"))?.id || 1);
  const [listPost, setListPost] = useState(dataRecord);
  const history = useHistory();

  const handleClickTab = (type: any) => {
    history.push(`/post?sort=${type}&page=1`);
  };

  const handleChangePage = (page: any) => {
    history.push(`/post?sort=new&page=${page}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!paramsUrl.get("sort")) {
      history.push("/post?sort=new&page=1");
      return;
    }
    const sortBy = LIST_POST_CONSTANTS.listTab.find((item) => item.text === paramsUrl.get("sort"))?.id || 1;
    const page = paramsUrl.get("page") || 1;
    setActiveTab(sortBy);
    setCurrentPage(+page);
  }, [params.href]);

  return (
    <ListPostComponentStyled>
      <div className="list-post-container">
        <div className="list-post">
          <Filter activeTab={activeTab} handleClickTab={handleClickTab} />
          <div>
            {listPost.map((item) => (
              <PostItem
                key={item.id}
                detailPost={item}
                listPost={listPost}
                setListPost={setListPost}
              />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              current={+currentPage}
              total={50}
              onChange={handleChangePage}
            />
          </div>
        </div>
        <div className="list-hot-post">
          <ListHotPostComponent />
        </div>
      </div>
    </ListPostComponentStyled>
  );
};

export default ListPostComponent;
