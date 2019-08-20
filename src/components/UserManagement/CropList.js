import React from 'react';
import { connect } from 'react-redux';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { resorceJSON } from '../../libraries';
import moment from 'moment';
import { utils } from '../../services/utils.services';

class CropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropList: [],
      columns: resorceJSON.CropList,
      data: [],
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps.crops);
    this.setState({ cropList: newProps.farmDataDetail.crops });
  }

  itemEdit = () => {
    console.log('fgfgdfh');
  };

  itemView = () => {
    console.log('hgfghjd');
  };

  expandableComponent = row => {
    console.log('rowrowrowrowrowrow', row);
  };

  render() {
    const expandableComponent = <div>{'Irrication Schedule'}</div>;
    const data =
      this.state.cropList &&
      this.state.cropList.map((item, index) => {
        console.log('time', utils.dateConvertion(item.sowDate));
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

    console.log('data', data);
    return (
      <div>
        <DataTableDynamic
          tableHead={this.state.columns}
          tableDatas={data}
          handleEdit={this.itemEdit}
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
