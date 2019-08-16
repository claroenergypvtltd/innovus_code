import {utils} from '../services';
import React from 'react';
// import {labelResources} from '../constants/labelResources.js'
import {Translation,labelResources, path} from '../constants'


import  dashboard  from '../assets/images/Dashboard/Dashboard_icon.png'
import  dashboard_sel  from '../assets/images/Dashboard/Dashboard_icon.png'
import  user_icon  from '../assets/images/Dashboard/user_management.png'
import  user_icon_sel  from '../assets/images/Dashboard/user_management-active.png'


let Label = labelResources.Header;

export const HeaderJSON = [
    
    {
        "name" : <span className="menu-list dashboard"><i></i>{Label.dasboard}</span>,
        "path"  : path.dashboard
    },    
    {    
        "name":  <span className="menu-list user_manag"><i></i>{Label.userLabel}</span>,
        "path"  : path.user.list
    },
    {
        "name": <span className="menu-list prdt_cate"><i></i>{Label.categoryLabel}</span>,
        "path"  : path.category

    }, 
    {
        "name":  <span className="menu-list product"><i></i>{Label.productLabel}</span>,
        "path"  : path.products

        
    },  
    {
        "name": <span className="menu-list order"><i></i>{Label.orderLabel}</span>,
        "path"  : path.order
        
    }, 
    {
        "name":  <span className="menu-list coupon"><i></i>{Label.couponLabel}</span>,
        "path"  : path.coupons

    }, 
    {
        "name":  <span className="menu-list pay_manag"><i></i>{Label.paymentLabel}</span>,
        "path"  : path.payments

    },

    {
        "name": <span className="menu-list report_manag"><i></i>{Label.reportLabel}</span>,
        "path"  : path.reports
    },   
    
    {
        "name":  <span className="menu-list faq"><i></i>{Label.FAQLabel}</span>,
        "path"  : path.faq
    }, 
    {
        "name":  <span className="menu-list static"><i></i>{Label.staticTemplate}</span>,
        "path"  : path.staticTemplate
    }, 
    // {
    //     "name" : <div className="menu-img"><img alt="Brand" className="menu-icon" src={bulk_icon} /><img alt="Brand" className="menu-icon-hov" src={bulk_icon_sel } /></div> <span className="menu-list">BulkUpload </span></div>,
    //     "path"  : process.env.PUBLIC_URL+Label.BulkUpload,
    // },
]

