import React from 'react';


export function SearchBar(props) {
   return (

      <div className="">
         {props.className ? <form id="form1" onSubmit={props.SearchDetails.onClickSearch} className="form-retailer">
            <div className="search-box">
               <input type="text" className="form-control retailer-search pl-1" placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
               <a type="submit" form="form1" className="sub-search" onClick={props.SearchDetails.onClickSearch}>
                  <span className="search-img" aria-hidden="true"></span></a>

            </div>
            {/* <div className="col-md-6"> */}
            {/* <a type="submit" form="form1" className="sub-search" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 search-label" aria-hidden="true"></i></a> */}
            {/* </div> */}

         </form> :

            <form id="form1" onSubmit={props.SearchDetails.onClickSearch} className="form-search">
               <div className="pt-search-box">
                  <input type="text" className="form-control search-btn pl-1" placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
               </div>
               <div className="pt-search-btn t-srch p-0 col-md-6">
                  {/* <a type="submit" form="form1" className="col-md-6" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 " aria-hidden="true"></i>{window.strings.SEARCH} </a>
               <button type="button" className="col-md-6" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i>{window.strings.RESET}</button> */}
                  <a type="submit" form="form1" className="p-0 sub-search" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mrr5 search-label" aria-hidden="true"></i></a>
                  <button type="button" className="reset-btn" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
               </div>
            </form>
         }
      </div>

   )
}




