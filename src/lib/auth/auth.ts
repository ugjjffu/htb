// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // 最简单的硬编码验证
        if (credentials.password === "demo") {
          return { id: "1", name: "User", email: "user@example.com" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" }, // 必须，否则默认要数据库
  secret: process.env.AUTH_SECRET, // 必须
});