import React from "react";

const Grid = ({ myhtml }) => {
  function createMarkup(mydata) {
    return { __html: `${mydata}` };
  }

  return (
    <>
      <div className="py-10">
        <div class="flex flex-col text-center w-full mb-10">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-1">
            Category!
          </h1>
          <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font ">
            shop by our Categories!
          </h2>
        </div>
        <div
          className="text-gray-600 body-font"
          dangerouslySetInnerHTML={createMarkup(myhtml.data.attributes.source)}
        />
      </div>
    </>
  );
};

export default Grid;
