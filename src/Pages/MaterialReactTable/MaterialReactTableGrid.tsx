import React, {useMemo, useState} from 'react';
import MaterialReactTable, {MRT_Column, MRT_ColumnDef, MRT_DefinedColumnDef, MRT_FilterFn} from "material-react-table";

import {Column, ColumnOrderState, Updater} from "@tanstack/react-table";
import Button from "@mui/material/Button";

interface  Person {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
};
const MaterialReactTableGrid = () => {
    const tableData = [
        {
            firstName: 'Dylan',
            lastName: 'Murray',
            address: '261 Erdman Ford',
            city: 'East Daphne',
            state: 'Kentucky',
        },
        {
            firstName: 'Raquel',
            lastName: 'Kohler',
            address: '769 Dominic Grove',
            city: 'Columbus',
            state: 'Ohio',
        },
        {
            firstName: 'Ervin',
            lastName: 'Reinger',
            address: '566 Brakus Inlet',
            city: 'South Linda',
            state: 'West Virginia',
        },
        {
            firstName: 'Brittany',
            lastName: 'McCullough',
            address: '722 Emie Stream',
            city: 'Lincoln',
            state: 'Nebraska',
        },
        {
            firstName: 'Branson',
            lastName: 'Frami',
            address: '32188 Larkin Turnpike',
            city: 'Charleston',
            state: 'South Carolina',
        },
    ];
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            //column definitions...
            {
                accessorKey: 'address',
                header: 'Address',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
            //end
            {
                accessorKey: 'state', //disable column ordering for this column,
                header: 'State',
            },
        ],
        [],
    );


    function onOrderChange(x:Updater<ColumnOrderState>) {
        console.log(x)
    }

    function onColumnSizingChange() {

    }

    const initialState = {columnOrder:['firstName', 'lastName', 'address', 'city', 'state'] }
    const [columnOrder, setColumnOrder] = useState(initialState);
    function onColumnOrderChange(x: Updater<ColumnOrderState>) {
        // @ts-ignore
        const y:string[] = [...x]
        setColumnOrder({columnOrder: [...y]})
        console.log(y)
    }

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={tableData}
                enableColumnOrdering={true}
                enableRowOrdering={true}
                state={columnOrder}
                onColumnOrderChange={(x)=>onColumnOrderChange(x)}
        />
            <h2>Column order</h2>
            <ol>{columnOrder.columnOrder.map((column, index)=>(
                <li>{column}</li>
            ))}</ol>
        </>
    );
};

export default MaterialReactTableGrid;