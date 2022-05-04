/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { ListHotPostStyled } from './styled';

const TITLE = "Có thể bạn quan tâm";

const ListHotPostComponent = (props: any) => {
  const { match } = props;
  return (
    <ListHotPostStyled>
      <div className="title">
        {TITLE}
      </div>
      <div className="posts">
        <div className="post-item">
          <img src="/post/avatar_my1.jpg" alt="" />
          <div className="post-detail">
            <div className="post-title">
              Monster Box và
            </div>
            <div className="post-author">
              <div className="name-author">
                <Link to="/">Tuan</Link>
              </div>
              <div className="create-at">
                06/05/2020
              </div>
            </div>
          </div>
        </div>
        <div className="post-item">
          <img src="/post/avatar_my1.jpg" alt="" />
          <div className="post-detail">
            <div className="post-title">
              Monster Box và bình minh mới của YouTube
            </div>
            <div className="post-author">
              <div className="name-author">
                Tuan
              </div>
              <div className="create-at">
                06/05/2020
              </div>
            </div>
          </div>
        </div>
        <div className="post-item">
          <img src="/post/avatar_my1.jpg" alt="" />
          <div className="post-detail">
            <div className="post-title">
              Monster Box và bình minh mới của YouTube
            </div>
            <div className="post-author">
              <div className="name-author">
                Tuan
              </div>
              <div className="create-at">
                06/05/2020
              </div>
            </div>
          </div>
        </div>
      </div>
    </ListHotPostStyled>
  );
};

export default ListHotPostComponent;
