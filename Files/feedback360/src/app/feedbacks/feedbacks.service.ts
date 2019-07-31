import {Feedback} from './feedback.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { feedbacks } from './constants/urlConstants';

@Injectable({providedIn:'root'})
export class FeedbacksService {
    private feedbacks:Feedback[]=[];//Creating deedback variable
    private feedbacksUpdated=new Subject<Feedback []>();

    constructor(private http:HttpClient){}

    getFeedbacks(requestedBy:string,feedbackOf:string,feedbackFrom:string)
    {
        this.http.post<{message:string,feedbacks:Feedback[]}>(feedbacks,{requestedBy,feedbackOf,feedbackFrom}).subscribe((feedbackData)=>{
            console.log(feedbackData);
            this.feedbacks=feedbackData.feedbacks;
            this.feedbacksUpdated.next([...this.feedbacks]);
        });
    }

    getFeedbackUpdateListener(){
        return this.feedbacksUpdated.asObservable();
    }

    addFeedbacks(feedbackId:string,requestedBy:string,feedbackOf:string,feedbackFrom:string,question1:string,question2:string,question3:string)
    {
        const feedback:Feedback={feedbackId:feedbackId,requestedBy:requestedBy,feedbackOf:feedbackOf,feedbackFrom:feedbackFrom,question1:question1,question2:question2,question3:question3};
        this.http.post<{message:string}>(feedbacks,feedback).subscribe(responseData=>{
            console.log(responseData.message);
            this.feedbacks.push(feedback);
            this.feedbacksUpdated.next([...this.feedbacks]);

        })

    }

}