import React, { Component } from 'react';
// import  logo  from '../assets/images/logo.png' 
import logo_black from '../assets/images/Agro_logo.png';
import avatar from '../assets/images/avatar.png'
// import '../assets/css/header.css';
import { toastr } from '../services';
import { Header } from '../shared/Header';
import { Sidebar } from '../shared/Sidebar';
import { userData } from '../libraries';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { path } from '../constants';
// import {Dropdown} from 'react-bootstrap/Dropdown';
import notifi from '../assets/images/notification_icon.png';
import user from '../assets/images/Dashboard/avatar.png'
import { history } from '../store/history';



export class BaseContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            extension: false,
            PrevPath: "",
            visible: false,
        }
    }

    toggleMenu = () => {
        let flag = this.state.visible ? false : true;
        this.setState({ visible: flag })

    }

    // onLogout = () => {
    //     const toastrConfirmation = {
    //         onOk : () => { 
    //             localStorage.removeItem('user'),
    //             this.context.router.history.push(path.login.add),
    //             toastr.success(window.strings.LOGGEDOUT_SUCCESSFULLY)
    //         },
    //         onCancel: () => console.log('CANCEL: clicked')
    //     }
    //     toastr.customConfirm(window.strings['LOGOUT_CONFIRMATION'],toastrConfirmation,window.strings.SUBMIT_CONFIRM);
    // }

    handleClick = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('jwtToken');
        // this.context.router.history.push(path.login.login)
        this.context.router.history.push({
            pathname: path.login.login
        });
    }



    clickSettings = () => {
        this.context.router.history.push(path.setting.list)
    }

    onProfile = () => {
        this.context.router.history.push(path.profile.list)
    }

    HeaderExtension = () => {
        let Data = this.state.extension ? false : true;
        this.setState({ extension: Data })
    }

    render() {
        // To check loggedin credential
        const auth = () => {
            let user = userData();
            let token = user ? user.data && user.data.token : false;
            if (token) {
                return true;
            }
            else {
                return false;
            }
        }

        const renderDropdownNavbar = (item, index) => {
            let childContent = item && (item.child.filter((citem) => {
                // if(utils.enableRollAccessPermission(citem)){
                return citem
                // }
            })).map((getitem, getindex) => {
                return (
                    <li className="" key={'mykey' + getindex}>
                        <Link to={getitem.path}>{getitem.name}</Link>
                    </li>
                )
            });
            return childContent;
        }

        // let role = utils.getRoleId();
        let constant = window.constant;
        // let settingsontrol = (role === constant.ONE || role === constant.TWO || role === constant.THREE) ? true : false;

        return (
            <div>
                {
                    auth() ?
                        <div className="main-content">
                            <Header logOut={this.handleClick}></Header>
                            <div className="routerView">
                                <div className="sideBarmenu">
                                    <nav className="">
                                        {/* <button className="menu-btn" onClick={this.toggleMenu}><i class="fa fa-bars" aria-hidden="true"></i></button> */}
                                        {/* {this.state.visible && */}
                                        {/* <ul className="nav navbar-nav clearfix"> */}
                                        <ul className="sidebar-toggle p-0">
                                            {
                                                Sidebar && Sidebar.map((item, index) => {
                                                    let isActive = '';
                                                    let pathName = '';
                                                    let orgPath = this.context.router.route.location.pathname;
                                                    let editId = orgPath.split('/').pop();
                                                    if (item.child) {
                                                        item.child.map(value => {
                                                            if (orgPath === value.path + "/add") {
                                                                pathName = value.path + "/add";
                                                            } else if (orgPath === value.path + "/update/" + editId) {
                                                                pathName = value.path + "/update/" + editId;
                                                            } else if (orgPath === value.path) {
                                                                pathName = value.path;
                                                            }
                                                        })
                                                    } else {
                                                        if (orgPath && orgPath.includes(item.path)) {
                                                            pathName = orgPath;
                                                        }
                                                    }

                                                    return (
                                                        <li>
                                                            {this.state.visible ?
                                                                (pathName == orgPath) ?
                                                                    <div className="parent-menu" key={'mykey' + index}>
                                                                        <Link className="menu-link activate" to={item.path}>{item.logo} </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="parent-menu" key={'mykey' + index}>
                                                                        <Link className="menu-link" to={item.path}>{item.logo} </Link>
                                                                    </div>
                                                                :
                                                                (pathName == orgPath) ?
                                                                    <div className="parent-menu" key={'mykey' + index}>
                                                                        <Link className="menu-link activate" to={item.path}>{item.name} </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="parent-menu" key={'mykey' + index}>
                                                                        <Link className="menu-link" to={item.path}>{item.name} </Link>
                                                                    </div>
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        {/* } */}
                                    </nav>

                                </div>
                                <div className="main-container">
                                    {this.props.children}
                                </div>
                            </div>
                            <footer className="page-footer">
                                <div className="container-fluid">
                                    <div className="text-center">

                                    </div>
                                </div>
                            </footer>
                        </div>
                        :
                        <div>
                            {this.props.children}
                        </div>
                }
            </div>
        );
    }
}
