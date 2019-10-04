import React from 'react';
import { renderRoutes } from 'react-router-config';
import Login from '../components/Login';
import CreateCategory from '../components/CategoryModule/CreateCategory';
import FetchCategory from '../components/CategoryModule/FetchCategory';
import CreateFarmers from '../components/FarmersModule/CreateFarmers';
import User from '../components/UserManagement/User'
import Home from '../components/Home';
import FarmerDetailProfile from '../components/UserManagement/FarmerDetailProfile';
import ViewCategory from '../components/CategoryModule/ViewCategory';
import { path } from '../constants';
import FetchCrop from '../components/CropModule/FetchCrop'
import CreateCrop from '../components/CropModule/CreateCrop'
import PersonalAndContactInfo from '../components/FarmersModule/PersonalAndContactInfo'
import RetailersInfo from '../components/RetailersModule/RetailersInfo'
import RetailerDetailProfile from '../components/RetailersModule/RetailerDetailProfile'
import DummyFile from '../components/DummyFile'
import CreateFarmDetails from '../components/FarmersModule/CreateFarmDetails'
import CreateCropDetails from '../components/FarmersModule/CreateCropDetails'
import CreateIrrigationSchedule from '../components/FarmersModule/CreateIrrigationSchedule'
import FetchPrice from '../components/PriceModule/FetchPrice'
import CreatePrice from '../components/PriceModule/Createprice'
import FetchCart from '../components/CartModule/FetchCart'
import FetchOrder from '../components/OrderModule/FetchOrder'
import FetchOrderDetails from '../components/OrderModule/FetchOrderDetails'
import CreateFAQ from '../components/FAQModule/CreateFAQ'
import FetchFAQ from '../components/FAQModule/FetchFAQ'

import IrrigationSetting from '../components/SettingsModule/IrrigationSetting'
import FetchIrrigationSetting from '../components/SettingsModule/FetchIrrigationSetting'


// import CreateCoupon from '../components/CouponModule/CreateCoupon'
// import FetchCoupon from '../components/CouponModule/FetchCoupon'

import FetchProduct from '../components/ProductModule/FetchProduct'

const root = ({ route }) => (
    <div>
        {renderRoutes(route.routes)}
    </div>
)

const wildCardRouterPath = () => (
    <div>
        <center>Something went wrong .... the page doesn't exist.</center>
    </div>
)

const permissionDenied = () => (
    <div>
        <center>Something went wrong .... Permission Denied</center>
    </div>
)

console.log(path.dashboard.name);

export const routesPath = [
    {
        component: Login,
        path: process.env.PUBLIC_URL + '/login',
        exact: true
    },
    // {
    //     path: process.env.PUBLIC_URL + '/resetPassword/:token?',
    //     component: ForgetPassword,
    //     exact: true
    // },
    {
        component: root,
        path: process.env.PUBLIC_URL + '/',
        routes: [
            {
                component: Login,
                path: process.env.PUBLIC_URL + '/login',
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/dashboard',
                component: Home,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/category/add',
                component: CreateCategory,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/category',
                component: FetchCategory,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/category/edit/:categoryId?',
                component: CreateCategory,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/category/view/:categoryId?',
                component: ViewCategory,
                exact: true
            },
            // {
            //     path: process.env.PUBLIC_URL + '/user/farmers/add',
            //     component: CreateFarmers,
            //     exact: true
            // },
            {
                path: process.env.PUBLIC_URL + '/user/farmers/add',
                component: PersonalAndContactInfo,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/user/farmers/edit/:id?',
                component: PersonalAndContactInfo,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/user/retailer/add',
                component: RetailersInfo,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/user/retailer/view/:retailerId',
                component: RetailerDetailProfile,
                exact: true,

            },
            {
                path: process.env.PUBLIC_URL + '/user/retailer/edit/:retailerId',
                component: RetailersInfo,
                exact: true,

            },
            {
                path: process.env.PUBLIC_URL + '/user',
                component: User,
                exact: true
            },


            {
                path: process.env.PUBLIC_URL + '/farm/add',
                component: CreateFarmDetails,
                exact: true
            },

            {
                path: process.env.PUBLIC_URL + '/farm/edit/:id?',
                component: CreateFarmDetails,
                exact: true
            },

            {
                path: process.env.PUBLIC_URL + '/irrigation/edit/:id?',
                component: CreateIrrigationSchedule,
                exact: true
            },

            {
                path: process.env.PUBLIC_URL + '/cropDetails/add',
                component: CreateCropDetails,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/user',
                component: User,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/user/view/:farmerId',
                component: FarmerDetailProfile,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/crop',
                component: FetchCrop,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/crop/add',
                component: CreateCrop,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/crop/edit/:categoryId?',
                component: CreateCrop,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/price',
                component: FetchPrice,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/price/add',
                component: CreatePrice,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/price/edit/:id?',
                component: CreatePrice,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/cart',
                component: FetchCart,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/order',
                component: FetchOrder,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/order/:id?',
                component: FetchOrderDetails,
                exact: true,
            },

            // {
            //     path: process.env.PUBLIC_URL + '/coupon',
            //     component: FetchCoupon,
            //     exact: true,
            // },

            // {
            //     path: process.env.PUBLIC_URL + '/coupon/add',
            //     component: CreateCoupon,
            //     exact: true,
            // },

            {
                path: process.env.PUBLIC_URL + '/setting',
                component: FetchIrrigationSetting,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/setting/add',
                component: IrrigationSetting,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/product',
                component: FetchProduct,
                exact: true,
            },


            //FAQ 
            {
                path: process.env.PUBLIC_URL + '/FAQ/add',
                component: CreateFAQ,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/FAQ',
                component: FetchFAQ,
                exact: true,
            },





            {
                path: process.env.PUBLIC_URL + '/inprogress',
                component: DummyFile,
                exact: true
            },
            {
                path: '*',
                component: wildCardRouterPath
            },
        ]
    },
    {
        component: root,
        path: process.env.PUBLIC_URL + '/form',
        routes: [
            // {
            //     path: process.env.PUBLIC_URL + '/form/customer',
            //     component: CreateCustomer,
            //     exact: true
            // }
        ]
    },
    {
        path: '*',
        component: wildCardRouterPath
    }
]



