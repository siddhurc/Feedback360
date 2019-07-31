import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Route, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { codeValidation } from '../feedbacks/constants/urlConstants';
import { passwordNotMatchMsgConst } from '../feedbacks/constants/stringConstants';

@Component({
  selector: 'app-forget-password-confirmation',
  templateUrl: './forget-password-confirmation.component.html',
  styleUrls: ['./forget-password-confirmation.component.css']
})
export class ForgetPasswordConfirmationComponent implements OnInit {

  constructor(private http:HttpClient,private notificationSnackBar: MatSnackBar,private router: Router){}

  code=new FormControl;
  password=new FormControl;
  confirmPassword=new FormControl;
  ngOnInit() {
  }


  codeValidation()
  {
    if(this.password == this.confirmPassword)
    {
      this.http.post<{message:string}>(codeValidation,{code:this.code,password:this.password}).subscribe(responseData=>{
        console.log(responseData);
      });
      this.router.navigateByUrl('/login');


    }
    else
    {
      this.loadSnackBar(passwordNotMatchMsgConst);

    }
   
 
 
  }


  loadSnackBar(message:string)
  {
    this.notificationSnackBar.open(message,"Dismiss",{
      duration: 6000,
    });

  }


}
