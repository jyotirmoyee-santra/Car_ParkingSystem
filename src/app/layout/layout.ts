import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Userservice } from '../services/userservice';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  userserv= inject(Userservice);
  router =inject(Router);

  logOut(){
     localStorage.removeItem("UserData");
     this.router.navigateByUrl("/login");
  }




}
