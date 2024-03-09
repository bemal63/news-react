import { Pagination } from "../Pagination/Pagination";

export const PaginationWrapper = ({
  top,
  bottom,
  children,
  ...paginationWrapperProps
}) => {
  return (
    <>
      {top && <Pagination {...paginationWrapperProps} />}
      {children}
      {bottom && <Pagination {...paginationWrapperProps} />}
    </>
  );
};
