import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  forcePage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  forcePage,
}) => {
  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      forcePage={forcePage - 1}
    />
  );
};
