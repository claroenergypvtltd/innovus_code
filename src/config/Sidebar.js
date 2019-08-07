import { utils } from '../services';
import React, { Component } from 'react';
// import {labelResources} from '../constants/labelResources.js'
import { Translation, labelResources, path } from '../constants'
import logo_black from '../assets/images/Agro_logo.png';

import dashboard from '../assets/images/Dashboard/Dashboard_icon.png'
import dashboard_sel from '../assets/images/Dashboard/Dashboard_icon.png'
import user_icon from '../assets/images/Dashboard/user_management.png'
import user_icon_sel from '../assets/images/Dashboard/user_management-active.png'
import notifi from '../assets/images/notification_icon.png';
import user from '../assets/images/Dashboard/avatar.png'

let Label = labelResources.Header;

export class Sidebar extends Component {

    render() {
        return (

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
                                <span className="user-name">Syed</span>
                            </a></li>
                        </ul>


                    </div>
                </nav>

            </div>

        );
    }

}



