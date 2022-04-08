import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { BaseImagePreviewStyled } from './styled';

const BaseImagePreview = (props: any) => {
  const { src, className } = props;
  const [isPreview, setIsPreview] = useState(false);
  return (
    <BaseImagePreviewStyled className="img-preview">
      {
        isPreview && (
          <div className="preview-image-fixed">
            <img className="image-temp" src={src} alt="" />
            <div className="close-button">
              <CloseOutlined twoToneColor="#FFFFFF" onClick={() => setIsPreview(false)} />
            </div>
          </div>
        )
      }
      <img className={className} src={src} alt="" onClick={() => setIsPreview(true)} />
    </BaseImagePreviewStyled>
  );
};

export default BaseImagePreview;