/* eslint-disable react/jsx-key */
import { React } from 'react';
import { GlobalFilter, DefaultFilterForColumn } from './Filter';
import Pagination from './Pagination/Pagination';
import ItemsPerPage from './ItemsPerPage/ItemsPerPage';
import { SelectFilter } from './SelectFilter/SelectFilter';
import { useMemo, useEffect } from 'react';
import '../app.css';

import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';

export default function Table({ columns, data }) {
  // const [sorting, setSorting] = React.useState<SortingState>([])

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
    }),
    [],
  );

  // Table component logic and UI come here
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize, sortBy, pagination },
    state,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageIndex]);

  return (
    <>
      <div className="styled-table">
        <div className="container">
          {/* rendering global filter */}
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <ItemsPerPage pageSize={pageSize} setPageSize={setPageSize} />
        </div>
        <table {...getTableProps()}>
          <thead>
            <tr></tr>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div>
                      <span {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                      {/* rendering column filter */}
                      <div>
                        {column.canFilter ? column.render('Filter') : null}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{ border: '1px solid rgb(0, 0, 0)' }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pageCount={pageCount}
          gotoPage={gotoPage}
          pageIndex={pageIndex}
        />
      </div>
    </>
  );
}
