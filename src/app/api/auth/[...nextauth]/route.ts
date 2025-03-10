import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsType, postLogin } from "../../../../lib/requests/loginRequests";
import { convertToPairs } from "../../../../lib/utils/commum";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
        async authorize(credentials: any) {
            const authorizeComponent: CredentialsType = {
                combinations: convertToPairs(credentials.combinations),
                hash: credentials.hashCombine,
                email: credentials.email
            };
            const loginRepsonse = await postLogin(
                authorizeComponent
            );
            if (loginRepsonse.result) {
                return { id: "1", name: loginRepsonse.result.username, email: authorizeComponent.email };
            }
            
            throw new Error(`${loginRepsonse.error?.status}|${loginRepsonse.error?.message}`);
        },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };