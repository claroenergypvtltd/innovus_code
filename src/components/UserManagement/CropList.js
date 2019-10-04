import React from 'react';
import { connect } from 'react-redux';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { resorceJSON } from '../../libraries';
import { utils } from '../../services/utils.services';
import PropTypes from "prop-types";

class CropList extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      cropList: [],
      columns: resorceJSON.CropList,
      data: [],
      isBooked: true
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ cropList: newProps.farmDataDetail.crops });
  }

  itemEdit = () => {
    console.log('fgfgdfh');
  };

  itemView = () => {
    console.log('hgfghjd');
  };

  expandableComponent = rows => {
    console.log('rowrowrowrowrowrow', rows);
  };

  irrigationPage = (Data) => {
    this.context.router.history.push({ pathname: '/irrigation/edit/' + Data.id, state: { farmDetails: this.props.farmDetails } });
  }


  ExpandedSection = ({ data }) =>


    data && data.irrigation && data.irrigation.map((item, index) => {
      return (
        <div key={index}>
          {index <= 0 && <div><h1>Irigation Schedule</h1>
            <button className="fa fa-pencil-square-o edit_icon float-right" onClick={() => this.irrigationPage(item)}></button></div>}
          <div>{item.name}</div>
          <div>{utils.dateConvertion(item.irrigationDate)}</div>
          <i className="fa fa-check" aria-hidden="true" />
          <button>{!item.isBooked ? 'Book' : 'Booked'} </button>
        </div>
      );
    });


  render() {
    const expandableComponent = <this.ExpandedSection />

    const data =
      this.state.cropList &&
      this.state.cropList.map((item, index) => {
        return {
          cropName: item.category.description,
          cropVariety: item.cropType,
          sowDate: utils.dateConvertion(item.sowDate),
          harvestDate: utils.dateConvertion(item.expectedHarvestDate),
          expectedQty: item.quantitySize,
          price: item.rupeesSize,
          irrigation: item.irrigation,
        };
      });

    return (
      <div>
        <DataTableDynamic
          tableHead={this.state.columns}
          tableDatas={data}
          handleView={this.itemView}
          expandable={true}
          pagination={true}
          expandableComponent={expandableComponent}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  farmDataDetail: state.user.farmDetails,
});

export default connect(mapStateToProps)(CropList);
