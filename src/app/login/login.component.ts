import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router for navigation
import { AuthService } from '../auth.service'; // Import the AuthService for authentication
import { Mongoose } from 'mongoose'; // Import Mongoose (Note: Typically not used in Angular components)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '', // Initialize user email
    password: '' // Initialize user password
  }

  constructor(private authService: AuthService, private router: Router) { 
    // Inject AuthService and Router into the component
  }

  ngOnInit(): void {
    // Lifecycle hook for initialization
  }

  /**
   * Logs in the user by checking the credentials and navigating to the home page if successful.
   * @param user The user object containing email and password
   */
  login(user: any) {
    debugger; // Debugger statement for debugging purposes
    const currentUser = this.authService.login(user.email, user.password); // Attempt to log in using the AuthService
    if (currentUser) {
      // If login is successful
      this.authService.currentLoggedInUser = currentUser; // Set the currently logged in user in the AuthService
      this.router.navigate(['/']); // Navigate to the home page
    }
  }
}
