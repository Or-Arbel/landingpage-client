import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import MaterialTableComponent from "../Assets/MaterialTable/MaterialTableComponent";
import hebrewColumns from "../Assets/MaterialTable/hebrewColumns";
import useHttp from "../../Hooks/use-http";

export const TableDataContext = React.createContext([]);
const Data = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  let { table } = useParams(); // Get table name from url

  const renderRowsData = (fetchedData) => {
    setTableData(fetchedData.data);
    // hasImageColumn =
    //   fetchedData.data[0] && fetchedData.data[0].image
    //     ? (rowData) => <img src={rowData.image} />
    //     : null;
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
        {/* <h2>Data</h2> */}
        {table ? (
          <div>
            <h3>{getTitle(table)}</h3>
            <MaterialTableComponent getTitle={getTitle} />
          </div>
        ) : (
          <p>כאן יוצגו כל הטבלאות הניתנות לעריכה</p>
        )}
      </div>
    </TableDataContext.Provider>
  );
};

export default Data;
