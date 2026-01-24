import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "00000000-0000-0000-0000-000000000000",
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "pck_placeholder",
    secretServerKey: process.env.STACK_SECRET_SERVER_KEY || "ssk_placeholder",
    tokenStore: "nextjs-cookie",
    urls: {
        afterSignIn: "/",
        afterSignUp: "/",
    }
});
