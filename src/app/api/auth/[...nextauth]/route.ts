import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "seu@email.com" },
                password: { label: "Senha", type: "password" },
            },
        async authorize(credentials) {
            if (credentials?.email === "admin@email.com" && credentials?.password === "123456") {
                return { id: "1", name: "Admin", email: "admin@email.com" };
            }
            return null;
        },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };