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
        logo: (
            <span className="menu-list dashboard">
                <i />
                {/* {Label.dasboard} */}
            </span>
        ),
        path: path.dashboard.list
    },
    {
        name: (
            <span className="menu-list order">
                <i />
                {Label.orderLabel}
            </span>
        ),
        logo: (
            <span className="menu-list order">
                <i />
                {/* {Label.orderLabel} */}
            </span>
        ),
        path: path.order.list,
    },
    // {
    //     name: (
    //         <span className="menu-list order">
    //             <i />
    //             {Label.orderLabel}
    //         </span>
    //     ),
    //     path: path.inprogress.order,
    // },

    {
        name: (
            <span className="menu-list user_manag">
                <i />
                {Label.userLabel}
            </span>
        ),
        logo: (
            <span className="menu-list user_manag">
                <i />
                {/* {Label.userLabel} */}
            </span>
        ), path: path.farmer.list,
    },
    // FetchIrrigationSetting

    {
        name: (
            <span className="menu-list prdt_cate">
                <i />
                {Label.categoryLabel}
            </span>
        ),
        logo: (
            <span className="menu-list prdt_cate">
                <i />
                {/* {Label.categoryLabel} */}
            </span>
        ),
        path: path.category.list,
    },
    {
        name: (
            <span className="menu-list pay_manag">
                <i />
                {Label.paymentLabel}
            </span>
        ),
        logo: (
            <span className="menu-list pay_manag">
                <i />
                {/* {Label.paymentLabel} */}
            </span>
        ),
        path: path.inprogress.payment,
    },

    {
        name: (
            <span className="menu-list report_manag">
                <i />
                {Label.reportLabel}
            </span>
        ),
        logo: (
            <span className="menu-list report_manag">
                <i />
                {/* {Label.reportLabel} */}
            </span>
        ),
        path: path.inprogress.reports,
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
        logo: (
            <span className="menu-list product">
                <i />
                {/* {Label.priceLabel} */}
            </span>
        ),
        path: path.price.list,
    },
    // {
    //     name: (
    //         <span className="menu-list order">
    //             <i />
    //             {Label.orderLabel}
    //         </span>
    //     ),
    //     path: path.order.list,
    // },
    {
        name: (
            <span className="menu-list order">
                <i />
                {Label.VehicleManagement}
            </span>
        ),
        logo: (
            <span className="menu-list order">
                <i />
                {/* {Label.VehicleManagement} */}
            </span>
        ),
        // path: path.inprogress.order,

        path: path.vehicle.list,
    },
    {
        name: (
            <span className="menu-list coupon">
                <i />
                {Label.couponLabel}
            </span>
        ),
        logo: (
            <span className="menu-list coupon">
                <i />
                {/* {Label.couponLabel} */}
            </span>
        ),
        path: path.coupons.list,
    },
    {
        name: (
            <span className="menu-list user_manag">
                <i />
                {Label.settingLabel}
            </span>
        ),
        logo: (
            <span className="menu-list user_manag">
                <i />
                {/* {Label.settingLabel} */}
            </span>
        ), path: path.setting.list,
    },


    {
        name: (
            <span className="menu-list faq">
                <i />
                {Label.FAQLabel}
            </span>
        ),
        logo: (
            <span className="menu-list faq">
                <i />
                {/* {Label.FAQLabel} */}
            </span>
        ),
        path: path.faq.list,
    },
    // {
    //     name: (
    //         <span className="menu-list static">
    //             <i />
    //             {Label.staticTemplate}
    //         </span>
    //     ),
    //     path: path.inprogress.list,
    // },
];
