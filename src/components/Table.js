import React, { useMemo } from 'react';
import { useTable } from 'react-table';

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
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    return (
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
                    rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
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
    )
}
