import React from 'react';


export function SearchBar(props) {
   let retailerSearch = props.className && props.className ? 'form-control search-btn pl-1 retailerSearch' : 'form-control search-btn pl-1'
   return (
      <div className="search">
         <form id="form1" onSubmit={props.SearchDetails.onClickSearch} className="form-search">
            <div className="pt-search-box">
               <input type="text" className={retailerSearch} placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
            </div>
            <div className="pt-search-btn t-srch p-0 col-md-6">
               {/* <a type="submit" form="form1" className="col-md-6" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 " aria-hidden="true"></i>{window.strings.SEARCH} </a>
               <button type="button" className="col-md-6" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i>{window.strings.RESET}</button> */}
               <a type="submit" form="form1" className="p-0 sub-search" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 search-label" aria-hidden="true"></i></a>
               <button type="button" className="reset-btn" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
            </div>
         </form>
      </div>

   )
}




