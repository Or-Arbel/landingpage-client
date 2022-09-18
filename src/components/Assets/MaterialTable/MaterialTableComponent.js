import React, { useContext, useEffect, useState } from "react";
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
import { TableDataContext } from "../../UpdateTableData";
import { SnackbarContext } from "../../../App";
import useFormDataFetch from "../../../Hooks/useFormDataFetch";

const MaterialTableComponent = (props) => {
  let { table } = useParams(); // Get table name from url

  const { tableData, setTableData, columns, selectedRows, setSelectedRows } =
    useContext(TableDataContext);
  const { setSnackbarDetails } = React.useContext(SnackbarContext);

  let { sendFormDataRequest } = useFormDataFetch();
  let { sendRequest } = useHttp();

  const getOrderedData = (
    array,
    startIndex = 0,
    maxIndex = array.length - 1
  ) => {
    const copyArray = array.map((row) => {
      return { ...row };
    });
    // get the table rows data ordered and ready to send to backend
    for (let i = startIndex; i <= maxIndex; i++) {
      copyArray[i].order = i;
    }
    return copyArray;
  };

  const resolvFetch = (successMessage) => {
    if (successMessage) {
      setSnackbarDetails({
        open: true,
        message: successMessage,
        isError: false,
      });
    }
    Promise.resolve();
  };
  const rejectFetch = (errorMessage) => {
    if (errorMessage) {
      setSnackbarDetails({
        open: true,
        message: errorMessage,
        isError: true,
      });
    }
    Promise.reject();
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    // set the draged row in the right place
    const copyArray = [...tableData];
    let element = tableData[source.index];
    copyArray.splice(source.index, 1);
    copyArray.splice(destination.index, 0, element);

    //fix order numbers and update state
    const maxIndex =
      source.index > destination.index ? source.index : destination.index;
    const orderedData = getOrderedData(copyArray, 0, maxIndex);
    const body = orderedData.slice(0, maxIndex + 1).map((row) => {
      const { tableData, createdAt, updatedAt, ...fields } = row;
      return fields;
    });

    const patchRequestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
      method: "PATCH",
      body,
    };

    const { data } = await sendRequest(patchRequestOptions);
    const updates = [];
    data.forEach((res, i) => {
      if (res.status === "success") updates.push(res.data);
    });
    if (!data || updates.length === 0) {
      setTableData(tableData);
      return;
    }

    for (let i = 0; i < updates.length; i++) {
      updates[i].tableData = { id: i };
    }
    const newState = updates.concat(orderedData.slice(maxIndex + 1));
    setTableData(newState);
  };

  const validateData = (bodyData) => {
    //dont check order/createdAt/updatedAt
    for (let i = 1; i <= columns.length - 3; i++) {
      if (
        columns[i].validate &&
        columns[i].validate(bodyData) !== true &&
        columns[i].validate(bodyData) !== undefined
      ) {
        let errorMessage = columns[i].validate(bodyData);
        setSnackbarDetails({
          open: true,
          message: errorMessage,
          isError: true,
        });
        return errorMessage;
      }
    }
    return null;
  };

  const addRowHandler = async (newRow) => {
    let bodyData = { ...newRow };

    let validationError = validateData(bodyData);
    if (validationError) {
      return new Promise.reject();
    } else {
      bodyData.order = tableData.length;

      let fetchResult;
      const requestOptions = {
        url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
        },
        body: bodyData,
      };

      if (bodyData.image) {
        // add row using formdata
        fetchResult = await sendFormDataRequest(requestOptions);
      } else {
        // add row using json
        fetchResult = await sendRequest(requestOptions);
      }

      // add new row to tableData state
      let newRow = fetchResult && fetchResult.data;
      if (fetchResult.status === "success") {
        setTableData((prevState) => [...prevState, newRow]);
        return resolvFetch(fetchResult.message ?? "הרשומה נוספה בהצלחה");
      } else {
        return new Promise.reject();
      }
    }
  };

  const updateRowHandler = async (newRow, oldRow) => {
    const oldData = { ...oldRow };
    ["createdAt", "updatedAt", "id", "order", "tableData"].forEach((key) => {
      delete oldData[key];
    });

    const newData = { ...newRow };
    ["createdAt", "updatedAt", "id", "order", "departmentLinks"].forEach(
      (key) => {
        delete newData[key];
      }
    );

    if (JSON.stringify(oldData) === JSON.stringify(newData)) {
      rejectFetch("לא בוצעו עדכונים");
    } else {
      let validationError = validateData(newData);
      if (validationError) {
        rejectFetch();
      } else {
        let fetchResult;
        const requestOptions = {
          url: `${process.env.REACT_APP_SERVER_URL}api/${table}/${oldRow.id}`,
          method: "PATCH",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
          },
          body: newData,
        };
        //if image updated
        if (newData.image && typeof newData.image !== "string") {
          // update row using formdata
          fetchResult = await sendFormDataRequest(requestOptions);
        } else {
          // update row using json
          fetchResult = await sendRequest(requestOptions);
        }

        if (!fetchResult.data) return rejectFetch();
        const updatedTableData = [...tableData];
        let index = updatedTableData.indexOf(oldRow);
        updatedTableData[index] = fetchResult.data;

        setTableData(updatedTableData);
        return resolvFetch("הרשומה עודכנה בהצלחה");
      }
    }
  };

  const deleteRowHandler = async (selectedRow) => {
    const requestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}api/${table}/${selectedRow.id}`,
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
      },
    };

    //delete row from db
    const { status, rowsDeleted } = await sendRequest(requestOptions);
    if (status !== "success" || rowsDeleted === 0) return rejectFetch();

    //delete from state
    const updatedData = [...tableData];
    const rowIndex = updatedData.indexOf(selectedRow);
    updatedData.splice(rowIndex, 1);
    //fix rows order on db
    const orderedData = getOrderedData(updatedData, rowIndex);
    const body = orderedData.slice(rowIndex).map((row) => {
      const { tableData, createdAt, updatedAt, ...fields } = row;
      return fields;
    });

    const patchRequestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
      },
      body,
    };

    const { data } = await sendRequest(patchRequestOptions);
    if (!data) return rejectFetch();

    const updates = [];
    data.forEach((res, i) => {
      if (res.status === "success") {
        updates.push(res.data);
      }
    });

    const newState = updatedData.slice(0, rowIndex).concat(updates);
    for (let i = 0; i < newState.length; i++) {
      newState[i].tableData = { id: i };
    }

    setTableData(newState);
    return resolvFetch("הרשומה נמחקה בהצלחה");
  };

  const bulkUpdateHandler = async (selectedRows) => {
    let indexesChanged = Object.keys(selectedRows);
    indexesChanged = indexesChanged.map((e) => Number(e));

    if (indexesChanged.length === 0) {
      return rejectFetch("לא בוצעו עדכונים");
    }

    const body = Object.values(selectedRows).map((row) => {
      const { tableData, createdAt, updatedAt, ...rowData } = row.newData;
      return rowData;
    });

    for (let i = 0; i < body.length; i++) {
      let errorMessage = validateData(body[i]);
      if (errorMessage) {
        return rejectFetch();
      }
    }

    const requestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
      },
      body,
    };

    const { data, message } = await sendRequest(requestOptions);
    if (!data) return rejectFetch();

    const newState = [...tableData];
    data.forEach((res, i) => {
      if (res.status === "success") {
        newState[indexesChanged[i]] = res.data;
      }
    });

    setTableData(newState);
    return resolvFetch(message);
  };

  const bulkDeleteHandler = async (selectedRows) => {
    // delete array of records from DB
    const recordsIds = selectedRows.map((row) => row.id);
    const deleteRequestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}api/${table}/[${recordsIds}]`,
      method: "DELETE",
    };
    const { status, rowsDeleted } = await sendRequest(deleteRequestOptions);
    if (status === "fail" || rowsDeleted === 0) return rejectFetch();

    // update other data in DB
    let body = tableData.filter((row) => !selectedRows.includes(row));
    body = getOrderedData(body);
    body = body.map((row) => {
      const { tableData, createdAt, updatedAt, ...rowData } = row;
      return rowData;
    });

    const PatchRequestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
      },
      body,
    };
    const { data } = await sendRequest(PatchRequestOptions);
    if (!data) return rejectFetch();

    const updates = [];
    data.forEach((res, i) => {
      if (res.status === "success") {
        updates.push(res.data);
      }
    });

    setTableData(updates);
    return resolvFetch("הרשומות נמחקו בהצלחה");
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      {tableData && columns && (
        <>
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={tableData}
            title={props.getTitle(table)}
            editable={{
              onRowAdd: addRowHandler,
              onRowUpdate: updateRowHandler,
              onRowDelete: deleteRowHandler,
              onBulkUpdate: bulkUpdateHandler,
            }}
            components={{
              Body: (props) => (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={"MuiTableID"}>
                    {(provided) => (
                      <>
                        <MTableBody
                          {...props}
                          forwardedRef={provided.innerRef}
                        />
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
                  : { background: "inherit" },
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
                onClick: () => bulkDeleteHandler(selectedRows),
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default MaterialTableComponent;
