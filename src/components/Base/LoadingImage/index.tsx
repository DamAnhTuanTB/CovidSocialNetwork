import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { BaseLoadingImageStyled } from './styled';

const LoadingImage = (props: any) => {
  const {
    src = "",
    alt = "",
    className = "",
    loaded = false,
    setLoaded = () => {},
    url = "",
    setUrl = () => {},
    ...moreProps
  } = props;
  // const [loaded, setLoaded] = useState(false);
  // const [url, setUrl] = useState(src);

  const onLoad = () => {
    setLoaded(true);
  }

  // useEffect(() => {
  //   setLoaded(false);
  //   setUrl(src);
  // }, [src])

  // useEffect(() => {
  //   if (!loaded) {
  //     setUrl(src + "?" + Math.floor(Math.random() * 100));
  //   }
  // }, [loaded])

  return (
    <BaseLoadingImageStyled>
      <img
        style={{ display: loaded ? 'block' : 'none' }}
        src={url}
        alt={alt}
        className={className}
        onLoad={onLoad}
        {...moreProps}
      />
      {!loaded && <Skeleton.Image className={`${className} loading-image`} />}
    </BaseLoadingImageStyled>
  );
};

export default LoadingImage;