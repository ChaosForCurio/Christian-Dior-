import 'dotenv/config';

async function verifyHomepage() {
    const baseUrl = 'http://localhost:3000';
    console.log(`🌐 Verifying Homepage at ${baseUrl}...`);

    try {
        const res = await fetch(baseUrl);
        console.log(`📡 Status Code: ${res.status}`);

        if (res.status === 200) {
            const html = await res.text();

            // basic assertions
            const hasCouture = html.includes('Couture');
            const hasBeauty = html.includes('Beauty');
            const hasFashion = html.includes('Fashion');

            console.log('✅ Homepage Loaded Successfully');
            console.log(`   - Contains "Couture": ${hasCouture ? 'Yes' : 'No'}`);
            console.log(`   - Contains "Beauty": ${hasBeauty ? 'Yes' : 'No'}`);
            console.log(`   - Contains "Fashion": ${hasFashion ? 'Yes' : 'No'}`);

            if (hasCouture && hasBeauty) {
                console.log('🎉 Core Navigation Elements verified.');
            } else {
                console.warn('⚠️ Some expected navigation elements are missing from HTML.');
            }
        } else {
            console.error('❌ Homepage returned non-200 status');
        }
    } catch (err) {
        console.error('❌ Failed to fetch homepage:', err);
    }
}

verifyHomepage();
