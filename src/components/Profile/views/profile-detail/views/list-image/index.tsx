import { Button } from 'antd';
import React, { useState } from 'react';
import BaseImagePreview from '../../../../../Base/BaseImagePreview';
import { ListImageStyled } from './styled';

const LOAD_MORE_IMAGE = "Xem thêm";

const ListImage = (props: any) => {
  const [loading, setLoading] = useState(false);
  
  const handleLoadMoreImage = () => {
    setLoading(true);
  }
  return (
    <ListImageStyled>
      <div className="list-image">
        <div className="item-image">
          <BaseImagePreview src="/post/backgroundPC.jpg" alt="" />
        </div>
        <div className="item-image">
          <BaseImagePreview src="/post/backgroundPC.jpg" alt="" />
        </div>
        <div className="item-image">
          <BaseImagePreview src="/post/backgroundPC.jpg" alt="" />
        </div>
        <div className="item-image">
          <BaseImagePreview src="/post/backgroundPC.jpg" alt="" />
        </div>
        <div className="item-image">
          <BaseImagePreview src="/post/backgroundPC.jpg" alt="" />
        </div>
      </div>
      <div>
        <Button onClick={handleLoadMoreImage} className="load-more" loading={loading}>{LOAD_MORE_IMAGE}</Button>
      </div>
    </ListImageStyled>
  );
};

export default ListImage;