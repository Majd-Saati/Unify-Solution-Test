import { useState } from 'react';

export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
  };
}

