import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CustomUser = {
  id: number;
  email: string;
  name: string | null;
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
        name: { label: "Name", type: "text" }, // For signup
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        try {
          if (credentials.action === "signup") {
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (existingUser) {
              throw new Error("User already exists");
            }

            const Realname = credentials.name || credentials.email.split("@")[0];
            const hashedPassword = await hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                name: Realname,
                image: "https://avatarfiles.alphacoders.com/375/thumb-350-375542.webp",
              },
            });

            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              image: newUser.image,
            } as CustomUser;
          } else {
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (!user) {
              throw new Error("User not found");
            }

            const isPasswordValid = await compare(credentials.password, user.password);

            if (!isPasswordValid) {
              throw new Error("Invalid password");
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            } as CustomUser;
          }
        } catch (error) {
          console.error('Authorization Error:', error);
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
    signIn: '/signup',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
