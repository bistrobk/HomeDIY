import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; // Import necessary Angular core components
import { Router } from '@angular/router'; // Import the Router for navigation
import { AuthService } from './auth.service'; // Import the AuthService for authentication

@Component({
  selector: 'app-root', // Define the component's selector
  templateUrl: './app.component.html', // Define the path to the component's HTML template
  styleUrls: ['./app.component.css'], // Define the path to the component's CSS styles
})
export class AppComponent implements OnInit {
  title = 'HomeDYI'; // Title of the application
  user: any; // Variable to store the current logged-in user
  searchTerm: string = ""; // Variable to store the search term
  items = ['How to paint a room?', 'How to build a simple garden bench?']; // Array to store items
  filteredItems: string[] = []; // Array to store filtered items
  toggleSearch: any; // Variable for toggling search (not yet implemented)
  searchText: any; // Variable for search text (not yet implemented)

  constructor(public authService: AuthService, private router: Router) { 
    // Inject AuthService and Router into the component
  }

  ngOnInit(): void {
    // Lifecycle hook for initialization
    if (!this.authService.currentLoggedInUser) {
      // Check if there is no current logged-in user
      const userJson: any = localStorage.getItem(this.authService.userKey); // Get the user data from local storage
      try {
        const user = JSON.parse(userJson); // Parse the user data from JSON
        this.authService.currentLoggedInUser = user; // Set the current logged-in user
      } catch (error) {
        localStorage.removeItem(this.authService.userKey); // Remove invalid user data from local storage
      }
    }
    this.user = this.authService.currentLoggedInUser; // Set the user variable to the current logged-in user
  }

  /**
   * Logs out the current user and navigates to the home page.
   */
  logout() {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/']); // Navigate to the home page
  }

  /**
   * Filters the items array based on the search term.
   * @returns The filtered items array
   */
  searchItems() {
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filter items based on the search term
    );
    return this.filteredItems; // Return the filtered items
  }

  /**
   * Placeholder for the searchClose method.
   * @throws Error Method not implemented
   */
  searchClose() {
    throw new Error('Method not implemented.'); // Placeholder for the searchClose method
  }
}

