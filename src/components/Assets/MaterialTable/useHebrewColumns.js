import React, { useState, useEffect } from "react";
import Select from "react-select";
import useHttp from "../../../Hooks/use-http";
const demoImg = require("../../../images/m2e.jpg");
const dateFormat = "dd/MM/yyyy, hh:mm:ss";

const useHebrewColumns = (tableName) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [columnsArr, setColumnsArr] = useState([]);

  useEffect(() => {
    let columns = [];

    const getDepartmentsLinksColumnsArray = async () => {
      //get departments list
      let { data } = await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}api/departments`,
      });

      //build departments array in format [{value: departmentId, label: departmentName}]
      const departmentsList = [];
      for (let i = 0; i < data.length; i++) {
        departmentsList.push({
          value: String(data[i].id),
          label: data[i].name,
        });
      }

      //build columns array for departmentsLink page
      if (departmentsList.length === data.length) {
        columns = [
          {
            title: "סדר",
            field: "order",
            defaultSort: "asc",
            editable: "never",
          },
          {
            title: "שם",
            field: "name",
            validate: (rowData) =>
              rowData.name === undefined || rowData.name.trim() == ""
                ? "נא הזן שם"
                : true,
          },
          {
            title: "כתובת url",
            field: "url",
            validate: (rowData) =>
              rowData.url === undefined || rowData.url.trim() == ""
                ? "נא הזן url"
                : true,
          },
          {
            title: "מחלקה",
            field: "departmentId",
            render: (rowData) => {
              let department = departmentsList.find(
                (element) => element.value == rowData.departmentId
              );
              return department.label;
            },
            editComponent: ({ value, onChange }) => (
              <Select
                options={departmentsList}
                name="departmentsSelect"
                onChange={(selectedOption) => onChange(selectedOption.value)}
                value={value ? value.value : value}
                placeholder="בחר מחלקה"
              />
            ),
            validate: (rowData) =>
              rowData.departmentId === null ||
              rowData.departmentId === undefined
                ? "נא בחר מחלקה, לינק צריך להיות משוייך למחלקה"
                : true,
          },
          {
            title: "נוצר בתאריך",
            field: "createdAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
          {
            title: "עודכן בתאריך",
            field: "updatedAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
        ];
      }
      setColumnsArr(columns);
    };

    switch (tableName) {
      case "links":
        columns = [
          {
            title: "סדר",
            field: "order",
            defaultSort: "asc",
            editable: "never",
          },
          {
            title: "שם",
            field: "name",

            validate: (rowData) =>
              rowData.name === undefined ||
              rowData.name.trim() == "" ||
              rowData.name.length < 2 ||
              rowData.name > 40
                ? "נא הזן שם באורך 2-40 תווים"
                : true,
          },
          {
            title: "לינק",
            field: "url",
            validate: (rowData) =>
              rowData.url === undefined ||
              rowData.url.trim() == "" ||
              rowData.url.length < 2 ||
              rowData.url > 40
                ? "נא הזן url באורך 2-40 תווים"
                : true,
          },
          {
            title: "נוצר בתאריך",
            field: "createdAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
          {
            title: "עודכן בתאריך",
            field: "updatedAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
        ];
        break;
      case "departments":
        columns = [
          {
            title: "סדר",
            field: "order",
            defaultSort: "asc",
            editable: "never",
          },
          {
            title: "שם",
            field: "name",
            validate: (rowData) =>
              rowData.name === undefined ||
              rowData.name.trim() == "" ||
              rowData.name.length < 2 ||
              rowData.name > 40
                ? "נא הזן שם באורך 2-40 תווים"
                : true,
          },
          {
            title: "נוצר בתאריך",
            field: "createdAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
          {
            title: "עודכן בתאריך",
            field: "updatedAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
        ];
        break;
      case "shobDevelopments":
        columns = [
          {
            title: "סדר",
            field: "order",
            defaultSort: "asc",
            editable: "never",
          },
          {
            title: "כותרת",
            field: "title",
            validate: (rowData) =>
              rowData.title === undefined ||
              rowData.title.trim() == "" ||
              rowData.title.length < 3 ||
              rowData.title > 40
                ? "נא הזן כותרת באורך 3-40 תווים"
                : true,
          },
          {
            title: "כותרת משנה",
            field: "subTitle",
            validate: (rowData) =>
              rowData.subTitle === undefined ||
              rowData.subTitle.trim() == "" ||
              rowData.subTitle.length < 3 ||
              rowData.subTitle > 150
                ? "נא הזן כותרת משנה באורך 3-150 תווים"
                : true,
          },
          {
            title: "תיאור",
            field: "description",
            validate: (rowData) =>
              rowData.description === undefined ||
              rowData.description.trim() == "" ||
              rowData.description.length < 3 ||
              rowData.description > 1500
                ? "נא הזן תיאור באורך 3-1500 תווים"
                : true,
          },
          {
            title: "לינק",
            field: "url",
            validate: (rowData) =>
              rowData.description === undefined ||
              rowData.description.trim() == ""
                ? "נא הזן url"
                : true,
          },
          {
            title: "תמונה",
            field: "image",
            render: (rowData) => (
              <img src={rowData.image || demoImg} width="50" height="60" />
            ),
          },
          {
            title: "נוצר בתאריך",
            field: "createdAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
          {
            title: "עודכן בתאריך",
            field: "updatedAt",
            editable: "never",
            type: "datetime",
            dateSetting: { format: dateFormat },
          },
        ];
        break;
      case "departmentLinks":
        getDepartmentsLinksColumnsArray();
        break;
    }

    if (columns.length !== 0) {
      setColumnsArr(columns);
    }
  }, [tableName]);

  return {
    columnsArr,
  };
};

export default useHebrewColumns;
