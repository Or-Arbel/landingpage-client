import React, { useContext, useState } from "react";
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
import { TableDataContext } from "../../Data/Data";
// import { Snackbar, Alert } from "@mui/material";

const MaterialTableComponent = (props) => {
  // const [open, setOpen] = useState(false);
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };
  // <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //   <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
  //     This is a success message!
  //   </Alert>
  // </Snackbar>;

  let { table } = useParams(); // Get table name from url

  const { tableData, setTableData, columns, selectedRows, setSelectedRows } =
    useContext(TableDataContext);

  let hasImageColumn = null;

  //Get table data from db
  const { isLoading, error, sendRequest: fetchData } = useHttp();

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
    <div style={{ width: "100%", margin: "auto" }}>
      {/* <Snackbar autoHideDuration={1000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar> */}
      {tableData && columns && (
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={tableData}
          title={props.getTitle(table)}
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
                  setTableData((prevState) => [...prevState, ...newRow.data]);
                  // setOpen(true);
                  resolve();
                });
              }),
            onRowUpdate: (newRow, oldRow) =>
              new Promise((resolve, reject) => {
                let body = { ...newRow };

                delete body.createdAt;
                delete body.updatedAt;
                delete body.id;
                delete body.order;
                // delete body.departmentLinks;

                const requestOptions = {
                  url: `${process.env.REACT_APP_SERVER_URL}api/${table}/${oldRow.id}`,
                  method: "PATCH",
                  body,
                };

                fetchData(requestOptions, (res) => {
                  const updatedData = [...tableData];
                  let index = updatedData.indexOf(oldRow);
                  updatedData[index] = res.data;

                  setTableData((prevState) => updatedData);
                });

                resolve();
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const requestOptions = {
                  url: `${process.env.REACT_APP_SERVER_URL}api/${table}/${selectedRow.id}`,
                  method: "DELETE",
                };

                console.log(selectedRow);
                fetchData(requestOptions, () => {
                  const updatedData = [...tableData];
                  updatedData.splice(selectedRow.tableData.id, 1);
                  fixOrderHandler(updatedData);
                  setTableData(updatedData);
                });
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
                      סה"כ רשומות : {props.count}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <div className="paginationDiv">
                  <TablePagination
                    {...props}
                    style={{ direction: "rtl", width: "max-content" }}
                  />
                </div>
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
            pageSizeOptions: [5, 10, 20, 25], // pagination rows length
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
