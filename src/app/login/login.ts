import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register, User, userInterface } from '../model/usermodel';
import { Userservice } from '../services/userservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  
})
export class Login {

     login=true;
     showpassword:boolean=false;

     Signup(event: Event){
      event.preventDefault();
      this.login = false;
     }  
     showLogin(event: Event){
      event.preventDefault();
      this.login=true;
     }
     toggleEye(){
      this.showpassword = !this.showpassword;
     }

     loginuser:User=new User(); // object of User Class {email,Password} coming from UI

     registerData:Register=new Register();
      
      

     userservice=inject(Userservice); // Inject the Userservice in .ts file
     router=inject(Router);

     OnLogin_btw()
     {
        this.userservice.LoginUserService(this.loginuser).subscribe((res:userInterface)=>{
            alert("User Found...");
            //Without subscribe(), no HTTP request will actually be sent.

            localStorage.setItem("UserData",JSON.stringify(res));
            this.userservice.loggedUserData=res;    
            
            // api return those data collect bt loggeduserData.
            this.router.navigateByUrl("/dashboard");

        },error=>{
          alert("Non credential");
        })
      }
      SignUpNewUser_btn()
      {  
        this.registerData.clientId=this.registerData.userId;
         this.userservice.SignUpUserService(this.registerData).subscribe((res:any)=>{

          console.log("APi Response",res);
          alert('new UserCreated');
        
          // console.log(this.registerData.);
          
        //  },error=>{
        //   alert("Non credential");
        // }
        })
      }
}



