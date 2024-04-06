import * as React from "react";
import { Pagination } from "../Pagination/Pagination";
import { IPaginationProps } from "../../interfaces";

interface Props {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
}

export const PaginationWrapper = ({
  top,
  bottom,
  children,
  ...paginationWrapperProps
}: Props & IPaginationProps) => {
  return (
    <>
      {top && <Pagination {...paginationWrapperProps} />}
      {children}
      {bottom && <Pagination {...paginationWrapperProps} />}
    </>
  );
};
