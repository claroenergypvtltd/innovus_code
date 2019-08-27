import React from 'react';
// import Pagination from "react-js-pagination";
import { resorceJSON } from '../libraries'
import ReactPaginate from 'react-paginate';

export function ReactPagination(props) {
  return (
    <div>

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

      <ReactPaginate previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={<a href="">...</a>}
        breakClassName={"break-me"}
        pageCount={props.PageDetails.pageCount}
        marginPagesDisplayed={2}
        onPageChange={props.PageDetails.onPageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />


    </div >
  )
}
