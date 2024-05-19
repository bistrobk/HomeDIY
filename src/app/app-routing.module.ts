import { NgModule } from '@angular/core'; // Import the NgModule decorator
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes for configuring the routes
import { AnswersComponent } from './answers/answers.component'; // Import the AnswersComponent
import { LoginComponent } from './login/login.component'; // Import the LoginComponent
import { QuestionsComponent } from './questions/questions.component'; // Import the QuestionsComponent
import { RegisterComponent } from './register/register.component'; // Import the RegisterComponent

const routes: Routes = [
  {
    path: 'login', // Define the route path for login
    pathMatch: 'full', // Match the full path
    component: LoginComponent // Specify the component to load for this route
  },
  {
    path: 'register/user', // Define the route path for user registration
    pathMatch: 'full', // Match the full path
    component: RegisterComponent // Specify the component to load for this route
  },
  {
    path: 'answers/question/:id', // Define the route path for viewing answers to a specific question
    pathMatch: 'full', // Match the full path
    component: AnswersComponent // Specify the component to load for this route
  },
  {
    path: '', // Define the default route path (home)
    component: QuestionsComponent // Specify the component to load for this route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import RouterModule and configure it with the defined routes
  exports: [RouterModule] // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule { }
