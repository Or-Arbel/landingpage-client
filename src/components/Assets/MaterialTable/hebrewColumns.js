import React from "react";
import Select from "react-select";

const DepartmentsList = [
  { value: "1", label: "מלכא" },
  { value: "2", label: "תקשוב" },
  { value: "3", label: "חמל אגם" },
  { value: "4", label: "רפואה" },
  { value: "5", label: "אוכלוסייה וחומס" },
  { value: "6", label: "מכס כשירות כוחות" },
];

const dateFormat = "dd/MM/yyyy, hh:mm:ss";

const hebrewColumns = (tableName) => {
  switch (tableName) {
    case "links":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        {
          title: "שם",
          field: "name",
          validate: (rowData) =>
            rowData.name.length < 2 || rowData.name.length > 40
              ? "נא הזן שם באורך 2-40 תווים"
              : "",
        },
        {
          title: "לינק",
          field: "url",
          validate: (rowData) =>
            rowData.url.length < 2 || rowData.url.length > 40
              ? "נא הזן url באורך 2-40 תווים"
              : "",
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
    case "departments":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        {
          title: "שם",
          field: "name",
          validate: (rowData) =>
            rowData.name.length < 3 || rowData.name.length > 40
              ? "נא הזן שם באורך 3-40 תווים"
              : "",
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
    case "shobDevelopments":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        {
          title: "כותרת",
          field: "title",
          validate: (rowData) =>
            rowData.title.length < 3 || rowData.title.length > 40
              ? "נא הזן כותרת באורך 3-40 תווים"
              : "",
        },
        {
          title: "כותרת משנה",
          field: "subTitle",
          validate: (rowData) =>
            rowData.subTitle.length < 3 || rowData.subTitle.length > 150
              ? "נא הזן כותרת משנה באורך 3-150 תווים"
              : "",
        },
        {
          title: "תיאור",
          field: "description",
          validate: (rowData) =>
            rowData.description.length < 3 || rowData.description.length > 1500
              ? "נא הזן תיאור באורך 3-1500 תווים"
              : "",
        },
        {
          title: "תמונה",
          field: "image",
          render: (rowData) => (
            <img src={rowData.image} width="50" height="60" />
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
    case "departmentLinks":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        {
          title: "שם",
          field: "name",
          validate: (rowData) => (rowData.name === "" ? "נא הזן שם" : ""),
        },
        {
          title: "כתובת url",
          field: "url",
          validate: (rowData) => (rowData.url === "" ? "נא הזן url" : ""),
        },
        {
          title: "מחלקה",
          field: "departmentId",
          render: (rowData) => {
            return DepartmentsList[rowData.departmentId - 1].label;
          },
          editComponent: ({ value, onChange }) => (
            <Select
              options={DepartmentsList}
              name="departmentsSelect"
              onChange={(selectedOption) => onChange(selectedOption.value)}
              value={value ? value.value : value}
              placeholder="בחר מחלקה"
            />
          ),
          validate: (rowData) =>
            rowData.departmentId === null || rowData.departmentId === undefined
              ? "נא בחר מחלקה, לינק צריך להיות משוייך למחלקה"
              : "",
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

    //   default:
    //     return [
    //       { title: 'סדר', field: 'order' },
    //       { title: 'שם', field: 'name' },
    //       { title: 'לינק', field: 'url' },
    //       { title: 'נוצר בתאריך', field: 'createdAt' },
    //       { title: 'עודכן בתאריך', field: 'updatedAt' },
    //     ];
  }
};

export default hebrewColumns;
