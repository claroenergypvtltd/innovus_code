export const path = {
    login: {
        name: 'login',
        login: process.env.PUBLIC_URL + '/',
        // login: process.env.PUBLIC_URL + '/login'
    },
    inprogress: {
        payment: '/payment/inprogress',
        // reports: '/reports/inprogress',
        order: '/order/inprogress/page',
        // list: process.env.PUBLIC_URL + '/inprogress'
    },
    dashboard: {
        name: 'dashboard',
        list: process.env.PUBLIC_URL + '/dashboard'
    },
    category: {
        add: process.env.PUBLIC_URL + '/category/add',
        list: process.env.PUBLIC_URL + '/category',
        edit: process.env.PUBLIC_URL + '/category/edit/',
        view: process.env.PUBLIC_URL + '/category/view/'
    },
    crop: {
        add: process.env.PUBLIC_URL + '/category/crop/add',
        list: process.env.PUBLIC_URL + '/crop',
        edit: process.env.PUBLIC_URL + '/category/crop/edit/',
    },
    cart: {
        add: process.env.PUBLIC_URL + '/cart/add',
        list: process.env.PUBLIC_URL + '/cart',
        edit: process.env.PUBLIC_URL + '/cart/edit/',
    },
    products: {
        add: process.env.PUBLIC_URL + '/products/add',
        list: process.env.PUBLIC_URL + '/products',
        edit: process.env.PUBLIC_URL + '/products/update/',
    },

    price: {
        add: process.env.PUBLIC_URL + '/price/add',
        list: process.env.PUBLIC_URL + '/price',
        edit: process.env.PUBLIC_URL + '/price/edit/',
    },

    dc: {
        add: process.env.PUBLIC_URL + '/dc/add',
        list: process.env.PUBLIC_URL + '/dc',
        edit: process.env.PUBLIC_URL + '/dc/edit/'
    },

    region: {
        add: process.env.PUBLIC_URL + '/dc/region/add',
        list: process.env.PUBLIC_URL + '/dc/region',
        edit: process.env.PUBLIC_URL + '/dc/region/edit/',
    },
    region: {
        add: process.env.PUBLIC_URL + '/dc/region/add',
        list: process.env.PUBLIC_URL + '/dc/region',
        edit: process.env.PUBLIC_URL + '/dc/region/edit/',
    },
    reports: {
        list: process.env.PUBLIC_URL + '/reports',
        customerOnboard: process.env.PUBLIC_URL + '/reports/customerOnboard',
        placingOrder: process.env.PUBLIC_URL + '/reports/placingOrder',
        executivePerformance: process.env.PUBLIC_URL + '/reports/executivePerformance',
        orderValue: process.env.PUBLIC_URL + '/reports/orderValue',
        priceElasticitiy: process.env.PUBLIC_URL + '/reports/reportPrice',
        tonnesOrder: process.env.PUBLIC_URL + '/reports/tonnesOrder',
    },
    coupons: {
        add: process.env.PUBLIC_URL + '/coupon/add',
        list: process.env.PUBLIC_URL + '/coupon',
        edit: process.env.PUBLIC_URL + '/coupon/update/',
    },
    payments: {
        list: process.env.PUBLIC_URL + '/payments',
    },
    faq: {
        add: process.env.PUBLIC_URL + '/FAQ/add',
        list: process.env.PUBLIC_URL + '/FAQ',
        edit: process.env.PUBLIC_URL + '/FAQ/update/',
    },
    staticTemplate: {
        list: process.env.PUBLIC_URL + '/staticTemplate',
    },
    currency: {
        list: process.env.PUBLIC_URL + '/currency',
        add: process.env.PUBLIC_URL + '/currency/add',
        edit: process.env.PUBLIC_URL + '/currency/update/',
    },
    user: {
        list: process.env.PUBLIC_URL + '/user',
        add: process.env.PUBLIC_URL + '/user/add',
        edit: process.env.PUBLIC_URL + '/user/update/',
        view: process.env.PUBLIC_URL + '/user/view/',

    },
    farm: {
        add: process.env.PUBLIC_URL + '/farm/add',
        edit: process.env.PUBLIC_URL + '/farm/edit/',
    },
    farmer: {
        list: process.env.PUBLIC_URL + '/user',
        add: process.env.PUBLIC_URL + '/user/farmers/add',
        edit: process.env.PUBLIC_URL + '/user/farmers/edit/',
        view: process.env.PUBLIC_URL + '/user/farmers/view/',

    },
    retailer: {
        list: process.env.PUBLIC_URL + '/retailer',
        add: process.env.PUBLIC_URL + '/user/retailer/add',
        edit: process.env.PUBLIC_URL + '/user/retailer/edit/',
        view: process.env.PUBLIC_URL + '/user/retailer/view/',

    },
    aboutUs: {
        list: process.env.PUBLIC_URL + '/aboutus',
        template: process.env.PUBLIC_URL + '/template/aboutus/update/'
    },
    contactUs: {
        list: process.env.PUBLIC_URL + '/contactus',
        template: process.env.PUBLIC_URL + '/template/contactus/update/'
    },
    order: {
        list: process.env.PUBLIC_URL + '/order/',
        add: process.env.PUBLIC_URL + '/order/add',
        edit: process.env.PUBLIC_URL + '/order/update/',
    },
    v2order: {
        list: process.env.PUBLIC_URL + '/order',
    },
    orderDetails: {
        list: process.env.PUBLIC_URL + '/orderDetails',
    },
    location: {
        add: process.env.PUBLIC_URL + '/location/add',
        list: process.env.PUBLIC_URL + '/location',
        edit: process.env.PUBLIC_URL + '/location/update/',
    },
    setting: {
        list: process.env.PUBLIC_URL + '/irrigationSetting',
        add: process.env.PUBLIC_URL + '/irrigationSetting/add',
        edit: process.env.PUBLIC_URL + '/irrigationSetting/edit/'
    },
    vehicle: {
        list: process.env.PUBLIC_URL + '/vehicle',
        add: process.env.PUBLIC_URL + '/vehicle/add',
        edit: process.env.PUBLIC_URL + '/vehicle/edit/'
    },
    profile: {
        list: process.env.PUBLIC_URL + '/profile/'
    },
    license: {
        add: process.env.PUBLIC_URL + '/setting/license/add',
        edit: process.env.PUBLIC_URL + '/setting/license/update/'
    },
    plan: {
        add: process.env.PUBLIC_URL + '/setting/plan/add',
        edit: process.env.PUBLIC_URL + '/setting/plan/update/'
    },
    appSetting: {
        appVersion: process.env.PUBLIC_URL + '/setting/appVersion',
        list: process.env.PUBLIC_URL + '/setting',
        createQuantity: process.env.PUBLIC_URL + '/setting/createquantitytype',
        fetchQuantity: process.env.PUBLIC_URL + '/setting/fetchquantitytype',
        appPolicy: process.env.PUBLIC_URL + '/aboutpolicy'
    },
    pool: {
        list: process.env.PUBLIC_URL + '/price/pool',
        add: process.env.PUBLIC_URL + '/price/pool/add',
        edit: process.env.PUBLIC_URL + '/price/pool/edit/',
    },
    policy: {
        form: process.env.PUBLIC_URL + '/setting/policy',
        policyList: process.env.PUBLIC_URL + '/setting/policyList'
    },
}

