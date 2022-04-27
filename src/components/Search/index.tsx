import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import dataRecord from '../Post/views/list-post/fakeData';
import { SearchComponentStyled } from './styled';

const SearchComponent = (props: any) => {
  const { match } = props;

  const params = new URL(window.location.href);
  const paramsUrl = params.searchParams;

  const history = useHistory();

  const [listPost, setListPost] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState("1");

  const handleChangePage = (page: any) => {
    history.push(`?freeText=${searchText}&page=${page}`);
  };

  useEffect(() => {
    window.scrollTo(0,0)
    if (!paramsUrl.get("freeText")) {
      history.push("/post");
    }
    setSearchText(paramsUrl.get("freeText") || "");
    setCurrentPage(paramsUrl.get("page") || "1");
    setListPost([...dataRecord]);
  }, [params.href])

  return (
    <SearchComponentStyled>
      <div className="search-component">
        <div className="title">
          Kết quả tìm kiếm cho: {searchText}
        </div>
        {
          listPost.map((item: any) => (
            <div className="item-post" key={item.id}>
              <img src={item.image[0]} alt="" />
              <div className="detail-post">
                <div className="author">
                  <div className="name-author">{item.user.name}</div>
                  <div className="date">{item.createdAt}</div>
                </div>
                <div className="title-post">
                  {item.title}
                </div>
                <div className="content-post">
                  {item.content.length > 100 ? `${item.content.slice(100)}...` : item.content}
                </div>
              </div>
            </div>
          ))
        }
        <div className="pagination">
          <Pagination
            current={+currentPage}
            total={50}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </SearchComponentStyled>
  );
};

export default SearchComponent;