import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BaseImagePreviewStyled } from './styled';
import LoadingImage from '../LoadingImage';

const BaseImagePreview = (props: any) => {
  const { src, className, isLoading = false, cancelPreview = false } = props;
  const [isPreview, setIsPreview] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [url, setUrl] = useState(src);

  useEffect(() => {
    setLoaded(false);
    setUrl(src);
  }, [src])

  useEffect(() => {
    if (!loaded) {
      setUrl(src + "?" + Math.floor(Math.random() * 100));
    }
  }, [loaded])

  const handleClickPreview = () => {
    if (cancelPreview) return;

    setIsPreview(!isPreview);
  }

  return (
    <BaseImagePreviewStyled className="img-preview">
      {
        isPreview && (
          <div className="preview-image-fixed">
            <img className="image-temp" src={src} alt="" />
            <div className="close-button">
              <CloseOutlined twoToneColor="#FFFFFF" onClick={handleClickPreview} />
            </div>
          </div>
        )
      }
      {
        isLoading ? (
          <LoadingImage loaded={loaded} setLoaded={setLoaded} url={url} setUrl={setUrl} className={className} src={url} alt="" onClick={handleClickPreview} />
        ) : (
          <img className={className} src={url} alt="" onClick={handleClickPreview} />
        )
      }
    </BaseImagePreviewStyled>
  );
};

export default BaseImagePreview;