import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {loginURL} from '../constants/urlConstants';
import { loginMsgConst, cookieLoginIdConst, incorrectMsgConst, userNotExistMsg, dismissMessageConst } from '../constants/stringConstants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private notificationSnackBar: MatSnackBar,private router: Router, private cookieService: CookieService){}

  


  ngOnInit() {
  }
  userId=new FormControl();
  password=new FormControl();

  onLogin()
  {
    this.http.post<{message:string}>(loginURL,{user:this.userId.value,pwd:this.password.value}).subscribe(responseData=>{
    if(responseData.message == 'status1')
    {
      this.loadSnackBar(loginMsgConst);
      this.cookieService.set(cookieLoginIdConst,this.userId.value);
      this.router.navigateByUrl('/dashboard');

    }
    else if(responseData.message == 'status2')
    {
      this.loadSnackBar(incorrectMsgConst);
    }
    else
    {
      this.loadSnackBar(userNotExistMsg);
    }

  });
  }


  loadSnackBar(message:string)
  {
    this.notificationSnackBar.open(message,dismissMessageConst,{
      duration: 6000,
    });

  }

}
