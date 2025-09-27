import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Dashboardservice } from '../services/dashboardservice';
import {
  BuildingInterfaceResponse,
  ConfirmParkingInterface,
  FloorInterfaceResponse,
  Response_SiteInterface,
  SiteDataResponse,
} from '../model/usermodel';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  dashboardserv = inject(Dashboardservice);

  SiteList_Data: SiteDataResponse[] = []; //Response
  BuildlingList_Data: BuildingInterfaceResponse[] = []; //Response
  FloorData_List: FloorInterfaceResponse[] = []; //Response

  parkingSpotArray: number[]=[]; // for the spotNumbers card 

  siteid: number = 0;
  buildingId: number = 0;
  Custom_FloorId: number = 0;
  Custom_parkingNumber:number=0;
  Custom_vechileNumber:string='';
  allocateSpot:number=0;

  // confirm or add data in a card initially [Empty].......
   ConfirmParking: ConfirmParkingInterface={
    "parkId": 0,
    "floorId": 0,
    "custName": "",
    "custMobileNo": "", // all html bind with this 
    "vehicleNo": "",
    "parkDate": new Date(),
    "parkSpotNo": 0,
    "inTime": new Date(),
    "outTime": new Date(),
    "amount": 0,
    "extraCharge": 0,
    "parkingNo": ""
   }

  ngOnInit(): void {
    // automatically Called
    this.getSite();
  }

  getSite() {
    this.dashboardserv
      .getSiteByClientid()
      .subscribe((res: Response_SiteInterface) => {
        this.SiteList_Data = res.data; //all data that have
      });
  }

  getBuildings() {
    // Call under Site
    this.dashboardserv.getBuildingBySiteid(this.siteid).subscribe((res: Response_SiteInterface) => {
        console.log('Site id :' + this.siteid);

        this.BuildlingList_Data = res.data;
      });
  }

  getFloors() {
    this.dashboardserv
      .GetFloorsByBuildingId(this.buildingId).subscribe((res: Response_SiteInterface) => {
        console.log('building id :' + this.buildingId);
        this.FloorData_List = res.data;
      });
  }
  // Above API Responses

  OnfloorSelect(){
    const floor=this.FloorData_List.find((f:any) => f.floorId == this.Custom_FloorId);
    
    console.log("floorId",floor?.floorId);
    
    if(floor)
      {
      this.parkingSpotArray=[];
      for(let i=1; i<= floor.totalParkingSpots;i++){
        this.parkingSpotArray.push(i); 
        }
     }
      else{
        console.warn("No floor found for FloorId:", this.Custom_FloorId);
      }
    }

  
 
  isbooking:boolean=false; //initially // Blur background

  @ViewChild('BookingSpotFrom')BookingForm!:ElementRef; // overall form div Id

  @ViewChild('ReleaseSpot')ReleaseSpots!:ElementRef; // Overall #ReleaseSpot Div id data I can get

  OpenForm(spotNum:number){
    
      if(this.BookingForm)
        {
          this.isbooking=true; //  background blur  wwhen form Open
          this.ConfirmParking.parkSpotNo=spotNum; //form  
          this.BookingForm.nativeElement.style.display='block'; // visible the block
          document.body.style.overflow = 'hidden'; // disable background scrolling
      }
  }
  ClosForm(){
      this.isbooking=false;
      this.BookingForm.nativeElement.style.display='none';
      document.body.style.overflow = ''; // enable background scrolling
      
  }
 
  // object with Index Signature
    occupiedSpots: { 
      [spotNo: number]: ConfirmParkingInterface|undefined  /* Interface 
        parking {  [spotNo: number]: ConfirmParkingInterface } */ // key: Value Paie
    } = {};

  ConfirmAddParking()
  {
    this.dashboardserv.AddparkingSlot(this.ConfirmParking).subscribe({

      next: (res: Response_SiteInterface)=> {
        // list array for storing occupied data

        this.occupiedSpots[this.ConfirmParking.parkSpotNo]={

          parkId: this.ConfirmParking.parkSpotNo ,
          floorId: this.Custom_FloorId,
          custName: this.ConfirmParking.custName,
          custMobileNo: this.ConfirmParking.custMobileNo,
          vehicleNo: this.ConfirmParking.vehicleNo,
          parkDate: new Date(),
          parkSpotNo: this.ConfirmParking.parkSpotNo,
          inTime: new Date(),
          outTime: new Date(),
          amount: this.ConfirmParking.amount,
          extraCharge: 0,
          parkingNo: "" 

        }
        this.allocateSpot=this.ConfirmParking.parkSpotNo;
        console.log(this.occupiedSpots);

        // Reset ConfirmParking for next spot booking
      this.ConfirmParking = {
        parkId: 0,
        floorId: 0,
        custName: "",
        custMobileNo: "",
        vehicleNo: "",
        parkDate: new Date(),
        parkSpotNo: 0,
        inTime: new Date(),
        outTime: new Date(),
        amount: 0,
        extraCharge: 0,
        parkingNo: ""
      };
        alert("Spot booked successfully!");
       this.ClosForm();
      },
      error: (err) => {
        console.error("API Error:", err);
        alert("Booking failed. Check console.");
      }
   });
  }

  ReleaseForm(spot:number){

    if(this.ReleaseSpots)
    {
      this.isbooking=true;
      this.allocateSpot=spot;
      this.ReleaseSpots.nativeElement.style.display='block'; // visible the block
      document.body.style.overflow = 'hidden'; // disable background scrolling
    }
  }  // end of releseForm
  Releaseyes_btn()
  {
    this.occupiedSpots[this.allocateSpot] = undefined;
    this.ClosReleaseForm();

  }

  ClosReleaseForm(){
    this.isbooking=false;
    this.ReleaseSpots.nativeElement.style.display='none';
    document.body.style.overflow=''; // now user can scroll it.
  }
} // end
