import {Request} from 'express'

// Augment the Express Request type with a user property
declare global {
    namespace Express {
      interface Request {
        userID: string;
        isadmin: boolean;
      }
    }
  }
  