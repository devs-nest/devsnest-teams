import React, { useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

export const Table = ({
    DATA,
    COLUMNS
}) => {

    const columns = useMemo(() => COLUMNS, [COLUMNS],);
    const data = useMemo(() => DATA, [DATA]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        setGlobalFilter,
        prepareRow,
    } = useTable(
        {
            columns,
            data
        },
        useGlobalFilter,
        usePagination,
    );

    const { pageIndex, globalFilter } = state;

    return (
        <>
            <input type="text"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search"
            />
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {
                                                column.render('Header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}
                                    onClick={() => {
                                        window.open(`${window.location.origin}/user/${row.original._id}`);
                                    }}
                                >
                                    {
                                        row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>Page {pageIndex + 1} of {pageOptions.length}</div>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>{"<"}</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>{">"}</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
        </>
    )
}
