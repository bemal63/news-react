import Skeleton from "../../components/Skeleton/Skeleton";

function withSkeleton(Component, type, count, direction) {
  return function WithSkeletot(props) {
    const { isLoading, ...respProps } = props;

    if (isLoading) {
      return <Skeleton type={type} count={count} direction={direction} />;
    }
    return <Component {...respProps} />;
  };
}

export default withSkeleton;
