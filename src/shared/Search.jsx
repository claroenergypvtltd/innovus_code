import React from 'react';


export function SearchBar(props) {
   return (

      <div className="">
         {props.searchclassName && props.searchclassName ? <form id="form1" onSubmit={props.SearchDetails.onClickSearch} className="form-retailer">
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
               <div className="search-box">
                  <input type="text" className="form-control retailer-search pl-1" placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
                  <a type="submit" form="form1" className="sub-search" onClick={props.SearchDetails.onClickSearch}>
                     <span className="search-img" aria-hidden="true"></span></a>
                  <button type="button" className="reset allreset ml-2" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
               </div>
            </form>
         }
      </div>

   )
}




