import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            
            return {
                id: "user1"
            };
        },
      }),
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }