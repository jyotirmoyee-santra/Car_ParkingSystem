import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Layout } from './layout/layout';
import { Component } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' }, //Root route redirects to login
  { path: 'login', component: Login },

  { path : '',component:Layout
    ,children:[
       { path:'dashboard', component:Dashboard}
   ]}
];
