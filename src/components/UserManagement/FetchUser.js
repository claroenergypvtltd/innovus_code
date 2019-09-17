import React from 'react';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchUsers, deleteUser } from '../../actions/UserAction';
import { connect } from 'react-redux';
import { resorceJSON } from '../../libraries';
import PropTypes from 'prop-types';
// import GoogleMapPage from '../../shared/GoogleMapPage';
import { toastr } from '../../services/toastr.services';
import { path } from '../../constants';

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
    if (newProps.list) {
      this.setState({ data: newProps.list });
    }
  }
  itemDelete = (item) => {
    let self = this;
    deleteUser(item).then(resp => {
      if (resp) {
        self.getUserList();
      }
    });
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

  onChangepagination(e) {
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
          pagination={this.onChangepagination}
        />
        {/* <GoogleMapPage /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.user.userList,
});

export default connect(
  mapStateToProps,
  { fetchUsers },
)(FetchUser);
