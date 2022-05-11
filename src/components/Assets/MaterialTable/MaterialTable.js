import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MaterialTable from 'material-table';
import { TablePagination, Grid, Typography, Divider } from '@material-ui/core';
import MTableBody from './MTableBody';
import MTableBodyRow from './MTableBodyRow';
import hebrewLocalization from './hebrewLocalization';
import tableIcons from './MaterialTableIcons';
import { useParams } from 'react-router-dom';
import './MaterialTable.css';

const MaterialTableComponent = () => {
  let { table } = useParams(); // Get table name from url

  const initialRowsData = [
    {
      order: 0,
      name: 'or',
      email: 'Raj@gmail.com',
      password: 123456,
      phone: 7894561230,
      age: null,
      gender: 'M',
      city: 'Chennai',
      fee: 78456,
    },
    {
      order: 1,
      name: 'avichai',
      email: 'mohan@gmail.com',
      password: 123456,
      phone: 7845621590,
      age: 35,
      gender: 'M',
      city: 'Delhi',
      fee: 456125,
    },
    {
      order: 2,
      name: 'Sweety',
      email: 'sweety@gmail.com',
      password: 123456,
      phone: 741852912,
      age: 17,
      gender: 'F',
      city: 'Noida',
      fee: 458796,
    },
    {
      order: 3,
      name: 'Vikas',
      email: 'vikas@gmail.com',
      password: 123456,
      phone: 9876543210,
      age: 20,
      gender: 'M',
      city: 'Mumbai',
      fee: 874569,
    },
    {
      order: 4,
      name: 'Neha',
      email: 'neha@gmail.com',
      password: 123456,
      phone: 7845621301,
      age: 25,
      gender: 'F',
      city: 'Patna',
      fee: 748521,
    },
    {
      order: 5,
      name: 'Mohan',
      email: 'mohan@gmail.com',
      password: 123456,
      phone: 7845621590,
      age: 35,
      gender: 'M',
      city: 'Delhi',
      fee: 456125,
    },
    {
      order: 6,
      name: 'Sweety',
      email: 'sweety@gmail.com',
      password: 123456,
      phone: 741852912,
      age: 17,
      gender: 'F',
      city: 'Noida',
      fee: 458796,
    },
    {
      order: 7,
      name: 'Vikas',
      email: 'vikas@gmail.com',
      password: 123456,
      phone: 9876543210,
      age: 20,
      gender: 'M',
      city: 'Mumbai',
      fee: 874569,
    },
    {
      order: 8,
      name: 'Raj',
      email: 'Raj@gmail.com',
      password: 123456,
      phone: 7894561230,
      age: null,
      gender: 'M',
      city: 'Chennai',
      fee: 78456,
    },
    {
      order: 9,
      name: 'Mohan',
      email: 'mohan@gmail.com',
      password: 123456,
      phone: 7845621590,
      age: 35,
      gender: 'M',
      city: 'Delhi',
      fee: 456125,
    },
    {
      order: 10,
      name: 'Sweety',
      email: 'sweety@gmail.com',
      password: 123456,
      phone: 741852912,
      age: 17,
      gender: 'F',
      city: 'Noida',
      fee: 458796,
    },
    {
      order: 11,
      name: 'Vikas',
      email: 'vikas@gmail.com',
      password: 123456,
      phone: 9876543210,
      age: 20,
      gender: 'M',
      city: 'Mumbai',
      fee: 874569,
    },
  ];

  const [tableData, setTableData] = useState(initialRowsData);
  const [selectedRows, setSelectedRows] = useState([]);

  // const columns =
  const dataObjectKeys = Object.keys(initialRowsData[0]);
  const columns = [];
  for (let i = 0; i < dataObjectKeys.length; i++) {
    columns.push({ title: dataObjectKeys[i], field: dataObjectKeys[i] });
  }

  const fixOrderHandler = (rowsData, maxIndex = rowsData.length - 1) => {
    for (let i = 0; i <= maxIndex; i++) {
      rowsData[i].order = i;
    }
    return rowsData;
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    // set the draged row in the right place
    let copyArray = [...tableData];
    let temp = tableData[source.index];
    console.log(source.index, destination.index);
    copyArray.splice(source.index, 1);
    copyArray.splice(destination.index, 0, temp);

    //fix order numbers and update state
    const maxIndex =
      source.index > destination.index ? source.index : destination.index;
    copyArray = fixOrderHandler(copyArray, maxIndex);
    setTableData(copyArray);
  };

  const handleBulkDelete = () => {
    let updatedData = tableData.filter((row, index) => {
      return !selectedRows.includes(row);
    });

    updatedData = fixOrderHandler(updatedData);
    setTableData(updatedData);
  };

  return (
    <div style={{ maxWidth: 'max-content' }}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={tableData}
        title={table}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              console.log('onRowAdd');
              setTableData((prevState) => [...prevState, newRow]);
              console.log(tableData);
              resolve();
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              console.log('onRowUpdate');
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              resolve();
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log('onRowDelete');
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);

              fixOrderHandler(updatedData);
              setTableData(updatedData);
              resolve();
            }),
          onBulkUpdate: (selectedRows) =>
            new Promise((resolve, reject) => {
              console.log('onBulkUpdate');
              const rows = Object.values(selectedRows);
              const updatedRows = [...tableData];
              rows.forEach((row) => {
                const index = row.oldData.tableData.id;
                updatedRows[index] = row.newData;
              });
              setTableData(updatedRows);
              resolve();
            }),
        }}
        // detailPanel={() => 'hello'}
        components={{
          Body: (props) => (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={'MuiTableID'}>
                {(provided) => (
                  <>
                    <MTableBody {...props} forwardedRef={provided.innerRef} />
                    {provided.placeholder}
                  </>
                )}
              </Droppable>
            </DragDropContext>
          ),
          Row: (props) => (
            <Draggable
              draggableId={props.data.tableData.id.toString()}
              index={props.data.tableData.id}
            >
              {(provided) => {
                return (
                  <MTableBodyRow
                    {...props}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    forwardedRef={provided.innerRef}
                  />
                );
              }}
            </Draggable>
          ),
          Pagination: (props) => (
            <>
              <Grid container style={{ padding: 15 }}>
                <Grid sm={12} item align="center">
                  <Typography variant="subtitle2">
                    מספר רשומות : {props.count}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <TablePagination {...props} />
            </>
          ),
        }}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        options={{
          sorting: true, // add column sorting option
          search: true, // show search bar
          searchFieldAlignment: 'right',
          searchAutoFocus: true, // auto focus on search field input
          searchFieldVariant: 'standard',
          filtering: true, // add filtering option
          paging: true, // show pagination
          pageSizeOptions: [5, 10, 20, 25, 50], // pagination rows length
          pageSize: 5, // default page size
          // paginationType: 'stepped', // show page number instead of text
          showFirstLastPageButtons: true,
          paginationPosition: 'bottom', // both / top / bottom
          exportButton: true, // show/hide export button
          exportAllData: true,
          exportFileName: `Table Data ${new Date().toLocaleDateString()}`,
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          selection: true, // add checkboxes near each row
          showSelectAllCheckbox: true,
          showTextRowsSelected: true,
          selectionProps: (rowData) => ({
            // disabled: rowData.age == null,
            // color: 'primary',
          }),
          grouping: true,
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0
              ? { background: '#f5f5f5' }
              : { background: 'white' },
          headerStyle: {
            background: '#1e78bf',
            color: '#fff',
            textAlign: 'center',
          },
          cellStyle: {
            textAlign: 'center',
          },
          footerStyle: {
            direction: 'ltr',
          },
        }}
        localization={hebrewLocalization}
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: 'מחק את כל השורות שנבחרו',
            onClick: () => handleBulkDelete(),
          },
        ]}
      />
    </div>
  );
};

export default MaterialTableComponent;
