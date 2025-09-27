export class User{

    emailId:string;
    password:string;
    
    constructor(){
        this.emailId='';
        this.password='';
     }
}
export class Register {
  userId: number;
  emailId: string;
  password: string;
  fullName: string;
  mobileNo: string;
  clientId: number;

  constructor(){
    this.userId=0,
    this.emailId="",
    this.password="",
    this.fullName="",
    this.mobileNo="89757283",
    this.clientId=0
  }
}
export interface userInterface{  //response
    userId: number;
    emailId: string;
    password: string; 
    createdDate: string;
    projectName: string;
    fullName: string;
    mobileNo: string;
    extraId: number;
} // for login.ts

export interface Response_SiteInterface {
    message: string
    result: boolean
    data: any 
}
export interface SiteDataResponse {
    siteId: number
    clientId: number
    siteName: string
    siteCity: string
    siteAddress: string
    sitePinCode: string
    totalBuildings: number
    createdDate: string
  }
  export interface BuildingInterfaceResponse {
    buildingId: number
    siteId: number
    buildingName: string
    buildingManagerName: string
    contactNo: string
    siteName: string
  }
  export interface FloorInterfaceResponse {
    floorId: number
    buildingId: number
    floorNo: string
    isOperational: boolean
    totalParkingSpots: number
  }
  //add parking API
  export interface ConfirmParkingInterface {
    parkId: number;
    floorId: number;
    custName: string;
    custMobileNo: string;
    vehicleNo: string;
    parkDate: Date;
    parkSpotNo: number;
    inTime: Date;
    outTime: Date;
    amount: number;
    extraCharge: number;
    parkingNo: string;
  }
