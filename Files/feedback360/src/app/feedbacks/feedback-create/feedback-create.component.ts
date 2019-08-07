import {Component} from '@angular/core';
import {NgForm, FormControl} from '@angular/forms';
import { FeedbacksService} from '../feedbacks.service';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {getFeedbackForList} from '../constants/urlConstants';
import { savedSnackbarConst, cookieLoginNameConst, dismissMessageConst } from '../constants/stringConstants';
import { Router } from '@angular/router';

@Component({
    selector:'app-feedback-create',
    templateUrl:'./feedback-create.component.html',
    styleUrls:['./feedback-create.component.css']
})

export class FeedbackCreateComponent {
    id='';
    requestedBy='';
    feedbackOf='';
    feedbackFrom='';
    question1='';
    question2='';
    question3='';
    myControl = new FormControl();
    list:{feedbackId:string,feedbackOf:string,requestedBy:string}[]=[];
    selectedOption: string = "0";
    showLoading=true;

constructor(private router: Router,public feedbacksservice:FeedbacksService,private http:HttpClient,private notificationSnackBar: MatSnackBar,private cookieService:CookieService){}

    ngOnInit() {
        this.showLoading=true;
       this.getFeedbackForList();
      }

    onAddFeedback(form:NgForm)
    {
        this.showLoading=true;
        if(form.invalid)
        {
            return;
        }
        //this.feedbacksservice.addFeedbacks(form.value.question1,form.value.question2,form.value.question3,"sas","as","qw","12");
        this.feedbacksservice.addFeedbacks(this.selectedOption,"",this.myControl.value,this.cookieService.get(cookieLoginNameConst),form.value.question1,form.value.question2,form.value.question3);
        this.showLoading=false;
        this.loadSnackBar(savedSnackbarConst);
        location.reload(); /// to reload the page
    }


getFeedbackForList() // Getting Name suggestions from the database
{
    this.http.post<{name:string}>(getFeedbackForList,{feedbackFrom:this.cookieService.get(cookieLoginNameConst)}).subscribe(responseData=>{
    //console.log(responseData[0].feedbackFrom);
    console.log(responseData);
    this.list=Object.assign([], responseData);
    this.showLoading=false; 
  });
}

loadSnackBar(message:string)
  {
    this.notificationSnackBar.open(message,dismissMessageConst,{
      duration: 6000,
    });
  }
}
