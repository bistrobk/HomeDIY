import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  //added somes questions and answer to fill up the app
  questions = [
    {
      text: 'How to paint a room?',
      id: 1,
      userId: 1,
     
    },
    {
      text: 'What are some tips for installing laminate flooring?',
      id: 2,
      userId: 2,
      
    },
    {
      text: 'How to build a simple garden bench?',
      id: 3,
      userId: 1,
     
    },
    {
      text: 'What tools do I need for basic home repairs?',
      id: 4,
      userId: 3,
      
    },
    {
      text: 'How to unclog a kitchen sink?',
      id: 5,
      userId: 2,
    
    },
  ];

  answers = [
    {
      id: 1,
      questionId: 1,
      text: "To paint a room, start by preparing the surfaces. Clean the walls, repair any holes, and apply painter's tape to edges. Choose a quality primer and paint. Use a roller for large areas and a brush for edges and corners. Apply multiple thin coats for best results.",
      userId: 3,
      upvote: 10,
      downvote: 0,
      comments: [],
     
    },
    {
      id: 2,
      questionId: 1,
      text: 'Ensure the room is well-ventilated and wear protective gear. Start from the top and work your way down.',
      userId: 2,
      upvote: 2,
      downvote: 0,
      comments: [],
      
    },
    {
      id: 3,
      questionId: 2,
      text: 'When installing laminate flooring, acclimate the planks to the room temperature for 48 hours. Use spacers to maintain expansion gaps along the walls. Snap the planks together using the tongue-and-groove system, and stagger the seams for a more natural look.',
      userId: 3,
      upvote: 0,
      downvote: 0,
      comments: [
        {
          id: 1,
          text: 'Very helpful, thanks!',
          userId: 4,
        },
        {
          id: 2,
          text: 'Can you recommend a specific brand of laminate flooring?',
          userId: 5,
        },
      ],
    
    },
    {
      id: 4,
      questionId: 3,
      text: 'To build a simple garden bench, you will need wood planks, screws, a saw, a drill, and sandpaper. Cut the wood to the desired size, assemble the bench frame, and attach the seat and backrest. Sand the edges smooth and apply a finish to protect the wood.',
      userId: 1,
      upvote: 8,
      downvote: 0,
      comments: [],
      
    },
  ];

  // Constructor function that injects the AuthService into the component
  constructor(private authService: AuthService) { }

  getQuestionById(id: any) {
    // Retrieve the question with the specified ID from the questions array
    const question: any = this.questions.find((question) => question.id === id);
    // Retrieve the user associated with the question using the AuthService's getUser() method
    const user: any = this.authService.getUser(question.userId);
    // Return an object that includes the question details along with the user's name and ID
    return {
      ...question,
      userName: user.name,
      userId: user.id,
    };
  }

  getQuestions() {
    // Return an array of questions with additional user details
    return this.questions.map((question: any) => {
      // For each question, retrieve the user associated with the question using the AuthService's getUser() method
      return {
        ...question,
        // Return an object that includes the question details along with the user object
        user: this.authService.getUser(question.userId),
      };
    });
  }

  addQuestion(question: string, userId: number) {
    // Generate a unique ID for the new question
    const id = this.questions.length + 1;
    // Add the new question to the questions array
    this.questions.push({ text: question, id, userId });
    // Return true to indicate that the question was successfully added
    return true;
  }
  addAnswer(questionId: number, answer: string, userId: number) {
    const id = this.answers.length + 1; // Generate a unique ID for the new answer
    const upvote = 0; // Initialize the upvote count to 0
    const downvote = 0; // Initialize the downvote count to 0

    this.answers.push({
      id, // Assign the generated ID
      questionId, // Assign the ID of the question the answer belongs to
      text: answer, // Assign the provided answer text
      userId, // Assign the ID of the user who posted the answer
      upvote, // Assign the initial upvote count
      downvote, // Assign the initial downvote count
      comments: [], // Initialize an empty array to store comments on the answer
      
    });

    return true; // Return true to indicate that the answer was successfully added
  }

  getAnswersById(questionId?: number) {
    if (!questionId) {
      return this.answers; // If no questionId is provided, return all answers
    }

    return this.answers
      .filter((answer) => answer.questionId === questionId) // Filter the answers array to get answers for the specified questionId
      .map((answer: any) => {
        return {
          ...answer,
          user: this.authService.getUser(answer.userId), // Retrieve the user associated with the answer using the AuthService's getUser() method
        };
      });
  }

  votedAnswers: Set<number> = new Set<number>(); // Set to track voted answer IDs

  upvoteAnswer(id: number) {
    const answer = this.answers.find((a) => a.id === id);
    if (answer) {
      if (this.votedAnswers.has(id)) {
        answer.upvote = Math.max(answer.upvote - 1, 0); // Toggle downvote
        this.votedAnswers.delete(id);
      } else {
        if (answer.upvote === -1) {
          answer.upvote = 1; // Remove previous downvote and toggle upvote
          answer.downvote = 0;
        } else {
          answer.upvote += 1; // Toggle upvote
          answer.downvote = Math.max(answer.downvote - 1, 0); // Remove downvote if any
        }
        this.votedAnswers.delete(id); // Remove any previous downvote from votedAnswers set
        this.votedAnswers.add(id); // Add the ID to votedAnswers set
      }
    }
  }

  downvoteAnswer(id: number) {
    const answer = this.answers.find((a) => a.id === id);
    if (answer) {
      if (this.votedAnswers.has(id)) {
        answer.upvote += 1; // Toggle upvote
        answer.downvote = Math.max(answer.downvote - 1, 0); // Remove downvote if any
        this.votedAnswers.delete(id);
      } else {
        if (answer.upvote === 1) {
          answer.upvote = 0; // Toggle downvote
          answer.downvote = 1;
        } else {
          answer.upvote -= 1; // Toggle downvote
          answer.downvote = Math.max(answer.downvote + 1, 0); // Remove upvote if any
        }
        this.votedAnswers.delete(id); // Remove any previous upvote from votedAnswers set
        this.votedAnswers.add(id); // Add the ID to votedAnswers set
      }
    }
  }

  // Delete the answer with the given ID from the answers array
  deleteAnswer(id: number): void {
    const answerIndex = this.answers.findIndex((answer) => answer.id === id);
    if (answerIndex !== -1) {
      this.answers.splice(answerIndex, 1);
    }
  }

  // Find the answer with the given ID and update its text with the new text
  editAnswer(id: number, newText: string): void {
    const answer = this.answers.find((answer) => answer.id === id);
    if (answer) {
      answer.text = newText;
    }
  }

  // Delete the question with the given ID from the questions array
  deleteQuestion(id: any): void {
    const index = this.questions.findIndex((question) => question.id === id);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }

  // Find the question with the given ID and update its text with the new text
  editQuestion(id: any, newText: string): void {
    const question = this.questions.find((question) => question.id === id);
    if (question) {
      question.text = newText;
    }
  }

  // Find the answer with the given ID, create a new comment, and add it to the answer's comments array
  // If the comments array doesn't exist, create it before adding the comment
  addComment(answerId: number, commentText: string, userId: number) {
    const commentId = this.generateCommentId();
    const comment = {
      id: commentId,
      text: commentText,
      userId: userId,
    };

    const answer = this.answers.find((a) => a.id === answerId);
    if (answer) {
      if (!answer.comments) {
        answer.comments = [];
      }
      answer.comments.push(comment);
    }

    return true; // Return true to indicate that the comment was successfully added
  }

  // Find the answer with the given ID and delete the comment with the given ID from its comments array
  deleteComment(answerId: number, commentId: number) {
    const answer = this.answers.find((a) => a.id === answerId);
    if (answer && answer.comments) {
      const commentIndex = answer.comments.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        answer.comments.splice(commentIndex, 1);
      }
    }
  }

  // Find the answer with the given ID and update the text of the comment with the given ID
  editComment(answerId: number, commentId: number, newText: string): void {
    const answer = this.answers.find((a) => a.id === answerId);
    if (answer && answer.comments) {
      const commentIndex = answer.comments.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        answer.comments[commentIndex].text = newText;
      }
    }
  }
  // Find the maximum comment ID and add 1
  private generateCommentId(): number {
    let maxCommentId = 0;
    this.answers.forEach((answer) => {
      if (answer.comments) {
        answer.comments.forEach((comment) => {
          if (comment.id > maxCommentId) {
            maxCommentId = comment.id;
          }
        });
      }
    });
    return maxCommentId + 1;
  }
}
