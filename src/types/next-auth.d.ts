import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      mongoid?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    email:string;
    name?:string;
    image?:string;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    accessToken?: string;
    mongoid?: string;
  }
}
