import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser.id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check to see if the user already exists.
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If not, create a new user.
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if the user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
