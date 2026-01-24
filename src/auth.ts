// // auth.ts 或 auth.config.ts
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import { z } from "zod"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     // OAuth - 简单配置
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     // Credentials - 需要完整逻辑
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "邮箱", type: "email" },
//         password: { label: "密码", type: "password" },
//       },
//       async authorize(credentials) {
//         // 1. 验证输入
//         const parsed = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials)

//         if (!parsed.success) return null

//         // 2. 验证用户（查数据库）
//         const user = await db.user.findUnique({
//           where: { email: parsed.data.email },
//         })

//         if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
//           return null
//         }

//         // 3. 返回用户对象
//         return { id: user.id, email: user.email, name: user.name }
//       },
//     }),
//   ],
// })