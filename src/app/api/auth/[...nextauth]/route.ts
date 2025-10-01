import { JsonWebTokenError } from "jsonwebtoken";
import NextAuth,{NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions:NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
   
    ],

    session: {
        strategy: "jwt",
        maxAge:30*60*60,
        updateAge:60*60,
    },
    callbacks: {
        async jwt({ token, account,user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
            }
            return token;
           
        },

        async session({ session, token,  }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;
           
            return session;
        },


    },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export const GET = handler;
export const POST = handler;
