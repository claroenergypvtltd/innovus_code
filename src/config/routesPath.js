import React from 'react';
import { renderRoutes } from 'react-router-config';
import  Login from '../components/Login';
// import { CreateCategory } from '../component/CreateCategory';
// import { Category, CategoryList } from '../component/category';
// import { CreateUser, CreateStore, CreateAboutUs, CreateContactUs, CreateBanner, CreateGram, CreateStatusMaster, CreateDiamondMaster, CreateGemstoneMaster, CreateDealer, CreateCustomer, CreateCutMaster, CreatePurity, CreateMetal, CreateCollection, CreateColorMaster, CreateShapeMaster, CreateClarityMaster, CreateCertificate, CreateCurrency, CreateOrder, CreateLicense,CreateBulkUpload } from '../component/create';

// import { Location, Category, Size, Karigar } from '../component/masters';
// import { AboutUs, ContactUs } from '../component/Ecom';
// import { ManageCatalogue } from '../component/form'
// import { DealerList, CatalogueList, ManageCatalogueList, SizeList, BannerList, UserList, KarigarList, LocationList, CategoryList, PriceList, CertificateList, StoreList, PurityList, MetalList, CollectionList, GramList, GemStoneList, DimensionList, JewelList, DiamondList, StatusList, CurrencyList, OrderList, CustomerList, OrderDetailsList } from '../component/list';
// import { JewelForm, JewelGramForm, JewelGemstoneForm, JewelDiamondForm, JewelDiamondList, CreateJewel } from '../component/jewel';
import  Home  from '../components/Home';
// import { RollAuthenticaion } from './RollAuthenticaion';
// import { Settings, Profile, License } from '../component/settings';

