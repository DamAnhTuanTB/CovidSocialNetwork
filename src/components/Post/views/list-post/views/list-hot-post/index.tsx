/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleConvertDateStringToDateTime from '../../../../../../helpers/convertDateStringToDate';
import { useGetListPost } from '../../../../../../hooks/usePost';
import { ListHotPostStyled } from './styled';

const TITLE = "Có thể bạn quan tâm";

const ListHotPostComponent = (props: any) => {
  const { match } = props;
  const history = useHistory();
  const [listPost, setListPost] = useState([]);
  const { dataPost, isLoadingPost } = useGetListPost({
    sortBy: "totalComment",
    page: 1,
    limit: 6,
  });



  useEffect(() => {
    if (dataPost?.statusCode === 200) {
      setListPost(dataPost?.data);
    }
  }, [dataPost])


  return (
    <ListHotPostStyled>
      <div className="title">
        {TITLE}
      </div>
      <div className="posts">
        {
          listPost.map((item: any) => (
            <div className="post-item" key={item.id}>
              <img src={item?.author_avatar} alt="" />
              <div className="post-detail">
                <div className="post-title" onClick={() => history.push(`/post/${item.id}`)}>
                  {
                    item?.title.length > 40 ? item?.title.slice(0, 40) + "..." : item?.title
                  }
                </div>
                <div className="post-author">
                  <div className="name-author">
                    <Link to={`/profile/${item.author_id}`}>{item?.author_nick_name}</Link>
                  </div>
                  <div className="create-at">
                    {handleConvertDateStringToDateTime(item?.create_at)}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </ListHotPostStyled>
  );
};

export default ListHotPostComponent;
