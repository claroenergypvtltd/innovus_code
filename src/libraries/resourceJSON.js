import { imageBaseUrl } from '../config'

export const resorceJSON = {
  TablePageData: {
    itemPerPage: 10,
    currentPage: 1,
    pageCount: 1,
    paginationLength: 10,
  },
  StatusTableHead: {
    status: 'Status Name',
  },
  LimitJSON: [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
  ],
  UserManagementList: [
    { name: 'User Id', selector: 'userName', sortable: true },
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Phone Number', selector: 'mobileNumber', sortable: true },
    { name: 'Email ', selector: 'emailId', sortable: true },
  ],
  RetailerList: [
    { name: 'Customer Id', selector: 'cusId', sortable: true },
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Email', selector: 'emailId', sortable: true },
    { name: 'Phone Number', selector: 'mobileNumber', sortable: true },
    { name: 'Shop Name', selector: 'shopNames', sortable: true, Required: true },
    { name: 'Shop Address', selector: 'shopAddrss', sortable: true, Required: true },
    { name: 'Shop Country', selector: 'shopAddressDataCountry', sortable: true },
    { name: 'Shop State', selector: 'shopAddressDataState', sortable: true },
    { name: 'Shop City', selector: 'shopAddressDataCity', sortable: true },
    { name: 'Agent Id', selector: 'agentId', sortable: true },
    { name: 'Status', selector: 'selectBox', sortable: true },
    { name: 'created', selector: 'created', sortable: true },
    // { text: 'Actions', dataField: 'actions', sortable: true },
  ],
  CropList: [
    { name: 'Crop Name', selector: 'cropName', sortable: true },
    { name: 'Crop Variety', selector: 'cropVariety', sortable: true },
    { name: 'Sow Date', selector: 'sowDate', sortable: true },
    { name: 'Harvest Date', selector: 'harvestDate', sortable: true },
    { name: 'Expected Qty', selector: 'expectedQty', sortable: true },
    { name: 'Price(ton)', selector: 'price', sortable: true },
  ],
  CategoryList: [
    { name: 'Category Name', selector: 'name', sortable: true },
    { name: 'Image', selector: 'image', sortable: true },
    // imageBaseUrl

    { name: 'Description', selector: 'description', sortable: true },
    { name: 'Crop', selector: 'cropButton', sortable: true },
  ],
  statusOptions: ['Pending', 'Accepted', 'Rejected'],
};
