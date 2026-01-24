import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";

export default function Handler(props: { params: Promise<{ stack: string[] }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    return <StackHandler {...props} app={stackServerApp} fullPage={true} />;
}
