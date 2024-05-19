import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Store the currently logged-in user (or undefined if no one is logged in)
  private _loggedInUser: any; 
  
  // Key used for storing the user in local storage
  userKey: string = 'User';  

  // Array of users, each with their own unique credentials and attributes
  users: any = [
    {
      id: 1,
      name: 'Alice',         // Updated name
      email: 'alice@example.com',
      password: 'password123', // Updated password
      expert: true,
      isAdminUser: false,
    },
    {
      id: 2,
      name: 'Bob',          // Updated name
      email: 'bob@example.com',
      password: 'securepass',  // Updated password
      expert: false,
      isAdminUser: false,
    },
    {
      id: 3,
      name: 'Carol',       // Updated name
      email: 'carol@example.com',
      password: 'mypassword', // Updated password
      expert: false,
      isAdminUser: false,
    },
    {
      id: 4,
      name: 'Admin',
      email: 'admin@example.com',
      password: 'adminpass',   // Updated password
      isAdminUser: true,
      expert: true,
    },
  ];

  // Getter to access the currently logged-in user
  get currentLoggedInUser(): any {
    return this._loggedInUser;
  }

  // Getter to check if the logged-in user is an expert
  get currentLoggedInExpert(): boolean {
    return this._loggedInUser ? this._loggedInUser.expert : false;
  }

  // Getter to check if the logged-in user is an admin
  get currentLoggedInAdmin(): boolean {
    return this._loggedInUser ? this._loggedInUser.isAdminUser : false;
  }

  // Setter to update the currently logged-in user
  set currentLoggedInUser(value: any) {
    this._loggedInUser = value;
  }

  constructor() { }

  // Find a user by their ID
  getUser(userId: number) {
    return this.users.find((user: any) => user.id === userId);
  }

  // Check if a given user ID matches the currently logged-in user's ID
  getUserEquals(userId: number) {
    return this.currentLoggedInUser && this.currentLoggedInUser.id === userId;
  }

  // Add a new user (with basic attributes)
  addUser(name: string, email: string, password: string) {
    const newUserId = this.users.length + 1;
    this.users.push({
      id: newUserId,
      name,
      email,
      password,
      expert: false, // New users are not experts by default
    });
    return true; // Indicates successful addition
  }

  // Handle user login
  login(email: string, password: string) {
    const user = this.users.find(
      (user: any) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.currentLoggedInUser = user;
    }
    return user; // Return the user if found, otherwise null
  }

  // Handle user logout
  logout() {
    this.currentLoggedInUser = undefined; 
    localStorage.removeItem(this.userKey);
  }
}
