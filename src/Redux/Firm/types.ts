export interface FirmFormInterface {
    BusinessName: string;
    PhoneNumber: string;
    GSTIN: string;
    Email: string;
    BusinessType: string;
    BusinessCategory: string;
    PinCode: string;
    State: string;
    BillingAddress: string;
    Signature: string;
    Desc: string;
    Logo: string;
  }
  
  export interface FirmListInterface {
    id: string;
    BusinessName: string;
    GSTIN: string;
    BusinessCategory: string;
  }
  
  export interface UserDetailFormInterface {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Role: string;
  }
  
  export interface CombinedInitialState {
    firmForm: FirmFormInterface;
    firmList: FirmListInterface[];
    userDetailForm: UserDetailFormInterface;
  }
  export const initialState: CombinedInitialState = {
    firmForm: {
      BusinessName: '',
      PhoneNumber: '',
      GSTIN: '',
      Email: '',
      BusinessType: '',
      BusinessCategory: '',
      PinCode: '',
      State: '',
      BillingAddress: '',
      Signature: '',
      Desc: '',
      Logo: '',
    },
    firmList: [], 
    userDetailForm: {
      FirstName: '',
      LastName: '',
      Email: '',
      PhoneNumber: '',
      Role: '',
    },
  };
  