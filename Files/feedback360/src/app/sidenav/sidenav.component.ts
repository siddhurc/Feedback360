import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {getUserDetails} from '../feedbacks/constants/urlConstants';
import { cookieLoginIdConst, cookieLoginNameConst } from '../feedbacks/constants/stringConstants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent  implements OnInit {
  userName='';
  userDesignation=''
  showLoading=true;
  userId='';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private cookieService:CookieService,private http:HttpClient) {}
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
