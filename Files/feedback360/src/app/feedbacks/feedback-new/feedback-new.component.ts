import {Component, OnInit} from '@angular/core';
import {NgForm,FormControl,ReactiveFormsModule} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { feedbackNew} from '../constants/urlConstants';
import {sendmail} from '../constants/urlConstants';
import { getNamesForSuggestions } from '../constants/urlConstants';
import { cookieLoginNameConst, reqSentConst, dismissMessageConst } from '../constants/stringConstants';


export interface People {
  name: string;
}

var s;//Thie variable is used to get the data from the auto complete array to the material chips we have used.

@Component({
    selector:'app-feedback-new',
    templateUrl:'./feedback-new.component.html',
    styleUrls:['./feedback-new.component.css']
})

export class FeedbackNewComponent{

  showLoading=false;

    visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  ngOnInit() {

    this.showLoading=true;
    this.getNamesForSuggestions();
    this.showLoading=false;
  }

  constructor(private http:HttpClient,private notificationSnackBar: MatSnackBar,private cookieService:CookieService){}

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  peoples: People[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.peoples.push({name:s.trim()})

      //this.peoples.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    console.log(this.peoples);
  }



  remove(people: People): void {
    const index = this.peoples.indexOf(people);

    if (index >= 0) {
      this.peoples.splice(index, 1);
    }
  }



  myControl = new FormControl();
  feedbackOf = new FormControl();
  options: string[]=[''];// ['Phani','Satwik','Pavan','Sarath','Bharath','Jyothsna','Mayuri','Siddhartha','Pavani','Diiya','Bhavana'];

  filteredOptions: Observable<string[]>;

 

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //console.log(filterValue);
    s=filterValue;
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  onFeedbackRequest(form:NgForm)
  {
    this.http.post<{message:string}>(feedbackNew,{feedbackRequestedBy:this.cookieService.get(cookieLoginNameConst),feedbackOf:this.feedbackOf.value,feedbackFrom:this.peoples}).subscribe(responseData=>{


  });
  //console.log(this.myControl1.value);
  this.clickSendMail();//to send mail to the persons who have to give mail
  //snack bar for notifying that request has been sent.
  this.loadSnackBar(reqSentConst);
  form.resetForm(); //Reset is not working for forms.. Have to work on that one..


}

clickSendMail()
{
  this.http.post<{message:string}>(sendmail,(this.peoples)).subscribe(responseData=>{
    console.log("email has been sent");
  });
}


loadSnackBar(message:string)
{
  this.notificationSnackBar.open(message,dismissMessageConst,{
    duration: 6000,
  });

}

getNamesForSuggestions() // Getting Name suggestions from the database
{

  this.http.post<{names:string[]}>(getNamesForSuggestions,"").subscribe(responseData=>{
    //console.log(responseData);
    this.options=Object.assign([], responseData);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  });

}

}

//console.log(prople);



