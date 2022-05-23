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

          validate: (rowData) => {
            const errorMessage = "נא הזן שם באורך 2-40 תווים";
            if (rowData.name === undefined) return;
            if (
              rowData.name === "" ||
              rowData.name.length < 2 ||
              rowData.name.length > 40
            )
              return errorMessage;
          },
        },
        {
          title: "לינק",
          field: "url",
          validate: (rowData) => {
            const errorMessage = "נא הזן url באורך 2-40 תווים";
            if (rowData.url === undefined) return;
            if (
              rowData.url === "" ||
              rowData.url.length < 2 ||
              rowData.url.length > 40
            )
              return errorMessage;
          },
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
          validate: (rowData) => {
            const errorMessage = "נא הזן שם באורך 2-40 תווים";
            if (rowData.name === undefined) return;
            if (
              rowData.name === "" ||
              rowData.name.length < 2 ||
              rowData.name.length > 40
            )
              return errorMessage;
          },
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

          validate: (rowData) => {
            const errorMessage = "נא הזן כותרת באורך 3-40 תווים";
            if (rowData.title === undefined) return;
            if (
              rowData.title === "" ||
              rowData.title.length < 3 ||
              rowData.title.length > 40
            )
              return errorMessage;
          },
        },
        {
          title: "כותרת משנה",
          field: "subTitle",
          validate: (rowData) => {
            const errorMessage = "נא הזן כותרת משנה באורך 3-150 תווים";
            if (rowData.subTitle === undefined) return;
            if (
              rowData.subTitle === "" ||
              rowData.subTitle.length < 3 ||
              rowData.subTitle.length > 150
            )
              return errorMessage;
          },
        },
        {
          title: "תיאור",
          field: "description",
          validate: (rowData) => {
            const errorMessage = "נא הזן תיאור באורך 3-1500 תווים";
            if (rowData.description === undefined) return;
            if (
              rowData.description === "" ||
              rowData.description.length < 3 ||
              rowData.description.length > 1500
            )
              return errorMessage;
          },
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
          validate: (rowData) => {
            if (rowData.name === undefined) return;
            if (rowData.name === "") return "נא הזן שם";
          },
        },
        {
          title: "כתובת url",
          field: "url",
          validate: (rowData) => {
            if (rowData.url === undefined) return;
            if (rowData.url === "") return "נא הזן url";
          },
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
