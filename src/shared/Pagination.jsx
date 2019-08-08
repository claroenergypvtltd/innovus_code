import React from 'react';
import Pagination from "react-js-pagination";
import { resorceJSON } from '../libraries'

export function ReactPagination(props) {
  return (
    <div>

      <Pagination
        prevPageText={"previous"}
        nextPageText={"next"}
        activePage={props.PageDetails.activePage}
        pageRangeDisplayed={resorceJSON.TablePageData.paginationLength}
        itemsCountPerPage={props.PageDetails.perPage}
        totalItemsCount={props.PageDetails.pageCount}
        onChange={props.PageDetails.onPageChange}
        activeClassName={"active"}
      />

    </div>
  )
}
