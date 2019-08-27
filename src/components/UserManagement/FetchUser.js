import React from 'react';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchUsers, deleteUser } from '../../actions/UserAction';
import { connect } from 'react-redux';
import { resorceJSON } from '../../libraries';
import PropTypes from 'prop-types';

class FetchUser extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props);
    this.state = {
      roleId: props.roleId,
      columns: resorceJSON.UserManagementList,
      data: [],
    };
  }

  componentWillMount() {
    this.getUserList();
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
  itemDelete = item => {
    let self = this;
    deleteUser(item.id).then(function(resp) {
      if (resp) {
        self.getUserList();
      }
    });
  };

  itemView = (e, item) => {
    let farmerId = item.id;
    this.context.router.history.push({
      pathname: '/user/view/' + farmerId,
      state: { farmerData: item },
    });
  };

  itemEdit = () => {
    console.log('itemEdit-------');
  };

  render() {
    return (
      <div>
        <DataTableDynamic
          tableHead={this.state.columns}
          tableDatas={this.state.data}
          handleEdit={this.itemEdit}
          handleView={this.itemView}
          handleDelete={this.itemDelete}
          pagination={true}
        />
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
