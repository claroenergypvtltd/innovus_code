import React from 'react';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchUsers, deleteUser } from '../../actions/UserAction';
import { connect } from 'react-redux';
import { resorceJSON } from '../../libraries';
import PropTypes from 'prop-types';
// import GoogleMapPage from '../../shared/GoogleMapPage';
import { toastr } from '../../services/toastr.services';
import { path } from '../../constants';
import store from '../../store/store';
import { FARMER_DELETE_SUCCESS } from '../../constants/actionTypes'

class FetchUser extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props);
    this.state = {
      roleId: props.roleId,
      columns: resorceJSON.UserManagementList
    };
  }

  componentWillMount() {
    this.getUserList();
  }

  componentDidUpdate(preProps) {
    if (preProps.searchText != this.props.searchText) {
      this.getUserList();
    }
  }

  getUserList = () => {
    let user = {};
    user.roleId = this.state.roleId;
    user.search = this.props.searchText;
    this.props.fetchUsers(user);
  };

  componentWillReceiveProps(newProps) {
    debugger;
    if (newProps.userData && newProps.userData.userList.datas) {
      this.setState({ data: newProps.userData.userList.datas });
    }

    if (newProps.userData.deletedStatus == "200") {
      store.dispatch({ type: FARMER_DELETE_SUCCESS, resp: "" });
      this.getUserList();
    }

  }
  itemDelete = (item) => {
    this.props.deleteUser(item)
  };


  handleDelete = (data, e) => {
    e.preventDefault();
    let message = window.strings.DELETEMESSAGE;
    const toastrConfirmOptions = {
      onOk: () => { this.itemDelete(data.id) },
      onCancel: () => console.log('CANCEL: clicked')
    };
    toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM)
  }

  itemView = (e, item) => {
    let farmerId = item.id;
    this.context.router.history.push({
      pathname: '/user/view/' + farmerId,
      state: { farmerData: item },
    });

  };

  itemEdit = (Data) => {
    this.context.router.history.push({
      pathname: path.farmer.edit + Data.id,
      state: { farmerId: Data.id }
    })
  };

  onchangePagination(e) {
    e.preventDefault();
    return true
  }

  render() {
    return (
      <div>
        <DataTableDynamic
          tableHead={this.state.columns}
          tableDatas={this.state.data}
          handleEdit={this.itemEdit}
          handleView={this.itemView}
          handleDelete={this.handleDelete}
          pagination={this.onchangePagination}
        />
        {/* <GoogleMapPage /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user
});

export default connect(
  mapStateToProps,
  { fetchUsers, deleteUser },
)(FetchUser);
