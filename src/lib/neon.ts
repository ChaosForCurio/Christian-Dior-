import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon
    },
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const logActivity = async (userId: string, action: string, metadata: any) => {
    const sql = `
    INSERT INTO user_activities (user_id, action, metadata, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
    try {
        const res = await query(sql, [userId, action, JSON.stringify(metadata)]);
        return res.rows[0];
    } catch (error) {
        console.error('Neon activity log error:', error);
        throw error;
    }
};

export default pool;