import { path } from '../constants';



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
debugger;

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
                path: process.env.PUBLIC_URL + '/',
                component: Home,
                exact: true
            },
            // {
            //     path: process.env.PUBLIC_URL + '/category',
            //     component: CategoryList,
            //     exact: true,
            //     // permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/category/add',
            //     component: { CreateCategory },
            //     exact: true,
            //     // permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/category/update/:categoryId?',
            //     component: Category,
            //     exact: true,
            //     // permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/user/update/:id?',
            //     component: RollAuthenticaion(CreateUser),
            //     exact: true,
            //     permissionData: "user"
            // },
            
            // {
            //     path: process.env.PUBLIC_URL + '/karigar/update/:id?',
            //     component: RollAuthenticaion(Karigar),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/purity/update/:id?',
            //     component: RollAuthenticaion(PurityList),
            //     exact: true,
            //     permissionData: "jewel"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/banner/update/:id?',
            //     component: RollAuthenticaion(BannerList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/category/update/:categoryId?',
            //     component: RollAuthenticaion(Category),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/metal/update/:id?',
            //     component: RollAuthenticaion(MetalList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/Certificate/update/:certificateId?',
            //     component: RollAuthenticaion(CertificateList),
            //     exact: true,
            //     permissionData: "jewel"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/cut/update/:cutId?',
            //     component: RollAuthenticaion(DimensionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/color/update/:colorId?',
            //     component: RollAuthenticaion(DimensionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/clarity/update/:clarityId?',
            //     component: RollAuthenticaion(DimensionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/shape/update/:shapeId?',
            //     component: RollAuthenticaion(DimensionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/location/update/:id?',
            //     component: RollAuthenticaion(LocationList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/gram/update/:gramId?',
            //     component: RollAuthenticaion(CreateGram),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/diamond/update/:diamondId?',
            //     component: RollAuthenticaion(CreateDiamondMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/size/update/:id?',
            //     component: RollAuthenticaion(Size),
            //     exact: true,
            //     permissionData: "master"
            // },{
            //     path: process.env.PUBLIC_URL + '/gemstone/update/:gemStoneId?',
            //     component: RollAuthenticaion(CreateGemstoneMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/size/update/:id?',
            //     component: RollAuthenticaion(SizeList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/collection/update/:id?',
            //     component: RollAuthenticaion(CollectionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/status/update/:id?',
            //     component: RollAuthenticaion(StatusList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/dealer/update/:id?',
            //     component: RollAuthenticaion(CreateDealer),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/customer/update/:cutomerId?',
            //     component: RollAuthenticaion(CreateCustomer),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/currency/update/:currencyId?',
            //     component: RollAuthenticaion(CurrencyList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/order/update/:orderId?',
            //     component: RollAuthenticaion(CreateOrder),
            //     exact: true,
            //     permissionData: "order"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/catalogue/add',
            //     component: RollAuthenticaion(CatalogueList),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/catalogue/update/:catalogueId?',
            //     component: RollAuthenticaion(ManageCatalogue),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/store/add',
            //     component: RollAuthenticaion(CreateStore),
            //     exact: true,
            //     permissionData: "store"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/user/add',
            //     component: RollAuthenticaion(CreateUser),
            //     exact: true,
            //     permissionData: "user"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/karigar/add',
            //     component: RollAuthenticaion(Karigar),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/purity/add',
            //     component: RollAuthenticaion(CreatePurity),
            //     exact: true,
            //     permissionData: "jewel"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/banner/add',
            //     component: RollAuthenticaion(CreateBanner),
            //     exact: true,
            //     permissionData: "master"
            // },
            
            // {
            //     path: process.env.PUBLIC_URL + '/metal/add',
            //     component: RollAuthenticaion(CreateMetal),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/Certificate/add',
            //     component: RollAuthenticaion(CreateCertificate),
            //     exact: true,
            //     permissionData: "jewel"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/cut/add',
            //     component: RollAuthenticaion(CreateCutMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/color/add',
            //     component: RollAuthenticaion(CreateColorMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/clarity/add',
            //     component: RollAuthenticaion(CreateClarityMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/shape/add',
            //     component: RollAuthenticaion(CreateShapeMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/location/add',
            //     component: RollAuthenticaion(Location),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/gram/add',
            //     component: RollAuthenticaion(CreateGram),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/diamond/add',
            //     component: RollAuthenticaion(CreateDiamondMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/gemstone/add',
            //     component: RollAuthenticaion(CreateGemstoneMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/size/add',
            //     component: RollAuthenticaion(Size),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/collection/add',
            //     component: RollAuthenticaion(CreateCollection),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/status/add',
            //     component: RollAuthenticaion(CreateStatusMaster),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/dealer/add',
            //     component: RollAuthenticaion(CreateDealer),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/customer/add',
            //     component: RollAuthenticaion(CreateCustomer),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/currency/add',
            //     component: RollAuthenticaion(CreateCurrency),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/order/add',
            //     component: RollAuthenticaion(CreateOrder),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/catalogue',
            //     component: RollAuthenticaion(ManageCatalogueList),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/managecatalogue',
            //     component: RollAuthenticaion(ManageCatalogue),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/store',
            //     component: RollAuthenticaion(StoreList),
            //     exact: true,
            //     permissionData: "store"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/dealer',
            //     component: RollAuthenticaion(DealerList),
            //     exact: true,
            //     permissionData: "dealer"
            // },

            // {
            //     path: process.env.PUBLIC_URL + '/catalogue',
            //     component: RollAuthenticaion(ManageCatalogueList),
            //     exact: true,
            //     permissionData: "dealer"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/size',
            //     component: RollAuthenticaion(SizeList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/karigar',
            //     component: RollAuthenticaion(KarigarList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/category',
            //     component: RollAuthenticaion(CategoryList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/certificate',
            //     component: RollAuthenticaion(CertificateList),
            //     exact: true,
            //     permissionData: "master"
            // }, {
            //     path: process.env.PUBLIC_URL + '/price',
            //     component: RollAuthenticaion(PriceList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/status',
            //     component: RollAuthenticaion(StatusList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/collection',
            //     component: RollAuthenticaion(CollectionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/purity',
            //     component: RollAuthenticaion(PurityList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/metal',
            //     component: RollAuthenticaion(MetalList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/gram',
            //     component: RollAuthenticaion(GramList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/user',
            //     component: RollAuthenticaion(UserList),
            //     exact: true,
            //     permissionData: "user"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/gemstone',
            //     component: RollAuthenticaion(GemStoneList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/dimension',
            //     component: RollAuthenticaion(DimensionList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/banner',
            //     component: RollAuthenticaion(BannerList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/location',
            //     component: RollAuthenticaion(LocationList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/diamond',
            //     component: RollAuthenticaion(DiamondList),
            //     exact: true,
            //     permissionData: "master"
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/jeweldiamond',
            //     component: JewelDiamondList,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/currency',
            //     component: CurrencyList,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/order',
            //     component: OrderList,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/customer',
            //     component: CustomerList,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/orderDetails/:orderDetailsId?',
            //     component: OrderDetailsList,
            //     exact: true
            // },

            // {
            //     path: process.env.PUBLIC_URL + '/aboutus',
            //     component: AboutUs,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/contactus',
            //     component: ContactUs,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/template/contactus/update/:id?',
            //     component: CreateContactUs,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/template/aboutus/update/:id?',
            //     component: CreateAboutUs,
            //     exact: true
            // },
            
            // {
            //     path: process.env.PUBLIC_URL + '/settings',
            //     component: Settings,
            //     exact: true
            // }, {
            //     path: process.env.PUBLIC_URL + '/setting/license/add',
            //     component: Settings,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/setting/license/update/:id?',
            //     component: Settings,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/setting/plan/add',
            //     component: Settings,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/setting/plan/update/:id?',
            //     component: Settings,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/setting/planPrice/add',
            //     component: Settings,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/setting/planPrice/update/:id?',
            //     component: Settings,
            //     exact: true
            // },
            // {
            //     path: process.env.PUBLIC_URL + '/profile',
            //     component: Profile,
            //     exact: true
            // },
            // {
            //     component: permissionDenied,
            //     path: process.env.PUBLIC_URL + '/permissionDenied',
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



