import {utils} from '../services';
import React from 'react';
// import {labelResources} from '../constants/labelResources.js'
import {labelResources, path} from '../constants'


import  dashboard  from '../assets/images/Dashboard/Dashboard_icon.png'
import  dashboard_sel  from '../assets/images/Dashboard/Dashboard_icon.png'
import  user_icon  from '../assets/images/Dashboard/user_management.png'
import  user_icon_sel  from '../assets/images/Dashboard/user_management-active.png'


let Label = labelResources.Header;

export const HeaderJSON = [
    
    {
        "name" : <div className="clearfix"><div className="menu-img"><img alt="Dashboard" className="menu-icon" src={dashboard} /><img alt="Dashboard" className="menu-icon-hov" src={dashboard_sel} /></div> <span className="menu-list">{Label.dashboard}</span></div>,
        "path"  : path.dashboard
    },    
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.user
    },
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.category
    },
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.products
    },
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.coupons
    },  
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.order
    }, 
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.payments
    }, 
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.reports
    }, 
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.faq
    }, 
    {
        "name": <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={user_icon} /><img alt="Brand" className="menu-icon-hov" src={user_icon_sel} /></div> <span className="menu-list">{Label.userLabel}</span></div>,
        "path"  : path.staticTemplate
    }, 
    // {
    //     "name" : <div className="clearfix"><div className="menu-img"><img alt="Brand" className="menu-icon" src={bulk_icon} /><img alt="Brand" className="menu-icon-hov" src={bulk_icon_sel } /></div> <span className="menu-list">BulkUpload </span></div>,
    //     "path"  : process.env.PUBLIC_URL+Label.BulkUpload,
    // },
]

