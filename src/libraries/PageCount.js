import React from "react";
export function PageCount(props) {
  return ( //Showing 1 to 10 of 10 entries
    props.pageCount !== window.constant.ZERO && (
      <div className="pt-count">
        {window.strings.PAGE_COUNT.SHOWING +
          props.offsetData +
          window.strings.PAGE_COUNT.TO +
          props.pageCount +
          window.strings.PAGE_COUNT.OF +
          props.TotalpageCount +
          window.strings.PAGE_COUNT.ENTRIES}
      </div>
    )
  );
}

