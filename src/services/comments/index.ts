import mockData from '../mock/data.json';
import type { Comment, CreateCommentPayload, UpdateCommentPayload, User } from './types';

function Delay(ms: number): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('RESOLVED');
          resolve(originalMethod.apply(this, args));
        }, ms);
      });
    };
  };
}
class CommentsService {
  public static instance: CommentsService;
  private comments: Comment[] = [];
  private lastId: number = 0;
  private currentUser: User = undefined;

  private constructor() {
    let comments: Comment[];
    let currentUser: User;
    const commentsStr = localStorage.getItem('comments');
    const currentUserStr = localStorage.getItem('currentUser');
    if (commentsStr) {
      comments = JSON.parse(commentsStr);
      currentUser = JSON.parse(currentUserStr);
    } else {
      comments = mockData.comments;
      currentUser = mockData.currentUser;
      localStorage.setItem('comments', JSON.stringify(comments));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    this.comments = comments;
    this.lastId = this.flattenComments(comments).length;
    this.currentUser = currentUser;
  }

  @Delay(200)
  public createComment(payload: CreateCommentPayload): Promise<Comment> {
    return Promise.resolve(this.createCommentRecursively(this.comments, payload));
  }

  @Delay(200)
  public updateComment(payload: UpdateCommentPayload): Promise<Comment> {
    return Promise.resolve(this.updateCommentRecursively(this.comments, payload));
  }

  @Delay(200)
  public deleteComment(id: number): Promise<boolean> {
    return Promise.resolve(this.deleteCommentRecursively(this.comments, id));
  }

  public getCurrentUser(): Promise<User> {
    return Promise.resolve(this.currentUser);
  }

  public getComments(): Promise<Comment[]> {
    const comments = [...this.comments];
    comments.sort((a, b) => b.score - a.score);
    return Promise.resolve(this.sortCommentsRecursively(comments, 'score'));
  }

  private updateCommentRecursively(comments: Comment[], payload: UpdateCommentPayload): Comment {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === payload.id) {
        comments[i].content = payload.content ? payload.content : comments[i].content;
        comments[i].score =
          payload.score !== null && payload.score !== undefined ? payload.score : comments[i].score;
        localStorage.setItem('comments', JSON.stringify(this.comments));
        return comments[i];
      } else {
        if (comments[i].replies && comments[i].replies.length > 0) {
          const reply = this.updateCommentRecursively(comments[i].replies, payload);
          if (reply) return reply;
        }
      }
    }
  }

  private sortCommentsRecursively(comments: Comment[], by: 'score' | 'date'): Comment[] {
    comments.sort((a, b) => {
      if (by === 'score') {
        return b.score - a.score;
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
    comments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        this.sortCommentsRecursively(comment.replies, 'date');
      }
    });
    return comments;
  }

  private createCommentRecursively(comments: Comment[], payload: CreateCommentPayload): Comment {
    const newComment: Comment = {
      content: payload.content,
      createdAt: new Date().toISOString(),
      id: this.lastId++,
      replies: [],
      score: 0,
      user: this.currentUser,
    };

    if (payload.replyTo) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === payload.replyTo) {
          newComment.replyingTo = comments[i].user.username;
          comments[i].replies.push(newComment);
          localStorage.setItem('comments', JSON.stringify(this.comments));
          return newComment;
        } else {
          if (comments[i].replies && comments[i].replies.length > 0) {
            const reply = this.createCommentRecursively(comments[i].replies, payload);
            if (reply) return reply;
          }
        }
      }
    } else {
      comments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(this.comments));
      return newComment;
    }
  }

  private deleteCommentRecursively(comments, id) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        comments.splice(i, 1);
        localStorage.setItem('comments', JSON.stringify(this.comments));
        return true; // return true if comment is found and deleted
      } else {
        // recursively search for comment in replies
        if (comments[i].replies && comments[i].replies.length > 0) {
          const replyDeleted = this.deleteCommentRecursively(comments[i].replies, id);
          if (replyDeleted) return true;
        }
      }
    }
    return false; // return false if comment is not found
  }

  public static getInstance() {
    if (!CommentsService.instance) {
      CommentsService.instance = new CommentsService();
    }
    return CommentsService.instance;
  }

  private flattenComments(comments: Comment[]): Comment[] {
    return comments.reduce((acc, comment) => {
      return [...acc, comment, ...this.flattenComments(comment.replies)];
    }, [] as Comment[]);
  }
}

export const useCommentsService = CommentsService.getInstance;
