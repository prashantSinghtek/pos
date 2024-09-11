// next-d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    email: string;
    uToken: string; // Add uToken property
    type: string; // Add type property if needed
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      type: string;
    };
  }

  interface User {
    id: string;
    email: string;
    token: string; // Add token property to User
    type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    uToken: string; // Add uToken property to JWT
    type: string; // Add type property if needed
  }
}
