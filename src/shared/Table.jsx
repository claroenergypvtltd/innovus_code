import React from 'react'

export function TableData(props){

  console.log(props);
  
   return (

    <div>
       <table className="table table-bordered table-striped">
          <thead>
          <tr>
            {props.TableHead && props.TableHead.map((tableHead,index) =>  {
              return(
 
                       <th key = {index} >{tableHead}</th>
             
                    )
                   })}
                  <th> ACTION</th>
           </tr>
          </thead>

          <tbody>
             { props.TableContent.length === 0 ?  <tr><td colSpan="7" className="text-center">No data Found </td></tr> :
                         props.TableContent.map((item,index) => {
                             return(
                                <tr key={index}>
                                {
                                  item.itemList.map((itemD,indexD) =>
                                    <td key = {indexD}>{itemD}</td>
                                  )
                                }
                                   <td>
                                   <i className="fa fa-pencil-square-o edit_icon" aria-hidden="true" onClick = {() =>props.handleEdit(item.itemId)}></i>
                                   <i className="fa fa-trash del_icon" aria-hidden="true" onClick = {() => props.handleDelete(item.itemId)}></i>
                                  </td>
                                  </tr>
                               
                              )
                          })
             }

          </tbody>

        </table>
    </div>
 
   )



}

  

























      