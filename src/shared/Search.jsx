import React from 'react';


export function SearchBar(props) {
   return (

      <div className="clearfix">
         <div className="col-sm-5 pdl0">
            <input type="text" className="form-control " placeholder="Search..." value={props.SearchDetails.filterText} onChange={props.SearchDetails.onChange} />
         </div>
         <div className="col-sm-7 pdr0">
            <button type="submit" className="btn btn-primary mr15" onClick={props.SearchDetails.onClickSearch}><i className="fa fa-search mr15" aria-hidden="true"></i>SEARCH </button>
            <button type="button" className="btn btn-primary mrl10" onClick={props.SearchDetails.onClickReset}><i className="fa fa-refresh mr15" aria-hidden="true"></i>RESET</button>
         </div>
      </div>

   )
}




