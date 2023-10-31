export interface User {
    _id: string;
    username: string;
    email: string;
    image: string;
  }
  
   export interface Post {
    _id: string;
    creator: User;
    prompt: string;
    tag: string;
  }
