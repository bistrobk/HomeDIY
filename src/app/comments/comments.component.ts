import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: string[] = []; // Array to store comments
  newComment: string = ''; // Variable to store the new comment input

  constructor(public authService: AuthService) {
    // Inject the AuthService to manage authentication-related tasks
  }

  ngOnInit(): void {
    // Initialize the component
  }

  /**
   * Adds a new comment to the comments array.
   */
  addComment() {
    if (this.newComment.trim() !== '') {
      // Check if the new comment is not empty or just whitespace
      this.comments.push(this.newComment); // Add the new comment to the array
      this.newComment = ''; // Clear the input field
    }
  }

  /**
   * Deletes a comment from the comments array.
   * @param index The index of the comment to delete
   */
  deleteComment(index: number) {
    this.comments.splice(index, 1); // Remove the comment at the specified index
  }

  newText: string = " "; // Variable to store the new text for editing a comment

  /**
   * Edits an existing comment using SweetAlert2.
   * @param index The index of the comment to edit
   * @param newText The current text of the comment to edit
   */
  editComment(index: number, newText: string) {
    Swal.fire({
      title: 'Edit Comment', // Title of the alert
      input: 'text', // Type of input
      inputValue: newText, // Pre-fill the input with the current comment text
      showCancelButton: true, // Show the cancel button
      confirmButtonText: 'Save', // Text for the confirm button
      cancelButtonText: 'Cancel', // Text for the cancel button
      inputValidator: (value) => {
        // Validator for the input field
        if (!value || value.trim() === '') {
          return 'Please enter a comment'; // Error message if the input is empty or just whitespace
        }
        return null; // Return null to indicate a valid input
      }
    }).then((result) => {
      // Handle the result of the alert
      if (result.isConfirmed) {
        this.comments[index] = result.value; // Update the comment with the new value
        Swal.fire('Comment Updated!', '', 'success'); // Show a success message
      }
    });
  }
}
