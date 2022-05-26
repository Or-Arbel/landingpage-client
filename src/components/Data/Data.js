import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import MaterialTableComponent from "../Assets/MaterialTable/MaterialTableComponent";
import hebrewColumns from "../Assets/MaterialTable/hebrewColumns";
import useHttp from "../../Hooks/use-http";
import LinearIndeterminate from "../Assets/loadingSpinners/LinearIndeterminate";
import { Alert } from "@mui/material";
import Snackbar from "../Assets/Snackbar/Snackbar";

export const TableDataContext = React.createContext([]);
const Data = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  let { table } = useParams(); // Get table name from url

  //Get table data from db
  const { isLoading, error, sendRequest: fetchData, data } = useHttp();
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData({
        url: `${process.env.REACT_APP_SERVER_URL}api/${table}`,
      });
      if (data.status === "success") {
        setTableData(data.data);
      }
    };

    if (table !== undefined) {
      const columnsArr = hebrewColumns(table);
      setColumns(columnsArr);
      getData();
    }
  }, [table]);

  const getTitle = (table) => {
    switch (table) {
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
      default:
        return table;
    }
  };

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
        {error ? <p>{error}</p> : <p>No error</p>}
        {!isLoading && error && (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        )}
        {!isLoading && !error && table && (
          <>
            <h3>{getTitle(table)}</h3>
            <MaterialTableComponent getTitle={getTitle} />
          </>
        )}
        {!isLoading && !error && !table && <p>מסך מנהל לניהול נתונים</p>}
      </div>
    </TableDataContext.Provider>
  );
};

export default Data;
