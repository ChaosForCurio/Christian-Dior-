import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Gemini features will be disabled.');
}

const genAI = new GoogleGenerativeAI(apiKey || 'DUMMY_KEY_FOR_BUILD');

export const getGeminiModel = (modelName: string = 'gemini-1.5-flash') => {
    return genAI.getGenerativeModel({ model: modelName });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProductRecommendations = async (userHistory: any[], availableProducts: any[]) => {
    if (!apiKey) return [];

    const model = getGeminiModel();

    const prompt = `
    You are a luxury fashion recommendation engine inspired by Amazon and Flipkart's algorithms for Christian Dior.
    Based on the following user activity history and available products, suggest the top 5 products the user is most likely to be interested in.
    
    User Activity History:
    ${JSON.stringify(userHistory, null, 2)}
    
    Available Products:
    ${JSON.stringify(availableProducts, null, 2)}
    
    Provide your response as a JSON array of product objects with a "reason" field for each recommendation.
    Only include products from the "Available Products" list.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) return [];

        // Attempt to parse JSON from text (handling potential markdown blocks or extra text)
        const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch && jsonMatch[0]) {
            try {
                const parsed = JSON.parse(jsonMatch[0]);
                if (Array.isArray(parsed)) {
                    return parsed.slice(0, 5);
                }
            } catch (e) {
                console.error('Failed to parse Gemini JSON match:', e);
            }
        }

        console.warn('Gemini returned malformed response. Text sample:', text.substring(0, 100));
        return [];
    } catch (error) {
        console.error('Gemini recommendation error:', error);
        return [];
    }
};
