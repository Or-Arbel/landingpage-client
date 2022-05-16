import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MaterialTable from "material-table";
import { TablePagination, Grid, Typography, Divider } from "@material-ui/core";
import MTableBody from "./MTableBody";
import MTableBodyRow from "./MTableBodyRow";
import hebrewLocalization from "./hebrewLocalization";
import tableIcons from "./MaterialTableIcons";
import { useParams } from "react-router-dom";
import "./MaterialTable.css";
import useHttp from "../../../Hooks/use-http";
import hebrewColumns from "./hebrewColumns";

const MaterialTableComponent = () => {
  let { table } = useParams(); // Get table name from url
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState([]);

  let hasImageColumn = null;

  //Set table data and columns after we get the data from db
  const renderRowsData = (fetchedData) => {
    console.log(fetchedData);
    setTableData(fetchedData.data);

    hasImageColumn =
      fetchedData.data[0] && fetchedData.data[0].image
        ? (rowData) => <img src={rowData.image} />
        : null;
  };

  //Get table data from db
  const { isLoading, error, sendRequest: fetchData } = useHttp();
  useEffect(() => {
    fetchData(
      { url: `${process.env.REACT_APP_SERVER_URL}api/${table}` },
      renderRowsData
    );

    let columnsArr = hebrewColumns(table);
    setColumns(columnsArr);
  }, [table]);

  const fixOrderHandler = (rowsData, maxIndex = rowsData.length - 1) => {
    for (let i = 0; i <= maxIndex; i++) {
      rowsData[i].order = i + 1;
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
    <div style={{ maxWidth: "90%", margin: "auto" }}>
      {error && error.message}
      {tableData && columns && (
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={tableData}
          title={table}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                let bodyData = newRow;
                bodyData.order = tableData.length + 1;

                const requestOptions = {
                  url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
                  method: "POST",
                  body: [bodyData],
                };

                fetchData(requestOptions, (newRow) => {
                  console.log(newRow.data.links);
                  setTableData((prevState) => [
                    ...prevState,
                    ...newRow.data.links,
                  ]);
                });
                resolve();
              }),
            onRowUpdate: (newRow, oldRow) =>
              new Promise((resolve, reject) => {
                console.log("onRowUpdate");
                const updatedData = [...tableData];
                updatedData[oldRow.tableData.id] = newRow;
                setTableData(updatedData);
                resolve();
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                console.log("onRowDelete");
                const updatedData = [...tableData];
                updatedData.splice(selectedRow.tableData.id, 1);

                fixOrderHandler(updatedData);
                setTableData(updatedData);
                resolve();
              }),
            onBulkUpdate: (selectedRows) =>
              new Promise((resolve, reject) => {
                console.log("onBulkUpdate");
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
          // detailPanel={hasImageColumn}
          components={{
            Body: (props) => (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"MuiTableID"}>
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
            searchFieldAlignment: "right",
            searchAutoFocus: true, // auto focus on search field input
            searchFieldVariant: "standard",
            filtering: true, // add filtering option
            paging: true, // show pagination
            pageSizeOptions: [5, 10, 20, 25, 50], // pagination rows length
            pageSize: 5, // default page size
            // paginationType: 'stepped', // show page number instead of text
            showFirstLastPageButtons: true,
            paginationPosition: "bottom", // both / top / bottom
            exportButton: true, // show/hide export button
            exportAllData: true,
            exportFileName: `Table Data ${new Date().toLocaleDateString()}`,
            addRowPosition: "first",
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
                ? { background: "#f5f5f5" }
                : { background: "white" },
            headerStyle: {
              background: "#1e78bf",
              color: "#fff",
              textAlign: "center",
            },
            cellStyle: {
              textAlign: "center",
            },
            footerStyle: {
              direction: "ltr",
            },
          }}
          localization={hebrewLocalization}
          actions={[
            {
              icon: tableIcons.Delete,
              tooltip: "מחק את כל השורות שנבחרו",
              onClick: () => handleBulkDelete(),
            },
          ]}
        />
      )}
    </div>
  );
};

export default MaterialTableComponent;
