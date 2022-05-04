import React, { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import BaseImagePreview from '../../../../Base/BaseImagePreview';
import { ModalListImageStyled } from './styled';

const TITLE_MODAL = "Danh sách ảnh";

const ModalListImage = (props: any) => {
  const {
    idGuest,
    setIdGuest = () => { },
  } = props;

  const [loading, setLoading] = useState(true);

  const handleCancel = () => {
    if (loading) return;

    setIdGuest(null);
  }

  useEffect(() => {
    if (idGuest) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000)
      console.log(idGuest);
    }
  }, [idGuest])

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
          loading ? (
            <div className="loading-spin">
              <ReactLoading type="spinningBubbles" color="#909090" height={100} width={100}/>
            </div>
          ) : (
            <>
              <div className="item-image">
                <BaseImagePreview className="img" isLoading src="https://firebasestorage.googleapis.com/v0/b/fir-upload-image-a79ce.appspot.com/o/file%2Fbarca.jpg?alt=media&token=5d91f27b-eb37-41cb-a174-675538d1a90c" alt="" />
              </div>
              <div className="item-image">
                <BaseImagePreview className="img" isLoading src="/post/backgroundPC.jpg" alt="" />
              </div>
              <div className="item-image">
                <BaseImagePreview className="img" isLoading src="/post/backgroundPC.jpg" alt="" />
              </div>
              <div className="item-image">
                <BaseImagePreview className="img" isLoading src="/post/backgroundPC.jpg" alt="" />
              </div>
              <div className="item-image">
                <BaseImagePreview className="img" isLoading src="/post/backgroundPC.jpg" alt="" />
              </div>
            </>
          )
        }
      </div>
    </ModalListImageStyled>
  );
};

export default ModalListImage;