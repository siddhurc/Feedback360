import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { forgotpassword } from '../feedbacks/constants/urlConstants';
import { codeValidation } from '../feedbacks/constants/urlConstants';
import { emailSentMsgConst, passwordUpdateMsgConst, passwordNotMatchMsgConst, dismissMessageConst } from '../feedbacks/constants/stringConstants';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private http:HttpClient,private notificationSnackBar: MatSnackBar,private router: Router){}
  email=new FormControl;
  code=new FormControl;
  password=new FormControl;
  confirmPassword=new FormControl;

  ngOnInit() {

  }
  

  forgetPasswordSendMail()
  {
    console.log(this.email.value);
    this.http.post<{message:string}>( forgotpassword ,{email:this.email.value}).subscribe(responseData=>{
  }); 
  this.loadSnackBar(emailSentMsgConst);
 }

  codeValidation()
  {
    var response;
    if(this.password.value === this.confirmPassword.value)
    {
      this.http.post<{message:string}>(codeValidation,{email:this.email.value,code:this.code.value,password:this.password.value}).subscribe(responseData=>{
        response=responseData;
      });
      this.loadSnackBar(passwordUpdateMsgConst);

    }
    else
    {
      this.loadSnackBar( passwordNotMatchMsgConst);
    }
  }


  loadSnackBar(message:string)
  {
    this.notificationSnackBar.open(message,dismissMessageConst,{
      duration: 6000,
    });

  }

}
