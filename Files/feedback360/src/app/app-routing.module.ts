import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackNewComponent } from './feedbacks/feedback-new/feedback-new.component';
import { FeedbackListComponent } from './feedbacks/feedback-list/feedback-list.component';
import { DashboardComponent } from './feedbacks/dashboard/dashboard.component';
import { FeedbackCreateComponent } from './feedbacks/feedback-create/feedback-create.component';
import { LoginComponent } from './feedbacks/login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordConfirmationComponent } from './forget-password-confirmation/forget-password-confirmation.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'requestfeedback',component: FeedbackNewComponent},
  { path: 'receivedfeedback',component:FeedbackListComponent},
  { path: 'givefeedback',component:FeedbackCreateComponent},
  { path: 'forgotpassword',component:ForgetPasswordComponent},
  { path: 'forgotpasswordconfirmation',component:ForgetPasswordConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, FeedbackCreateComponent, FeedbackListComponent,FeedbackNewComponent,ForgetPasswordComponent,ForgetPasswordConfirmationComponent]

