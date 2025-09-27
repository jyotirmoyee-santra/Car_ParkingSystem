import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
   ConfirmParkingInterface,
  BuildingInterfaceResponse,
  Response_SiteInterface,
  SiteDataResponse,
} from '../model/usermodel';
import { Userservice } from './userservice';

@Injectable({
  providedIn: 'root',
})

//class
export class Dashboardservice {

  constructor(private http: HttpClient) {} // Httpclent Service is available

  useservice = inject(Userservice);

  apiUrl: string = 'https://api.freeprojectapi.com/api/SmartParking/';

  getSiteByClientid(): Observable<Response_SiteInterface> {
    const clientid = this.useservice.loggedUserData.extraId;
    return this.http.get<Response_SiteInterface>(
      this.apiUrl + 'GetSitesByClientId?id=' + clientid);
  }
  // Api Call - by Site get Building Data

  getBuildingBySiteid(siteid: Number): Observable<Response_SiteInterface> {
    return this.http.get<Response_SiteInterface>(
      this.apiUrl + 'GetBuildingBySiteId?id=' + siteid);
  }

  GetFloorsByBuildingId(buildingId: Number): Observable<Response_SiteInterface> {
    return this.http.get<Response_SiteInterface>(
      this.apiUrl + 'GetFloorsByBuildingId?id=' + buildingId);
  }
  // data Update from Form 
  // API call
  AddparkingSlot(obj:ConfirmParkingInterface):Observable<Response_SiteInterface>{

   console.log("Calling API:", this.apiUrl + 'AddParking', obj);
   
   return this.http.post<Response_SiteInterface>(this.apiUrl +'AddParking',obj);

  }
  
}
