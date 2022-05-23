import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetListImageOther, useGetMyListImage } from '../../../../../../hooks/useGetListImage';
import BaseImagePreview from '../../../../../Base/BaseImagePreview';
import { ListImageStyled } from './styled';

const LOAD_MORE_IMAGE = "Xem thêm";

const ListImage = (props: any) => {
  const { idUser, isGuest = false } = props;
  // const [loading, setLoading] = useState(false);
  const [listImage, setListImage] = useState<any>([]);

  const { dataListMyImage } = useGetMyListImage(!idUser);

  const { dataListImageOther } = useGetListImageOther(idUser);

  useEffect(() => {
    let newListImage = idUser ? dataListImageOther : dataListMyImage;
    if (newListImage) {
      const listImagePost = newListImage?.data[0]?.posts_images ? newListImage?.data[0]?.posts_images?.split(";") : [];
      const listImageComment = newListImage?.data[0]?.comment_images ? newListImage?.data[0]?.comment_images?.split(";") : [];
      setListImage([
        ...listImagePost,
        ...listImageComment
      ])
    }
  }, [idUser, dataListImageOther, dataListMyImage])

  return (
    <ListImageStyled>
      <div className="list-image">
        {
          listImage?.length > 0 ? listImage?.map((item:any, index:any) => {
            if (!item) return null;
            return (
              <div className="item-image" key={index}>
                <BaseImagePreview isLoading className="image" src={item} alt="" />
              </div>
            )
          }) : (
            <div>
              {
                isGuest ? "Người dùng chưa đăng ảnh nào" : "Bạn chưa đăng ảnh nào"
              }
            </div>
          )
        }
      </div>
      {/* <div>
        <Button onClick={handleLoadMoreImage} className="load-more" loading={loading}>{LOAD_MORE_IMAGE}</Button>
      </div> */}
    </ListImageStyled>
  );
};

export default ListImage;