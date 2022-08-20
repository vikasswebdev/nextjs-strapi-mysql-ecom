import React from "react";

const Grid = ({ myhtml }) => {
  function createMarkup(mydata) {
    return { __html: `${mydata}` };
  }

  return (
    <div
      className="text-gray-600 body-font"
      dangerouslySetInnerHTML={createMarkup(myhtml.data.attributes.source)}
    />
  );
};

export default Grid;
