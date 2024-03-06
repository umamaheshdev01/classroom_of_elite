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


       
        try {
          const url = `http://localhost:3000/api/user/${credentials.email}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          
          const data = await response.json();

          const dam = JSON.stringify(data)

          const result = JSON.parse(dam.slice(9,-2))

          const user = {
            email : result.uid
          }

          if (result.password == credentials.password) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }









        
       
      },
    }),
  ],

  secret: '12321333'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
