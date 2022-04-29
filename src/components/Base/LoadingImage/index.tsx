import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

const LoadingImage = (props: any) => {
  const {
    src = "",
    alt = "",
    className = "",
    ...moreProps
  } = props;
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  }

  useEffect(() => {
    setLoaded(false);
  }, [src])

  return (
    <>
      <img
        style={{ display: loaded ? 'block' : 'none' }}
        src={src}
        alt={alt}
        className={className}
        onLoad={onLoad}
        {...moreProps}
      />
      {!loaded && <Skeleton.Image className={className} />}
    </>
  );
};

export default LoadingImage;