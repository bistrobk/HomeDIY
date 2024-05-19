import { NgModule } from '@angular/core'; // Import the NgModule decorator
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule for browser-specific services

import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule for configuring routes
import { AppComponent } from './app.component'; // Import the AppComponent, the root component
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule for using ng-bootstrap components
import { QuestionsComponent } from './questions/questions.component'; // Import the QuestionsComponent
import { AnswersComponent } from './answers/answers.component'; // Import the AnswersComponent
import { LoginComponent } from './login/login.component'; // Import the LoginComponent
import { RegisterComponent } from './register/register.component'; // Import the RegisterComponent
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { CommentsComponent } from './comments/comments.component'; // Import the CommentsComponent

@NgModule({
  declarations: [
    AppComponent, // Declare the AppComponent
    QuestionsComponent, // Declare the QuestionsComponent
    AnswersComponent, // Declare the AnswersComponent
    LoginComponent, // Declare the LoginComponent
    RegisterComponent, // Declare the RegisterComponent
    CommentsComponent, // Declare the CommentsComponent
  ],
  imports: [
    BrowserModule, // Import BrowserModule for browser-specific services
    AppRoutingModule, // Import AppRoutingModule to set up routing
    NgbModule, // Import NgbModule to use ng-bootstrap components
    FormsModule // Import FormsModule to use template-driven forms
  ],
  providers: [], // No providers are specified
  bootstrap: [AppComponent] // Bootstrap the AppComponent as the root component
})
export class AppModule { }
