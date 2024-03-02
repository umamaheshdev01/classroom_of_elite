import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'creds',
      credentials: {
        email: { label: 'Email', placeholder: 'Enter Email' },
        password: { label: 'Password', placeholder: 'Enter Password' },
      },
      async authorize(credentials, req) {
        // const user = {name : 'uma',email : credentials.email};
        if (user) { 
          return user
        } else {
          return null
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
