import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingViews = (props: any) => {
  const { count = 1, height = 1 } = props;
  return <Skeleton count={count} height={height} />;
};
export { LoadingViews };

