import React from 'react';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchUsers,deleteUser } from '../../actions/UserManagementAction';
import { connect } from 'react-redux';
import { resorceJSON } from '../../libraries';

class FetchUser extends React.Component {
    constructor(props) {
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
    }

    componentWillReceiveProps(newProps) {
        if (newProps.list) {
            this.setState({ data: newProps.list });
        }
    }
    itemDelete = (item) => {
        let self = this;
        deleteUser(item.id).then(function(resp){
            if(resp){
                self.getUserList(); 
            }
        })
    }

    render() {
        return (
            <div>               
                <DataTableDynamic title="Movie List" tableHead={this.state.columns} tableDatas={this.state.data} handleEdit={this.itemEdit} handleView={this.itemView} handleDelete={this.itemDelete}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.user.userList,
})

export default connect(mapStateToProps, { fetchUsers })(FetchUser)
