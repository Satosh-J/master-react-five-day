import { FC } from 'react';

interface PaginationProps {
  itemsCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({ itemsCount, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage);

  const generatePageNumbers = (): Array<number | '...'> => {
    const pageNumbers: Array<number | '...'> = [];
    const maxPageButtons = 3;

    const addPageNumber = (pageNumber: number) => pageNumbers.push(pageNumber);
    const addEllipsis = () => pageNumbers.push('...');

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        addPageNumber(i);
      }
    };

    if (totalPages <= maxPageButtons) {
      addRange(1, totalPages);
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      if (startPage > 1) {
        addPageNumber(1);
        if (startPage > 2) {
          addEllipsis();
        }
      }

      addRange(startPage, endPage);

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          addEllipsis();
        }
        addPageNumber(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {generatePageNumbers().map((number, index) => (
          <li key={index} className={number === currentPage ? 'page-item active' : 'page-item'}>
            {number === '...' ? (
              <button className='page-link'>
                <span className="ellipsis">...</span>
              </button>
            ) : (
              <button className="page-link" onClick={() => onPageChange(number)}>
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
