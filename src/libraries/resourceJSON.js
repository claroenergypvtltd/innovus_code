import { imageBaseUrl } from '../config'

export const resorceJSON = {
  TablePageData: {
    itemPerPage: 30,
    currentPage: 1,
    pageCount: 1,
    paginationLength: 10,
  },

  JewelData: {
    multiImageLimit: 5,
  },
  UserRole: {
    godAdmin: 1,
    superAdmin: 2,
    owner: 3,
    manager: 4,
    salesman: 5,
    customer: 6,
    dealer: 7,
    subStore: 8,
  },

  StoreTableHead: {
    storeName: 'Store Name',
    email: 'Email',
    mobileNumber: 'Mobile',
    location: 'Location',
  },
  UserTableHead: {
    userName: 'User Name',
    email: 'Email',
    mobileNumber: 'Mobile',
  },
  DealerTableHead: {
    userName: 'Dealer name',
    dealerName: 'Company name',
    email: 'Email',
    mobileNumber: 'Mobile',
  },
  SizeTableHead: {
    categoryName: 'Category Name',
    size: 'Size',
    sizeType: 'Size Format',
  },
  KarigarTableHead: {
    karigarName: 'Karigar name',
    karigarCode: 'Karigar code',
    mobileNumber: 'Mobile number',
  },
  PriceTableHead: {
    priceType: 'Price Type',
    scopeType: 'Scope Type',
  },
  CollectionTableHead: {
    collectionName: 'Collection Name',
    'Collection Image': 'Collection Image',
  },
  PurityTableHead: {
    purityType: 'Purity',
    purityCode: 'Purity Code',
  },
  CurrencyTableHead: {
    currencyName: 'Country Name',
    currencySymbol: 'Currency Symbol',
    currencyRate: 'Currency Rate',
  },
  MetalTableHead: {
    metalName: 'Metal Name',
    metalType: 'Metal Type',
  },
  BannerTableHead: {
    bannerName: 'Banner Name',
    bannerImage: 'Banner Image',
    bannerType: 'Banner Type',
  },
  LocationTableHead: {
    locationName: 'Location Name',
  },
  StatusTableHead: {
    status: 'Status Name',
  },
  JewelTableHead: {
    jewelImage: 'Jewel Image',
    storeName: 'Store Name',
    productCode: 'Product Code',
    categoryName: 'Category Name',
    goldWeight: 'Gold Weight',
    diamondWeight: 'Diamond Weight',
    stoneWeight: 'Gemstone Weight',
    amountWithRRP: 'Price(with RRP)',
  },
  CatalogueTableHead: [
    'Select jewel',
    'Jewel Image',
    'Product Code',
    'Category Name',
    'Gold Weight',
    'Diamond Weight',
    'Gemstone Weight',
    'Price(with RRP)',
  ],
  ManageCatalogHead: {
    catalogueName: 'Catalogue Name',
    assignBy: 'Assign By',
    validatedType: 'Validated By',
    numberOfDealers: 'Number of Dealers',
    createdDate: 'Created Date',
  },
  DealerCatalogueHead: [
    'Dealer Name',
    'Validated by',
    'Start Date',
    'End Date',
    'Maximum allowed views',
  ],
  LimitJSON: [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
  ],
  UserManagementList: [
    { name: 'User Id', selector: 'userName', sortable: true },
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'PhoneNumber', selector: 'mobileNumber', sortable: true },
    { name: 'EmailAddress', selector: 'emailId', sortable: true },
  ],
  RetailerList: [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'PhoneNumber', selector: 'mobileNumber', sortable: true },
    { name: 'EmailAddress', selector: 'emailId', sortable: true },
    { name: 'Status', selector: 'selectBox', sortable: true },
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
};
