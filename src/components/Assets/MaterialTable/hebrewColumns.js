import React from "react";
import Select from "react-select";

const DepartmentsList = [
  { value: "1", label: "מלכא" },
  { value: "2", label: "תקשוב" },
  { value: "3", label: "חמל אגם" },
  { value: "4", label: "רפואה" },
  { value: "4", label: "אוכלוסייה וחומס" },
  { value: "4", label: "מכס כשירות כוחות" },
];

const hebrewColumns = (tableName) => {
  let arr;
  switch (tableName) {
    case "links":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        { title: "שם", field: "name" },
        { title: "לינק", field: "url" },
        { title: "נוצר בתאריך", field: "createdAt", editable: "never" },
        { title: "עודכן בתאריך", field: "updatedAt", editable: "never" },
      ];
    case "departments":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        { title: "שם", field: "name" },
        { title: "נוצר בתאריך", field: "createdAt", editable: "never" },
        { title: "עודכן בתאריך", field: "updatedAt", editable: "never" },
      ];
    case "shobDevelopments":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        { title: "כותרת", field: "title" },
        { title: "כותרת משנה", field: "subTitle" },
        { title: "תיאור", field: "description" },
        {
          title: "תמונה",
          field: "image",
          render: (rowData) => (
            <img src={rowData.image} width="50" height="60" />
          ),
        },
        { title: "נוצר בתאריך", field: "createdAt", editable: "never" },
        { title: "עודכן בתאריך", field: "updatedAt", editable: "never" },
      ];
    case "departmentLinks":
      return [
        { title: "סדר", field: "order", defaultSort: "asc", editable: "never" },
        { title: "שם", field: "name" },
        { title: "כתובת url", field: "url" },
        {
          title: "מחלקה",
          field: "departmentId",
          render: (rowData) => {
            return DepartmentsList[rowData.departmentId - 1].label;
          },
          editComponent: ({ value, onChange }) => (
            <Select
              options={DepartmentsList}
              name="fruitSelect"
              onChange={(selectedOption) => onChange(selectedOption.value)}
              value={value ? value.value : value}
              placeholder="בחר מחלקה"
            />
          ),
        },
        { title: "נוצר בתאריך", field: "createdAt", editable: "never" },
        { title: "עודכן בתאריך", field: "updatedAt", editable: "never" },
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
