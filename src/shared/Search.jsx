import React from 'react';


export function SearchBar(props) {
   return (

      <div className="clearfix">
         <form id="form1" onSubmit={props.SearchDetails.onClickSearch}>
            <div className="pt-search-box">
               <input type="text" className="form-control " placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
            </div>
            <div className="pt-search-btn t-srch">
               <a type="submit" form="form1" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5" aria-hidden="true"></i>{window.strings.SEARCH} </a>
               <button type="button" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i>{window.strings.RESET}</button>
            </div>
         </form>
      </div>

   )
}




