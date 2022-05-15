import React from "react";

const hebrewColumns = (tableName) => {
  let arr;
  switch (tableName) {
    case "links":
      return [
        { title: "סדר", field: "order", defaultSort: "asc" },
        { title: "שם", field: "name" },
        { title: "לינק", field: "url" },
        { title: "נוצר בתאריך", field: "createdAt" },
        { title: "עודכן בתאריך", field: "updatedAt" },
      ];
    case "departments":
      return [
        { title: "סדר", field: "order", defaultSort: "asc" },
        { title: "שם", field: "name" },
        { title: "נוצר בתאריך", field: "createdAt" },
        { title: "עודכן בתאריך", field: "updatedAt" },
      ];
    case "shobDevelopments":
      return [
        { title: "סדר", field: "order", defaultSort: "asc" },
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
        { title: "נוצר בתאריך", field: "createdAt" },
        { title: "עודכן בתאריך", field: "updatedAt" },
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
