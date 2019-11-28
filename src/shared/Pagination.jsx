import React from 'react';
// import Pagination from "react-js-pagination";
import { resorceJSON } from '../libraries'
import ReactPaginate from 'react-paginate';

export function ReactPagination(props) {
  debugger;
  return (
    <div className="page text-right mt-2">

      {/* <Pagination
        prevPageText={"previous"}
        nextPageText={"next"}
        activePage={props.PageDetails.activePage}
        pageRangeDisplayed={resorceJSON.TablePageData.paginationLength}
        itemsCountPerPage={props.PageDetails.perPage}
        totalItemsCount={props.PageDetails.pageCount}
        onChange={props.PageDetails.onPageChange}
        activeClassName={"active"}
      /> */}
      {props.PageDetails.totalCount != 0 && <label className="label-title mb-0 pr-5 mr-5"> Total Number of Records : {props.PageDetails.totalCount}</label>}
      <ReactPaginate previousLabel={"<"}
        nextLabel={">"}
        breakLabel={<a>...</a>}
        breakClassName={"break-me"}
        pageCount={props.PageDetails.pageCount}
        marginPagesDisplayed={2}
        onPageChange={props.PageDetails.onPageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={props.PageDetails.activePage}
      />


    </div >
  )
}
