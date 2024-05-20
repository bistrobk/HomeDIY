export interface Answer {
    id: number;
    questionId: number;
    text: string;
    userId: number;
    upvote: number;
    downvote: number;
    comments: Comment[];
  }
  
  export interface Comment {
    id: number;
    text: string;
    userId: number;
  }
  