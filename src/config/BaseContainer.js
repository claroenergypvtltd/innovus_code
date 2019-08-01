import React,{ Component } from 'react';  
import  logo  from '../assets/images/logo.png' 
// import  logo_white  from '../assets/images/logo_white.png' 
import  avatar  from '../assets/images/avatar.png' 
// import '../assets/css/header.css';
import { toastr } from '../services'; 
import {HeaderJSON} from './Header';
import {userData} from '../libraries';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {path} from '../constants';


export class BaseContainer extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props,context){
        debugger;
        super(props,context);
        this.state ={
            extension : false,
            PrevPath : "",
        }        
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

    clickSettings = () => {
        this.context.router.history.push(path.setting.list)
    }

    onProfile = () => {
        this.context.router.history.push(path.profile.list)
    }

    HeaderExtension = () => {
        let Data = this.state.extension ? false : true;
        this.setState({ extension : Data})
    }

    render(){
        // To check loggedin credential
        const auth = () => {
            let user = userData();
            let token = user ? user.data && user.data.token : false;
            if(token){
                return true;
            }
            else{
                return false;
            } 
        }

        const renderDropdownNavbar = (item,index) =>{
            let childContent  = item && (item.child.filter((citem) =>{
                // if(utils.enableRollAccessPermission(citem)){
                    return citem
                // }
            })).map((getitem,getindex) =>{
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
                    <div className="main-header">
                        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                            <div className="top-header">
                                <div className="container-fluid">
                                    {/* <div className="header-logo">
                                        <img alt="Brand" className="wt-logo" src={logo_white} />
                                    </div> */}
                                    <div className="right-menu">
                                        <ul>
                                            <li className="user-det">       
                                        <div className="dropdown profile-drp notification">
                                            <div className="dropdown-toggle drp-toggle" type="button" data-toggle="dropdown"> 
                                            <i className="fa fa-bell" aria-hidden="true"></i>
                                            </div>
                                            <div className="dropdown-menu">
                                            <div className="drop-title">Notifications  <a href="" className="read-more">View More</a></div>
                                            <ul className="profile-menu dropdown-notifications clearfix">
                                            </ul>
                                        
                                            </div>
                                        </div>
                                    
                                            </li>
                                            <li className="user-det">
                                            <div className="dropdown profile-drp">
                                            <div className="dropdown-toggle drp-toggle" type="button" data-toggle="dropdown"> <div className="stg-optn"><img alt="Brand" src={avatar} /></div>
                                            <span className="caret"></span></div>
                                            <ul className="dropdown-menu profile-menu clearfix">

                                            <li className="profile-li"> 
                                                <span onClick={ this.onProfile } className=""><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</span>
                                            </li>
                                            {/* {settingsontrol && <li className="profile-li"> 
                                                <span onClick={ this.clickSettings } className=""><i className="fa fa-cog" aria-hidden="true"></i> Settings</span>
                                            </li>} */}
                                            <li className="logout-txt profile-li"> 
                                                <span onClick={ this.onLogout } className=""><i className="fa fa-power-off" aria-hidden="true"></i> Logout</span>
                                            </li>
                                            </ul>
                                        </div>
                                            </li>
                                        </ul>   
                                    </div>
                                </div>
                            </div>
                        </nav>   
                    </div>
                    <div className="routerView col-md-12">
                        <div className = "sideBarmenu col-md-4">
                            <div className="col-md-8">
                                <div className="menu-w collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav clearfix">
                                    {
                                        HeaderJSON && HeaderJSON.map((item,index) => {                                                                               
                                            let isActive = '';
                                            let pathName = '';
                                            let orgPath = this.context.router.route.location.pathname;                                       
                                            let editId = orgPath.split('/').pop();                                        
                                                if(item.child){
                                                    item.child.map(value => {                                                                                                        
                                                        if(orgPath === value.path+"/add"){
                                                            pathName = value.path+"/add";
                                                        }else if(orgPath === value.path+"/update/"+editId){                                                        
                                                            pathName = value.path+"/update/"+editId;
                                                        }else if(orgPath === value.path){
                                                            pathName = value.path;    
                                                        }
                                                    })
                                                }else{
                                                    if(orgPath === item.path+"/add"){
                                                        pathName = item.path+"/add";
                                                }else if(orgPath === item.path+"/update/"+editId){                                                        
                                                        pathName = item.path+"/update/"+editId;
                                                    }else if(orgPath === item.path){
                                                        pathName = item.path;  
                                                }                                                      
                                                }
                                            
                                        return (
                                            <li>
                                            {
                                                item.hasOwnProperty('child') ?
                                                (renderDropdownNavbar(item,index)).length ?                                            
                                                    (pathName === orgPath)?
                                                        <div className='dropdown parent-menu li-menu-active'>
                                                            <a className='dropdown-toggle menu-link a-menu-active'> {item.name}</a>

                                                                {this.state.extension ? <ul className="dropdown-menu dropdown-menu_extension">
                                                                    {
                                                                        renderDropdownNavbar(item,index)
                                                                    }
                                                                    </ul>  
                                                                    :

                                                                    <ul className="dropdown-menu">
                                                                        {
                                                                        renderDropdownNavbar(item,index)
                                                                        }
                                                                    </ul>
                                                                }
                                                            


                                                        </div>
                                                        :
                                                        <div className='dropdown parent-menu '>
                                                            <a className='dropdown-toggle menu-link'> {item.name}</a>

                                                            {this.state.extension ? <ul className="dropdown-menu dropdown-menu_extension">
                                                                {
                                                                renderDropdownNavbar(item,index)
                                                                }
                                                                </ul>

                                                                :

                                                                <ul className="dropdown-menu">
                                                                    {
                                                                    renderDropdownNavbar(item,index)
                                                                    }                                                                
                                                                </ul>
                                                            }
                                                        </div>
                                                    :   
                                                    ''
                                                    :
                                                   
                                                    <div className ="parent-menu" key={'mykey' + index}>
                                                        <Link className="menu-link" to={item.path}>{item.name} </Link>
                                                    </div>
                                            }
                                            </li>
                                        )
                                        })
                                    }  
                                    </ul>
                                </div>  
                            </div>

                        </div>
                        <div className="container-fluid">
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
                { this.props.children }
                </div>    
            }
            </div>       
        );       
    }
}
