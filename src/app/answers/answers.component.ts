import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../data.service';
import { Answer } from 'src/models/answers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit {
  answers: any; // Array to hold the answers for the current question
  currentQuestion: any; // Object to hold the current question details

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the route parameters to get the question ID
    this.route.params.subscribe((params) => {
      const questionId = Number(params['id']);
      if (questionId) {
        // Get the current question details
        this.currentQuestion = this.dataService.getQuestionById(questionId);
        // Get the answers for the current question
        this.getAnswersByQuestionId(questionId);
      }
    });
  }

  userVotes: number[] = []; // Array to track the user's votes

  // Function to add a new answer
  addAnswer(answer: HTMLTextAreaElement) {
    if (!answer.value) {
      return; // Do nothing if the answer is empty
    }

    // Add the new answer to the data service
    this.dataService.addAnswer(
      this.currentQuestion.id,
      answer.value,
      this.authService.currentLoggedInUser.id
    );
    // Refresh the answers list
    this.getAnswersByQuestionId(this.currentQuestion.id);
    answer.value = ''; // Clear the input field
  }

  // Function to get answers by question ID
  getAnswersByQuestionId(id: number) {
    this.answers = this.dataService.getAnswersById(id);
  }

  // Function to upvote an answer
  upvoteAnswer(id: number) {
    this.dataService.upvoteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { refresh: true },
    };
    // Navigate to the current route with navigation extras to trigger refresh
    this.router.navigate([], navigationExtras).then(() => {
      // Reload the answers after the navigation is complete
      this.getAnswersByQuestionId(this.currentQuestion.id);
    });
  }

  // Function to downvote an answer
  downvoteAnswer(id: number) {
    this.dataService.downvoteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { refresh: true },
    };
    // Navigate to the current route with navigation extras to trigger refresh
    this.router.navigate([], navigationExtras).then(() => {
      // Reload the answers after the navigation is complete
      this.getAnswersByQuestionId(this.currentQuestion.id);
    });
  }

  // Function to delete an answer
  deleteAnswer(id: number) {
    this.dataService.deleteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { refresh: true },
    };
    // Navigate to the current route with navigation extras to trigger refresh
    this.router.navigate([], navigationExtras).then(() => {
      // Reload the answers after the navigation is complete
      this.getAnswersByQuestionId(this.currentQuestion.id);
    });
  }

  newText: string = ''; // Variable to hold the new text for editing an answer

  // Function to edit an answer
  editAnswer(id: number, newText: string): void {
    const answer = this.answers.find((answer: Answer) => answer.id === id);
    if (answer) {
      // Use SweetAlert2 to show a prompt for editing the answer text
      Swal.fire({
        title: 'Enter the new answer text:',
        input: 'text',
        inputValue: answer.text,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const newText = result.value;
          this.dataService.editAnswer(id, newText); // Update the answer text in the data service
          Swal.fire('Answer edited!', '', 'success');
          const navigationExtras: NavigationExtras = {
            queryParams: { refresh: true },
          };
          // Navigate to the current route with navigation extras to trigger refresh
          this.router.navigate([], navigationExtras).then(() => {
            // Reload the answers after the navigation is complete
            this.getAnswersByQuestionId(this.currentQuestion.id);
          });
        }
      });
    }
  }

  editedAnswerId: number | null = null; // Variable to hold the ID of the answer being edited

  // Boolean to check if the current user is an admin
  isAdminUser = this.authService.currentLoggedInAdmin;
}
