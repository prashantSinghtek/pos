export interface partiesFormInterface {
  isChecked: any;
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
  openingBalance: number
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

export interface CombinedInitialState {
  partiesForm: partiesFormInterface;
  partiesList: partiesFormInterface[];
  isShowSaveButton : boolean;
}
export const initialState: CombinedInitialState = {
  partiesForm: {
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
    CreditLimit: 0
  },
  partiesList: [],
  isShowSaveButton: false,
};
