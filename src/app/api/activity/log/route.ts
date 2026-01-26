import { NextResponse } from 'next/server';
import { logActivity } from '@/lib/neon';
import { stackServerApp } from '@/lib/stack';
import { ActivityLogSchema } from '@/lib/validation';

export async function POST(req: Request) {
    try {
        // 1. Authentication: Check for valid user session
        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        // 2. Validation
        const validation = ActivityLogSchema.safeParse({ ...body, userId: user.id });
        if (!validation.success) {
            return NextResponse.json({ success: false, error: validation.error.format() }, { status: 400 });
        }
        const { userId, action, metadata } = validation.data;

        // 3. Execution
        const activity = await logActivity(userId, action, metadata || {});

        return NextResponse.json({ success: true, activity });
    } catch (error: any) {
        console.error('Activity log api error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
