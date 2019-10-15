import React from 'react';
import { labelResources, path } from '../constants';

let Label = labelResources.Sidebar;

export const Sidebar = [
    {
        name: (
            <span className="menu-list dashboard">
                <i />
                {Label.dasboard}
            </span>
        ),
        path: path.dashboard.list
    },
    {
        name: (
            <span className="menu-list user_manag">
                <i />
                {Label.userLabel}
            </span>
        ),
        // "path": path.user.add
        path: path.farmer.list,
    },

    {
        name: (
            <span className="menu-list user_manag">
                <i />
                {Label.settingLabel}
            </span>
        ),
        // "path": path.user.add
        path: path.setting.list,
    },

    // FetchIrrigationSetting

    {
        name: (
            <span className="menu-list prdt_cate">
                <i />
                {Label.categoryLabel}
            </span>
        ),
        path: path.category.list,
    },
    // {
    //     name: (
    //         <span className="menu-list prdt_cate">
    //             <i />
    //             {Label.CropLabel}
    //         </span>
    //     ),
    //     path: path.crop.list,
    // },
    // {
    //     name: (
    //         <span className="menu-list product">
    //             <i />
    //             {Label.productLabel}
    //         </span>
    //     ),
    //     path: path.products.list,
    // },
    // {
    //     name: (
    //         <span className="menu-list prdt_cate">
    //             <i />
    //             {Label.CartLabel}
    //         </span>
    //     ),
    //     path: path.cart.list,
    // },
    {
        name: (
            <span className="menu-list product">
                <i />
                {Label.priceLabel}
            </span>
        ),
        path: path.price.list,
    },
    {
        name: (
            <span className="menu-list order">
                <i />
                {Label.orderLabel}
            </span>
        ),
        path: path.order.list,
    },
    {
        name: (
            <span className="menu-list coupon">
                <i />
                {Label.couponLabel}
            </span>
        ),
        path: path.coupons.list,
    },
    {
        name: (
            <span className="menu-list pay_manag">
                <i />
                {Label.paymentLabel}
            </span>
        ),
        path: "/inprogress",
    },

    {
        name: (
            <span className="menu-list report_manag">
                <i />
                {Label.reportLabel}
            </span>
        ),
        path: "/inprogress",
    },

    {
        name: (
            <span className="menu-list faq">
                <i />
                {Label.FAQLabel}
            </span>
        ),
        path: path.faq.list,
    },
    {
        name: (
            <span className="menu-list static">
                <i />
                {Label.staticTemplate}
            </span>
        ),
        path: "/inprogress",
    },
];
