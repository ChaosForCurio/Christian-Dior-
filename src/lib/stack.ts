import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "a781cce2-99cd-48c2-9942-f5f9c7cdb6fc",
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "pck_placeholder",
    secretServerKey: process.env.STACK_SECRET_SERVER_KEY || "ssk_placeholder",
    tokenStore: "nextjs-cookie",
    urls: {
        afterSignIn: "/",
        afterSignUp: "/",
    }
});
