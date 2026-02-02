import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Your verification logic here
        const user = await findUserByEmail(credentials.email);

        if (user && (await comparePasswords(credentials.password, user.password))) {
          return { id: user.id, email: user.email, name: user.name };
        }

        return null; // Return null if verification fails
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user's ID in the JWT token
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the user ID to the session
      session.user.id = token.userId;
      return session;
    },
  },
});