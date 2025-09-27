import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register, User, userInterface } from '../model/usermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Userservice {
  
  loggedUserData! :userInterface; //contain all response data
  
  constructor(private http :HttpClient){}; // This is a service that's pass through Constructor
  
  //API CALL
  LoginUserService(obj:User): Observable<userInterface>
  {
    return this.http.post<userInterface>("https://api.freeprojectapi.com/api/SmartParking/login",obj);
  }
  
  SignUpUserService(obj:Register):Observable<userInterface>
  {
    return this.http.post<userInterface>("https://api.freeprojectapi.com/api/SmartParking/register",obj);

  }
}
