import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_API_KEY
const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL;

export async function verifySupabaseToken(req, res, next) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Missing access token' });
    }
    const { data, error } = await supabase.auth.getUser(token);
    if(error){
        throw new Error("Invalid JWT");
    }
    req.user = data;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
