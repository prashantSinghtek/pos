export interface partiesFormInterface {
  isChecked: any;
  id: string;
  date: any;
  CreditLimit: number;
  showenable: any;
  partyName: string;
  gstNumber: string;
  phoneNum: string;
  gstType: string;
  state: string;
  email: string;
  billingAddress: string;
  shippingAddress: string;
  openingBalance: number;
  asOfDate: string;
  additionalFieldOne: string;
  additionalFieldTwo: string;
  additionalFieldThree: string;
  additionalfieldFour: string;
  valueOne: boolean;
  valueTwo: boolean;
  valueThree: boolean;
  valueFour: boolean;
}
export interface transactionInterface {
  id: number;
  billNumber: string;
  dateOfTransaction:string;
  totalAmount: number;
  balanceDue: number;
  operationType: string;
  operationId: number;
  deleted: false;
}
export interface CombinedInitialState {
  partiesForm: partiesFormInterface;
  partiesList: partiesFormInterface[];
  isShowSaveButton: boolean;
  transactionList: transactionInterface[];
  partyDashboardData: partiesFormInterface;
  firmId: string;
  search: string;
}

export const initialState: CombinedInitialState = {
  partiesForm: {
    id: "",
    partyName: "",
    gstNumber: "",
    phoneNum: "",
    gstType: "",
    state: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    openingBalance: 0,
    asOfDate: "",
    additionalFieldOne: "",
    additionalFieldTwo: "",
    additionalFieldThree: "",
    additionalfieldFour: "",
    valueOne: false,
    valueTwo: false,
    valueThree: false,
    valueFour: false,
    showenable: false,
    isChecked: false,
    date: undefined,
    CreditLimit: 0,
  },
  partiesList: [],
  isShowSaveButton: false,
  transactionList: [],
  partyDashboardData: {
    id: "",
    partyName: "",
    gstNumber: "",
    phoneNum: "",
    gstType: "",
    state: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    openingBalance: 0,
    asOfDate: "",
    additionalFieldOne: "",
    additionalFieldTwo: "",
    additionalFieldThree: "",
    additionalfieldFour: "",
    valueOne: false,
    valueTwo: false,
    valueThree: false,
    valueFour: false,
    showenable: false,
    isChecked: false,
    date: undefined,
    CreditLimit: 0,
  },
  firmId: "",
  search: "",
};
