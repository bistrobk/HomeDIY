import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components
import { Router } from '@angular/router'; // Import the Router for navigation
import { AuthService } from '../auth.service'; // Import the AuthService for authentication

@Component({
  selector: 'app-register', // Define the component's selector
  templateUrl: './register.component.html', // Define the path to the component's HTML template
  styleUrls: ['./register.component.css'] // Define the path to the component's CSS styles
})
export class RegisterComponent implements OnInit {
  user: any = {
    user: '', // Initialize user name
    email: '', // Initialize user email
    password: '' // Initialize user password
  };

  constructor(private authService: AuthService, private router: Router) { 
    // Inject AuthService and Router into the component
  }

  ngOnInit(): void {
    // Lifecycle hook for initialization (currently empty)
  }

  /**
   * Registers a new user and navigates to the login page.
   * @param user The user object containing name, email, and password
   */
  register(user: any) {
    debugger; // Debugger statement for debugging purposes
    this.authService.addUser(user.name, user.email, user.password); // Add the new user using the AuthService
    this.router.navigate(['/login']); // Navigate to the login page after successful registration
  }

}
