export interface User {
    _id: string;
    username: string;
    email: string;
    image: string;
  }
  
   export interface Post {
    creator: User;
    prompt: string;
    tag: string;
  }