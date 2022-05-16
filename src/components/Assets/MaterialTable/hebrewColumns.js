import React from "react";

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
