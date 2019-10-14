import React from 'react';


export function SearchBar(props) {
   return (

      <div className="clearfix col-md-8">
         <form id="form1" onSubmit={props.SearchDetails.onClickSearch} className="form-search">
            <div className="pt-search-box">
               <input type="text" className="form-control search-btn pl-1" placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
            </div>
            <div className="pt-search-btn t-srch pl-3 col-md-5">
               {/* <a type="submit" form="form1" className="col-md-6" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 " aria-hidden="true"></i>{window.strings.SEARCH} </a>
               <button type="button" className="col-md-6" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i>{window.strings.RESET}</button> */}
               <a type="submit" form="form1" className="p-0 sub-search" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 search-label" aria-hidden="true"></i></a>
               <button type="button" className="reset-btn" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
            </div>
         </form>
      </div>

   )
}




