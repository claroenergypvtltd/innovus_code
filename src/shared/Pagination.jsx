import React from 'react';
// import Pagination from "react-js-pagination";
import { resorceJSON } from '../libraries'
import ReactPaginate from 'react-paginate';

export function ReactPagination(props) {
  return (
    <div className="page">

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
