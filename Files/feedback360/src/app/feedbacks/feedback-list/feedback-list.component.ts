import {Component, OnInit, OnDestroy} from '@angular/core';
import {Feedback} from '../feedback.model';
import {FeedbacksService} from '../feedbacks.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { searchFeedbacks} from '../constants/urlConstants';
import { cookieLoginNameConst } from '../constants/stringConstants';

@Component({
    selector:'app-feedback-list',
    templateUrl:'./feedback-list.component.html',
    styleUrls:['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit,OnDestroy{

    pendingFeedbackCount;
    feedbackOf=new FormControl;
    feedbackFrom=new FormControl;
    feedbackOfNames: string[]=['Phani','Satwik','Pavan','Sarath','Bharath','Jyothsna','Mayuri','Siddhartha','Pavani','Diiya','Bhavana'];
    feedbackFromNames:string[]=['Phani','Satwik','Pavan','Sarath','Bharath','Jyothsna','Mayuri','Siddhartha','Pavani','Diiya','Bhavana'];



    feedbacks: Feedback[]=[];
private feedbacksSub: Subscription;

feedbacksServicce: FeedbacksService;

constructor(private http:HttpClient,private notificationSnackBar: MatSnackBar,public feedbacksService:FeedbacksService,private cookieService:CookieService){}



ngOnInit(){
    this.pendingFeedbackCount=0;

    
}

ngOnDestroy(){
    //this.feedbacksSub.unsubscribe();
}

searchFeedbacks()
{
    this.http.post( searchFeedbacks,{requestedBy:this.cookieService.get(cookieLoginNameConst),feedbackOf:this.feedbackOf.value,feedbackFrom:this.feedbackFrom.value}).subscribe(responseData=>{
    
    console.log(responseData);
    //this.options=Object.assign([], responseData);
    this.feedbacks=Object.assign([],responseData);

    });


}
}