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
import FetchPool from '../components/PriceModule/FetchPool'
import CreatePool from '../components/PriceModule/CreatePool'
import FetchCart from '../components/CartModule/FetchCart'
import FetchOrder from '../components/OrderModule/FetchOrder'
import FetchOrderDetails from '../components/OrderModule/FetchOrderDetails'

import IrrigationSetting from '../components/SettingsModule/IrrigationSetting'
import FetchIrrigationSetting from '../components/SettingsModule/FetchIrrigationSetting'

import CreateCoupon from '../components/CouponModule/CreateCoupon'
import FetchCoupon from '../components/CouponModule/FetchCoupon'

import CreateFAQ from '../components/FAQModule/CreateFAQ'
import FetchFAQ from '../components/FAQModule/FetchFAQ'

import FetchSalesAgent from '../components/SalesAgent/FetchSalesAgent'
import CreateSalesAgent from '../components/SalesAgent/CreateSalesAgent'

import CreateVehicle from '../components/VehicleManagement/CreateVehicle'
import FetchVehicle from '../components/VehicleManagement/FetchVehicle'

import FetchDC from '../components/DCManagement/FetchDC'
import CreateDC from '../components/DCManagement/CreateDC'

import FetchRegion from '../components/DCManagement/FetchRegion'
// import CreateCredit from '../components/OrderModule/CreateCredit'

import setting from '../components/Setting/setting'
import AppSetting from '../components/Setting/AppSetting';
import CreateRegion from '../components/DCManagement/CreateRegion'
import FetchQuantityType from '../components/Setting/FetchQuantityType'
import CreateQuantityType from '../components/Setting/CreateQuantityType';

import reports from '../components/ReportModule/report';
import CustomerOnboard from '../components/ReportModule/CustomerOnboard';
import ExecutivePerformace from '../components/ReportModule/ExecutivePerformance';
import PlacingOrder from '../components/ReportModule/PlacingOrder';
import report from '../components/ReportModule/report';
import OrderValue from '../components/ReportModule/OrderValue';
import TonnesOrder from '../components/ReportModule/TonnesOrder';
import PriceElasticity from '../components/ReportModule/PriceElasticity';


import Policy from '../components/AboutModule/Policy';
import PrivacyPolicy from '../components/AboutModule/PrivacyPolicy';
import TermsConditions from '../components/AboutModule/TermsConditions';

import ReturnCancellation from '../components/AboutModule/ReturnCancellation';


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
                component: Login,
                path: process.env.PUBLIC_URL + '/',
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
            // {
            //     path: process.env.PUBLIC_URL + '/user/salesAgent',
            //     component: FetchSalesAgent,
            //     exact: true,
            // },
            {
                path: process.env.PUBLIC_URL + '/user/salesAgent/add',
                component: CreateSalesAgent,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/user/salesAgent/edit/:id?',
                component: CreateSalesAgent,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/crop',
                component: FetchCrop,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/category/crop/add',
                component: CreateCrop,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/category/crop/edit/:categoryId?',
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
                path: process.env.PUBLIC_URL + '/price/pool',
                component: FetchPool,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/price/pool/add',
                component: CreatePool,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/price/pool/edit/:id?',
                component: CreatePool,
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

            {
                path: process.env.PUBLIC_URL + '/coupon',
                component: FetchCoupon,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/coupon/add',
                component: CreateCoupon,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/irrigationSetting/add',
                component: IrrigationSetting,
                exact: true,
            },
            {
                path: process.env.PUBLIC_URL + '/coupon/update/:Data?',
                component: CreateCoupon,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/irrigationSetting/edit/:id?',
                component: IrrigationSetting,
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
                path: process.env.PUBLIC_URL + '/FAQ/update/:Data?',
                component: CreateFAQ,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/irrigationSetting',
                component: FetchIrrigationSetting,
                exact: true,
            },

            {
                path: process.env.PUBLIC_URL + '/order/inprogress/page',
                component: DummyFile,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/payment/inprogress',
                component: DummyFile,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports',
                component: report,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports/customerOnboard',
                component: CustomerOnboard,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports/executivePerformance',
                component: ExecutivePerformace,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports/placingOrder',
                component: PlacingOrder,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports/orderValue',
                component: OrderValue,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports/tonnesOrder',
                component: TonnesOrder,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/reports/reportPrice',
                component: PriceElasticity,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/vehicle/add',
                component: CreateVehicle,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/vehicle/edit/:id?',
                component: CreateVehicle,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/vehicle',
                component: FetchVehicle,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/dc',
                component: FetchDC,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/dc/add',
                component: CreateDC,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/dc/edit/:id?',
                component: CreateDC,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/dc/region',
                component: FetchRegion,
                exact: true
            }, {
                path: process.env.PUBLIC_URL + '/dc/region/add',
                component: CreateRegion,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/dc/region/edit/:id?',
                component: CreateRegion,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/setting',
                component: setting,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/setting/appVersion',
                component: AppSetting,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/setting/fetchquantitytype',
                component: FetchQuantityType,
                exact: true
            }, ,
            {
                path: process.env.PUBLIC_URL + '/setting/createquantitytype',
                component: CreateQuantityType,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/setting/policyList',
                component: Policy,
                exact: true
            },
            {
                path: process.env.PUBLIC_URL + '/setting/policy',
                component: PrivacyPolicy,
                exact: true
            },
            // {
            //     path: process.env.PUBLIC_URL + '/aboutpolicy/privacypolicy',
            //     component: PrivacyPolicy,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/aboutpolicy/termscondition',
            //     component: TermsConditions,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/aboutpolicy/return',
            //     component: ReturnCancellation,
            //     exact: true
            // },

            // {
            //     path: process.env.PUBLIC_URL + '/credit',
            //     component: CreateCredit,
            //     exact: true
            // },
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



