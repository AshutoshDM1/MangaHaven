import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { DefaultSession } from "next-auth";

const prisma = new PrismaClient();

type CustomUser = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }, // 'login' or 'signup'
        firstName: { label: "First Name", type: "text" }, // For signup
        lastName: { label: "Last Name", type: "text" }, // For signup
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }
        console.log(credentials);
        try {
          console.log(credentials.action);
          if (credentials.action === "signup") {
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (existingUser) {
              throw new Error("User already exists");
            }

            const hashedPassword = await hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                image:
                  "https://avatarfiles.alphacoders.com/375/thumb-350-375542.webp",
              },
            });

            return {
              id: newUser.id,
              email: newUser.email,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              image: newUser.image,
            } as CustomUser;
          } else {
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (!user) {
              throw new Error("User not found");
            }

            const isPasswordValid = await compare(
              credentials.password,
              user.password,
            );

            if (!isPasswordValid) {
              throw new Error("Invalid password");
            }

            return {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              image: user.image,
            } as CustomUser;
          }
        } catch (error) {
          console.error("Authorization Error:", error);
          throw error; // Re-throw the error to pass it to the frontend
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is signing in, update the token with the latest user info
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string | null;
        session.user.firstName = token.firstName as string | null;
        session.user.lastName = token.lastName as string | null;
        session.user.email = token.email as string;
        session.user.image = token.picture as string | null;
      }
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string | null;
      firstName: string | null;
      lastName: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    firstName?: string | null;
    lastName?: string | null;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
