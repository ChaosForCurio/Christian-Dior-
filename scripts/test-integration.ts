import 'dotenv/config';

async function test() {
    const baseUrl = 'http://localhost:3000';

    console.log('🧪 Starting Integration Tests...');

    // 1. Test Product Sync
    console.log('🔄 Testing Product Sync (/api/products/sync)...');
    try {
        const syncRes = await fetch(`${baseUrl}/api/products/sync?q=dior+bags`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`
            }
        });
        const syncData = await syncRes.json();
        console.log('✅ Sync Result:', syncData.success ? 'Success' : 'Failed', `(Found ${syncData.count} products)`);
    } catch (err) {
        console.error('❌ Sync Test Failed:', err);
    }

    // 2. Test Activity Logging
    console.log('📝 Testing Activity Logging (/api/activity/log)...');
    try {
        const logRes = await fetch(`${baseUrl}/api/activity/log`, {
            method: 'POST',
            body: JSON.stringify({
                userId: 'test-user-123',
                action: 'view_product',
                metadata: { product: 'Dior Book Tote' }
            })
        });
        const logData = await logRes.json();
        console.log('✅ Log Result:', logData.success ? 'Success' : 'Failed');
    } catch (err) {
        console.error('❌ Log Test Failed:', err);
    }

    // 3. Test Recommendations
    console.log('🤖 Testing Recommendations (/api/recommendations)...');
    try {
        const recRes = await fetch(`${baseUrl}/api/recommendations?userId=test-user-123`);
        const recData = await recRes.json();
        console.log('✅ Recs Result:', recData.success ? 'Success' : 'Failed');
        if (recData.recommendations) {
            console.log('   Suggestions:', recData.recommendations.map((r: any) => r.title || r.reason).join(', '));
        }
    } catch (err) {
        console.error('❌ Recs Test Failed:', err);
    }

    console.log('🏁 Integration Tests Finished.');
}

console.log('⚠️ Ensure the Next.js dev server is running (npm run dev) before testing.');
test();
