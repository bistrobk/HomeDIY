import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router for navigation
import { AuthService } from '../auth.service'; // Import the AuthService for authentication
import { NavigationExtras } from '@angular/router'; // Import NavigationExtras for advanced navigation

import { DataService } from '../data.service'; // Import the DataService for data operations
import { Question } from 'src/models/questions'; // Import the Question model

import Swal from 'sweetalert2'; // Import SweetAlert2 for alerts

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any; // Array to hold questions
  searchTerm: string = ""; // Variable to store the search term
  items = ['How to ride a bike?', 'How to play a guitar?', 'How to code a basic website using HTML and CSS?', 'What are the key differences between Python and Java, and when should you use each one?', 'How can you use Git to manage your code changes and collaborate with others?']; // Array to store items
  filteredItems: { id: number, itemId: number, text: string }[] = []; // Array to store filtered items

  constructor(private dataService: DataService, private router: Router, public authService: AuthService) { 
    // Inject DataService, Router, and AuthService into the component
  }

  ngOnInit() {
    // Lifecycle hook for initialization
    this.questions = this.dataService.getQuestions(); // Get the questions from the data service
  }

  /**
   * Adds a new question to the questions array.
   * @param question The input element containing the new question
   */
  askQuestion(question: HTMLInputElement) {
    debugger; // Debugger statement for debugging purposes
    if (!question.value) {
      return; // Do nothing if the input is empty
    }

    // Add the new question to the data service
    this.dataService.addQuestion(question.value, this.authService.currentLoggedInUser.id);
    this.items.push(question.value); // Add the new question to the items array
    question.value = ''; // Clear the input field
    this.questions = this.dataService.getQuestions(); // Refresh the questions array
  }

  /**
   * Navigates to the answer page for the specified question.
   * @param question The question object
   */
  navigateToAnswer(question: any) {
    this.router.navigate(['/answers', 'question', question.id]); // Navigate to the answer page for the question
  }

  /**
   * Navigates to the answer page for the specified question ID.
   * @param id The ID of the question
   */
  navigateToAnswerId(id: any) {
    this.router.navigate(['/answers', 'question', id]); // Navigate to the answer page for the question ID
  }

  /**
   * Deletes a question from the questions array.
   * @param id The ID of the question to delete
   */
  deleteQuestion(id: any) {
    const questionIndex = this.questions.findIndex((q: Question) => q.id === id); // Find the index of the question to delete
    if (questionIndex !== -1) {
      this.items.splice(questionIndex, 1); // Remove the question from the items array
      this.questions.splice(questionIndex, 1); // Remove the question from the questions array
      this.dataService.deleteQuestion(id); // Delete the question from the data service
      this.router.navigate([], { queryParams: { refresh: true } }); // Refresh the page
      Swal.fire('Question deleted!', '', 'success'); // Show a success message
    }
  }

  newText: string = ''; // Variable to store the new text for editing a question

  /**
   * Edits an existing question using SweetAlert2.
   * @param id The ID of the question to edit
   * @param newText The current text of the question to edit
   */
  editQuestion(id: any, newText: string) {
    const questionIndex = this.questions.findIndex((q: Question) => q.id === id); // Find the index of the question to edit
    if (questionIndex !== -1) {
      const question = this.questions[questionIndex]; // Get the question object
      Swal.fire({
        title: 'Edit Question', // Title of the alert
        input: 'text', // Type of input
        inputValue: question.text, // Pre-fill the input with the current question text
        showCancelButton: true, // Show the cancel button
        confirmButtonText: 'Save', // Text for the confirm button
        cancelButtonText: 'Cancel', // Text for the cancel button
      }).then((result) => {
        if (result.isConfirmed && result.value !== '') {
          // If the user confirmed and the input is not empty
          const newQuestionText = result.value;
          this.questions[questionIndex].text = newQuestionText; // Update the question text in the array
          this.items[questionIndex] = newQuestionText; // Update the question text in the items array
          this.dataService.editQuestion(id, newQuestionText); // Update the question text in the data service
          this.router.navigate([], { queryParams: { refresh: true } }); // Refresh the page
          Swal.fire('Question edited', '', 'success'); // Show a success message
        }
      });
    }
    this.editedQuestionId = null; // Reset the editedQuestionId
  }

  /**
   * Filters the items array based on the search term.
   */
  searchItems() {
    this.filteredItems = this.items
      .filter((item) => item.toLowerCase().includes(this.searchTerm.toLowerCase())) // Filter items based on the search term
      .map((item, index) => ({ id: index, itemId: this.items.indexOf(item), text: item })); // Map the filtered items to an array of objects with id, itemId, and text
  }

  editedQuestionId: number | null = null; // Variable to store the ID of the question being edited

  // Check if the current user is an admin
  isAdminUser = this.authService.currentLoggedInAdmin;

}
