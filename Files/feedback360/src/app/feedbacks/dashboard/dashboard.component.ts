import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {getUserDetails} from '../constants/urlConstants';
import { cookieLoginIdConst, cookieLoginNameConst } from '../constants/stringConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName='';
  userDesignation=''
  showLoading=true;
  userId='';

  constructor(private cookieService:CookieService,private http:HttpClient) { }

  ngOnInit() {
    this.showLoading=true;
    this.userId=this.cookieService.get(cookieLoginIdConst);
   
    this.displayCredentials();
    
  }

  displayCredentials()
  {
    this.http.post<{userName:string,userDesignation:string}>(getUserDetails,{userId:this.userId}).subscribe(responseData=>{
    this.userName=responseData.userName;
    this.userDesignation=responseData.userDesignation;
    this.cookieService.set(cookieLoginNameConst,this.userName);
    this.showLoading=false;

  });


  }

}
