export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface LoginResult {
    success: boolean;
    message: string;
    token?: string;
    username?: string;
    userId?: string;
  }
  
  