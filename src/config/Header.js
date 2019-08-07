import { utils } from '../services';
import React from 'react';
// import {labelResources} from '../constants/labelResources.js'
import { Translation, labelResources, path } from '../constants'


import dashboard from '../assets/images/Dashboard/Dashboard_icon.png'
import dashboard_sel from '../assets/images/Dashboard/Dashboard_icon.png'
import user_icon from '../assets/images/Dashboard/user_management.png'
import user_icon_sel from '../assets/images/Dashboard/user_management-active.png'


let Label = labelResources.Header;

export const HeaderJSON = [

    {
        "name": <span className="menu-list dashboard"><i></i>{Label.dasboard}</span>,
        "path": path.dashboard
    },
    {
        "name": <span className="menu-list user_manag"><i></i>{Label.userLabel}</span>,
        "path": path.user
    },
    {
        "name": <span className="menu-list prdt_cate"><i></i>{Label.categoryLabel}</span>,
        "path": path.category

    },
    {
        "name": <span className="menu-list product"><i></i>{Label.productLabel}</span>,
        "path": path.products


    },
    {
        "name": <span className="menu-list order"><i></i>{Label.orderLabel}</span>,
        "path": path.order

    },
    {
        "name": <span className="menu-list coupon"><i></i>{Label.couponLabel}</span>,
        "path": path.coupons

    },
    {
        "name": <span className="menu-list pay_manag"><i></i>{Label.paymentLabel}</span>,
        "path": path.payments

    },

    {
        "name": <span className="menu-list report_manag"><i></i>{Label.reportLabel}</span>,
        "path": path.reports
    },

    {
        "name": <span className="menu-list faq"><i></i>{Label.FAQLabel}</span>,
        "path": path.faq
    },
    {
        "name": <span className="menu-list static"><i></i>{Label.staticTemplate}</span>,
        "path": path.staticTemplate
    }
]



{/* <div className="main-content">
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


        </div>
    </nav>

</div> */}