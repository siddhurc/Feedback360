import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes} from'@angular/router';

import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule,
  MatCardModule, 
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDialogModule

} from '@angular//material';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CookieService} from 'ngx-cookie-service';

import {FeedbackListComponent} from './feedbacks/feedback-list/feedback-list.component';
import {FeedbackNewComponent} from './feedbacks/feedback-new/feedback-new.component';
import { FeedbackCreateComponent} from './feedbacks/feedback-create/feedback-create.component';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './feedbacks/login/login.component';
import { DashboardComponent } from './feedbacks/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordConfirmationComponent } from './forget-password-confirmation/forget-password-confirmation.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule } from '@angular/material';
const appRoutes:Routes =[
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'requestfeedback',
    component: FeedbackNewComponent
  },
  { 
    path:'receivedfeedack',
    component:FeedbackListComponent
  },
  {
    path:'givefeedback',
    component:FeedbackCreateComponent
  }
 ]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedbackCreateComponent,
    FeedbackNewComponent,
    FeedbackListComponent,
    routingComponents,
    ForgetPasswordComponent,
    ForgetPasswordConfirmationComponent,
    SidenavComponent
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatChipsModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatOptionModule,
    RouterModule.forRoot(appRoutes),
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule

  
  ],
  exports:[MatFormFieldModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
