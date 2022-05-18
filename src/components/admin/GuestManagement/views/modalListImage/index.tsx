import React, { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { useGetListImageByIdGuest } from '../../../../../hooks/admin/useGuestAdmin';
import BaseImagePreview from '../../../../Base/BaseImagePreview';
import { ModalListImageStyled } from './styled';

const TITLE_MODAL = "Danh sách ảnh";

const ModalListImage = (props: any) => {
  const {
    idGuest,
    setIdGuest = () => { },
  } = props;

  // const [loading, setLoading] = useState(false);
  const [listImage, setListImage] = useState<any>([]);

  const handleCancel = () => {
    if (isLoadingListImageGuest) return;

    setIdGuest(null);
    setListImage([]);
  }

  const { dataListImageGuest, isLoadingListImageGuest } = useGetListImageByIdGuest(idGuest);

  useEffect(() => {
    if (idGuest && dataListImageGuest) {
      const listImagePost = dataListImageGuest?.data[0]?.posts_images ? dataListImageGuest?.data[0]?.posts_images?.split(";") : [];
      const listImageComment = dataListImageGuest?.data[0]?.comment_images ? dataListImageGuest?.data[0]?.comment_images?.split(";") : [];
      setListImage([
        ...listImagePost,
        ...listImageComment
      ])
      
    }
  }, [idGuest, dataListImageGuest])

  return (
    <ModalListImageStyled
      title={TITLE_MODAL}
      centered
      visible={!!idGuest}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <div className="list-image">
        {
          isLoadingListImageGuest ? (
            <div className="loading-spin">
              <ReactLoading type="spinningBubbles" color="#909090" height={100} width={100} />
            </div>
          ) : (
            <>
              {
                (listImage && listImage?.length > 0) && listImage?.map((item: any, index: any) => {
                  const key = item + index;
                  if (!item) return null;
                  return (
                    <div className="item-image" key={key}>
                      <BaseImagePreview className="img" isLoading src={item} alt="" />
                    </div>
                  )
                })
              }
              {
                (listImage && listImage?.length === 0) && (
                  <div className="no-image-text">Bệnh nhân chưa đăng tải ảnh nào</div>
                )
              }
            </>
          )
        }
      </div>
    </ModalListImageStyled>
  );
};

export default ModalListImage;