import 'dotenv/config';
import { Pool } from 'pg';
import { createClient } from '@supabase/supabase-js';

async function init() {
  console.log('🚀 Starting Database Initialization...');

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  // 1. Initialize Neon (PostgreSQL)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  console.log('📅 Creating user_activities table in Neon...');
  const createNeonTable = `
    CREATE TABLE IF NOT EXISTS user_activities (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  try {
    await pool.query(createNeonTable);
    console.log('✅ Neon table created.');
  } catch (err) {
    console.error('❌ Neon error:', err);
  } finally {
    await pool.end();
  }

  // 2. Initialize Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log('📦 Preparing Supabase products table instructions...');
  console.log('Please run the following SQL in your Supabase SQL Editor:');
  const supabaseSql = `
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT UNIQUE NOT NULL,
      price TEXT,
      original_image_url TEXT,
      cloudinary_url TEXT,
      link TEXT,
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log('---');
  console.log(supabaseSql);
  console.log('---');

  console.log('🎉 Initialization Script Finished.');
}

init();
