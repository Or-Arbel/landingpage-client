import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import MaterialTableComponent from "../Assets/MaterialTable/MaterialTableComponent";
import useHebrewColumns from "../Assets/MaterialTable/useHebrewColumns";
import useHttp from "../../Hooks/use-http";
import LinearIndeterminate from "../Assets/loadingSpinners/LinearIndeterminate";
import { Alert } from "@mui/material";

export const TableDataContext = React.createContext([]);
const UpdateTableData = () => {
  const [tableData, setTableData] = useState(undefined);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  let { table } = useParams(); // Get table name from url
  const { columnsArr } = useHebrewColumns(table);
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  //Get columns
  useEffect(() => {
    if (columnsArr.length > 0) {
      setColumns(columnsArr);
    }
  }, [columnsArr]);

  //Get table data from db
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData({
        url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
      });
      if (data.status === "success") {
        setTableData((prev) => data.data);
      }
    };

    if (table !== undefined) {
      getData();
    }
  }, [table]);

  const getTitle = (table) => {
    switch (table) {
      case "mainLinks": {
        return "לינקים ראשיים";
      }
      case "links": {
        return "לינקים";
      }
      case "departments": {
        return "מחלקות";
      }
      case "departmentLinks": {
        return "לינקים לפי מחלקות";
      }
      case "shobDevelopments": {
        return "פיתוחי מעבדה";
      }
      case "sela": {
        return 'פורטל סל"ע - סלולר עורף';
      }
      case "reportUrl": {
        return "עדכון url לעמוד דיווח תקלה";
      }
      default:
        return table;
    }
  };

  console.log("data: " + table);
  return (
    <TableDataContext.Provider
      value={{
        tableData,
        setTableData,
        columns,
        selectedRows,
        setSelectedRows,
      }}
    >
      <div className={styles.dataContainer}>
        {isLoading && <LinearIndeterminate />}
        {!isLoading && error && (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        )}
        {!isLoading && !error && tableData && (
          <>
            <h3>{getTitle(table)}</h3>
            <MaterialTableComponent getTitle={getTitle} />
          </>
        )}
      </div>
    </TableDataContext.Provider>
  );
};

export default UpdateTableData;
