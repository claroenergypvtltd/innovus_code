import React from 'react'

export function TableData(props) {

  console.log(props);
  return (

    <div className="table-wrapper">
      <table className="table table-striped">
        <thead>
          <tr>
            {props.TableHead && props.TableHead.map((tableHead, index) => {
              return (

                <th key={index} className="table-head">{tableHead}</th>
              )
            })}
            {props.handleEdit || props.handleDelete && <th> ACTION</th>}
            {/* <th> ACTION</th> */}

          </tr>

        </thead>

        <tbody>
          {props.TableContent && props.TableContent.length === 0 ? <tr><td colSpan="7" className="text-center">No data Found </td></tr> :
            props.TableContent && props.TableContent.map((item, index) => {
              return (
                <tr key={index}>
                  {
                    item.itemList.map((itemD, indexD) =>
                      <td key={indexD}>{itemD}</td>
                    )
                  }
                  <td>
                    {/* {props.handleEdit && <div><i className="fa fa-pencil-square-o edit_icon btn-view" aria-hidden="true" onClick={() => props.handleEdit(item.itemId)}></i>
                      <span className="tooltip-text">View</span></div>
                    } */}
                    {props.handleEdit && (
                      <button onClick={() => props.handleEdit(item.itemId)} className="btn-edit">
                        <i className="fa fa-pencil-square-o" />
                        <span className="tooltip-text">Edit</span>
                      </button>
                    )}
                    {props.handleDelete && (
                      <button onClick={() => props.handleDelete(item.itemId)} className="btn-trash">
                        <i className="fa fa-trash" />
                        <span className="tooltip-text">Delete</span>
                      </button>
                    )}
                    {/* {props.handleDelete && <i className="fa fa-trash" aria-hidden="true" onClick={() => props.handleDelete(item.itemId)}></i>} */}
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



























