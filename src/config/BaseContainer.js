import React,{ Component } from 'react';  
// import  logo  from '../assets/images/logo.png' 
import  logo_black  from '../assets/images/Agro_logo.png' ;
import  avatar  from '../assets/images/avatar.png' 
// import '../assets/css/header.css';
import { toastr } from '../services'; 
import {HeaderJSON} from './Header';
import {userData} from '../libraries';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {path} from '../constants';
import {Dropdown} from 'react-bootstrap/Dropdown';
import notifi from '../assets/images/notification_icon.png';
import user from '../assets/images/Dashboard/avatar.png'



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
                    <div className="main-header container-fluid p-0">
                        
<nav className="navbar navbar-expand-lg">
  
  <a className="navbar-brand header-logo"><img alt="Brand" className="wt-logo" src={logo_black} /></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="header-right ml-auto">
                    <li className="notify-sec"><a><img src={notifi} /></a></li>
                    <li className="profile-sec"><a><img src={user} />
                        <span className="user-name">Avanthika</span>
                     </a></li>
                </ul>
                
    
    {/* <div className="dropdown"> */}
        {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        
        </a> */}
        {/* <button
        className="btn btn-primary dropdown-toggle mr-1"
        data-toggle="dropdown"
        type="button"
      >
         Dropdown link
      </button>
    
        <div  className="dropdown-menu" id="dropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div> */}
    {/* </div> */}
    <Dropdown className=" ml-auto">
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
 
</div>
</nav>
                          
                    </div>
                    <div className="routerView">
                        <div className = "sideBarmenu">
                            <nav className="">
                                {/* <div className="menu-w collapse navbar-collapse" id="bs-example-navbar-collapse-1"> */}
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
                                {/* </div>   */}
                            </nav>

                        </div>
                        <div className="main-container container-fluid">
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
