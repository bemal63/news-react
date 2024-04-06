import * as React from "react";
import Skeleton from "../../components/Skeleton/Skeleton";
import { DirectionType, SkeletonType } from "../../interfaces";

interface Props {
  isLoading: boolean
}

function withSkeleton<P extends object>(
  Component: React.ComponentType<P>,
  type?: SkeletonType,
  count?: number,
  direction?: DirectionType
) {
  return function WithSkeletot(props: Props & P) {
    const { isLoading, ...respProps } = props;

    if (isLoading) {
      return <Skeleton type={type} count={count} direction={direction} />;
    }
    return <Component {...respProps as P} />;
  };
}

export default withSkeleton;
