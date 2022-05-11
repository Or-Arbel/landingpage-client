import React, { useState, forwardRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MaterialTable from 'material-table';
import MTableBody from './MTableBody';
import MTableBodyRow from './MTableBodyRow';
import hebrewLocalization from './hebrewLocalization';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { useParams } from 'react-router-dom';

import './MaterialTable.css';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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

  const columns = [
    {
      title: 'order',
      field: 'order',
      // defaultSort: 'asc',
    },
    {
      title: 'Name',
      field: 'name',
    },
    { title: 'Email', field: 'email', filterPlaceholder: 'סנן אימייל' },
    {
      title: 'Password',
      field: 'password',
      filterPlaceholder: 'סנן סיסמה',
      editComponent: ({ value, onChange }) => (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
      render: (rowData) => (
        <input type="password" value={rowData.password} readOnly />
      ),
    },
    {
      title: 'Phone Number',
      field: 'phone',
      align: 'center',
    },
    {
      title: 'Age',
      field: 'age',
      emptyValue: () => <em>null</em>,
    },
    { title: 'Gender', field: 'gender', lookup: { M: 'Male', F: 'Female' } },
    { title: 'City', field: 'city', filterPlaceholder: 'filter' },
    {
      title: 'School Fee',
      field: 'fee',
      // type: 'currency',
      // currencySetting: { currencyCode: 'INR', minimumFractionDigits: 1 },
      // cellStyle: { background: '#009688' },
      // headerStyle: { color: '#fff' },
    },
  ];

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
          pageSizeOptions: [5, 10, 20, 25, 50, 100], // pagination rows length
          pageSize: 10, // default page size
          paginationType: 'stepped', // show page number instead of text
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
            index % 2 === 0 ? { background: '#f5f5f5' } : null,
          // headerStyle: { background: '#1e78bf', color: '#fff' },
          headerStyle: { background: '#1e78bf', color: '#fff' },
        }}
        localization={hebrewLocalization}
        actions={[
          {
            icon: 'delete',
            tooltip: 'מחק את כל השורות שנבחרו',
            onClick: () => handleBulkDelete(),
          },
        ]}
      />
    </div>
  );
};

export default MaterialTableComponent;
