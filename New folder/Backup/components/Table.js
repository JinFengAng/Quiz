import React, { useEffect } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import LoadingSpinner from './LoadingSpinner';
import './TableScrollbar.css'

function Table({
    columns,
    data,
    onFetchDataDebounce,
    loading,
    pageCount: controlledPageCount,
    rowCount,
    CompanyName, CompanyRegistrationNumber, IncorporationDateFrom,
    IncorporationDateTo, LastAGMFrom, LastAGMTo, LastARFrom, LastARTo, LastFinancialYearEndFrom, LastFinancialYearEndTo,
    openMenuRowIndex,
    refreshCounter
  }) {
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy }
    } = useTable(
    {
        columns,
        data,
        manualPagination: true,
        manualSortBy: true,
        autoResetPage: false,
        // autoResetSortBy: false,
        pageCount: controlledPageCount,
        disableMultiSort: true,
    },
    useSortBy,
    usePagination
    );

    // fetch fresh data whenever any of the specified parameters change
    useEffect(() => {
    onFetchDataDebounce({ pageIndex, pageSize, sortBy, CompanyName, CompanyRegistrationNumber, IncorporationDateFrom,
        IncorporationDateTo, LastAGMFrom, LastAGMTo, LastARFrom, LastARTo, LastFinancialYearEndFrom, LastFinancialYearEndTo });
    }, [sortBy, onFetchDataDebounce, pageIndex, pageSize, CompanyName, CompanyRegistrationNumber, IncorporationDateFrom,
        IncorporationDateTo, LastAGMFrom, LastAGMTo, LastARFrom, LastARTo, LastFinancialYearEndFrom, LastFinancialYearEndTo, refreshCounter]);

    // reset the page index to 0 whenever sorting parameters change
    useEffect(() => {
        gotoPage(0);
    }, [gotoPage, sortBy]);

    // reset the page index to 0 whenever filters change
    useEffect(() => {
        gotoPage(0);
    }, [gotoPage, CompanyName, CompanyRegistrationNumber, IncorporationDateFrom,
        IncorporationDateTo, LastAGMFrom, LastAGMTo, LastARFrom, LastARTo, LastFinancialYearEndFrom, LastFinancialYearEndTo]);

    console.log('Table rerendered')

    return (
    <div className='mt-5 shadow rounded-md'>
        <div className='relative'>
            <div className='overflow-auto h-180 table-scroll'>
                <table {...getTableProps()} className={`border-separate border-spacing-0 whitespace-nowrap text-sm ${loading ? 'opacity-30' : ''}`}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className='text-gray-400'>
                        {headerGroup.headers.map((column, columnIndex) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} 
                            // Set sticky positioning from the right and left for the 
                            // Actions and CompanyName column respectively
                            className={`border-purple-700 border-b-2 bg-white p-5 text-left sticky top-0
                                    ${columnIndex === headerGroup.headers.length - 1 || columnIndex === 1 ? 'z-4' : 'z-3'} 
                                    ${columnIndex === headerGroup.headers.length - 1 && 'right-0'}
                                    ${columnIndex === 1 && 'left-0'}`}>
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                            {column.isSorted
                                ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                                : ""}
                            </span>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell, columnIndex) => {
                            console.log(columnIndex)
                            return (
                            // We set the row that currently has an opened Button Menu to have a higher z-index than 
                            // its neighbour rows so as to ensure that the menu will render on top of those rows 
                            <td {...cell.getCellProps()} className={`px-5 py-4 text-left font-bold ${rowIndex % 2 === 0 ? 'bg-purple-50' : 'bg-white'}
                                ${openMenuRowIndex === rowIndex && columnIndex === row.cells.length - 1 && 'z-1'} 
                                ${columnIndex === row.cells.length - 1 && 'sticky right-0'}
                                ${columnIndex === 1 && 'sticky left-0'}`}>
                                {cell.render("Cell")}
                            </td>
                            );
                        })}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            {loading ? (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <LoadingSpinner className='w-10' />
                </div>
            ) : null}
        </div>
        <div className='pagination flex justify-between items-center p-5'>
            <div>Showing {rowCount ? pageIndex * pageSize + 1 : 0}-{Math.min((pageIndex + 1) * pageSize, rowCount)} of {rowCount} items</div>
            <div className='flex w-44 justify-between'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='focus:outline-none'>
                    <svg viewBox="0 0 24 24" focusable="false" className="h-9 w-9 fill-current text-gray-400 hover:text-purple-800 hover:bg-purple-50 
                        rounded">
                        <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
                    </svg>
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className='focus:outline-none'>
                    <svg viewBox="0 0 24 24" focusable="false" className="h-9 w-9 fill-current text-gray-400 hover:text-purple-800 hover:bg-purple-50 
                        rounded">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage} className='focus:outline-none'>
                    <svg viewBox="0 0 24 24" focusable="false" className='h-9 w-9 fill-current text-gray-400 hover:text-purple-800 hover:bg-purple-50 
                        rounded'>
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='focus:outline-none'>
                    <svg viewBox="0 0 24 24" focusable="false" className="h-9 w-9 fill-current text-gray-400 hover:text-purple-800 hover:bg-purple-50 
                        rounded">
                        <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
                    </svg>
                </button>
            </div>
            <div>
                <label>Rows per page:</label>
                <select
                    value={pageSize}
                    onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
    );
}

export default Table
