declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      email: string;
      image: string;
      userId: string;
    }
  }
}
