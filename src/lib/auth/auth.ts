// auth.ts（项目根目录）
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,  // V5 用 AUTH_SECRET
  
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return null
      },
    }),
  ],
  
  pages: {
    signIn: '/api/auth/signin',  // 默认登录页
  },
})