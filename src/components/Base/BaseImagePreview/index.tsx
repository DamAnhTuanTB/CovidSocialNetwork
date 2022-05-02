import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BaseImagePreviewStyled } from './styled';
import LoadingImage from '../LoadingImage';

const BaseImagePreview = (props: any) => {
  const { src, className, isLoading = false, cancelPreview = false } = props;
  const [isPreview, setIsPreview] = useState(false);

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
          <LoadingImage className={className} src={src} alt="" onClick={handleClickPreview} />
        ) : (
          <img className={className} src={src} alt="" onClick={handleClickPreview} />
        )
      }
    </BaseImagePreviewStyled>
  );
};

export default BaseImagePreview;