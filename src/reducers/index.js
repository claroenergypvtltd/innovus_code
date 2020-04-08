import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import RetailerReducer from './RetailerReducer';
import UserManagementReducer from './userManagementReducer'
import FarmerReducer from './FarmerReducer'
import cropReducer from './cropReducer'
import priceReducer from './priceReducer'
import { reducer as toastrReducer } from 'react-redux-toastr';
import OrderReducer from './OrderReducer';
import FaqReducer from './FaqReducer'
import IrrigationSettingReducer from './IrrigationSettingReducer';
import couponReducer from './couponReducer'
import salesAgentReducer from './salesAgentReducer'
import VehicleReducer from './VehicleReducer'
import dcReducer from './dcReducer'
import PoolReducer from './PoolReducer'
import regionReducer from './regionReducer'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toastr: toastrReducer,
    category: categoryReducer,
    farmer: FarmerReducer,
    user: UserManagementReducer,
    crop: cropReducer,
    price: priceReducer,
    order: OrderReducer,
    retailer: RetailerReducer,
    faq: FaqReducer,
    irrigationSetting: IrrigationSettingReducer,
    coupon: couponReducer,
    salesAgent: salesAgentReducer,
    Vehicle: VehicleReducer,
    dc: dcReducer,
    pool: PoolReducer,
    region: regionReducer
});

