import React, {useState} from 'react';
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import './TanStackTable.css'
interface Row {
    id:number;
    lastName:string;
    firstName:string;
    age?:number|null;
}
const TanStackTable = () => {
    const rows:Row[] = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    ];

    /*  const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'age', headerName: 'Age', width: 90 },
      ];
      const fieldNames: string[] = columns.map((column) => column.field);*/

    const columnHelper = createColumnHelper<Row>()
    const columns = [
        columnHelper.accessor("id",{
            cell: info =>info.getValue(),
            header:()=><span>Id</span>
        }),
        columnHelper.accessor("lastName",{
            cell: info =>info.getValue(),
            header:()=><span>Last Name</span>
        }),
        columnHelper.accessor("firstName",{
            cell: info =>info.getValue(),
            header:()=><span>First Name</span>
        }),
        columnHelper.accessor("age",{
            cell: info =>info.getValue(),
            header:()=><span>Age</span>
        }),
    ];
    const [data, setData] = useState(() => [...rows])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const[startIndex,setStartIndex] = useState<number>(0);
    const[endIndex,setEndIndex] = useState<number>(0);
    const reorderColumns = (startIndex: number, endIndex: number) => {
        setData((prevData) => {
            const newData = [...prevData];
            const [removed] = newData.splice(startIndex, 1);
            newData.splice(endIndex, 0, removed);
            return newData;
        });
    };

    return (
        <div>
            <div className="inline-block border border-black shadow rounded">
                <div className="px-1 border-b border-black">
                    <label>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{' '}
                        Toggle All
                    </label>
                </div>
                {table.getAllLeafColumns().map(column => {
                    return (
                        <div key={column.id} className="px-1">
                            <label>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: column.getIsVisible(),
                                        onChange: column.getToggleVisibilityHandler(),
                                    }}
                                />{' '}
                                {column.id}
                            </label>
                        </div>
                    )
                })}
            </div>
            <div>
                <input type={"number"} onChange={(event)=>setStartIndex(parseInt(event.target.value))}/>
                <input type={"number"} onChange={(event)=>setEndIndex(parseInt(event.target.value))}/>
                <button onClick={()=>reorderColumns(startIndex,endIndex)}>ReOrderTable</button>
            </div>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="h-4" />
        </div>
    );
};

export default TanStackTable;