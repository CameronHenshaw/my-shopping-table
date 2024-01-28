import ResponsivePagination from 'react-responsive-pagination';

// import './Pagination/pagination.css';
import './pagination.css';

export default function Pagination({ pageCount, gotoPage, pageIndex }) {
  // page in "handlePageChange" is indexed from 1
  // our tanstack props are indexed from 0
  // so gotoPage has to be -1 to navigate correctly,
  // and current has to be pageIndex + 1 in order to display correctly

  return (
    <div>
      <ResponsivePagination
        total={pageCount}
        current={pageIndex + 1}
        onPageChange={(page) => gotoPage(page - 1)}
      />
    </div>
  );
}
