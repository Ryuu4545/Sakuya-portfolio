import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'sakuya2024';
const SECRET = process.env.ADMIN_SECRET || 'default-secret-change-me';

export function generateToken(): string {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return Buffer.from(`${ADMIN_USER}:${SECRET}:${day}`).toString('base64');
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

export function validateToken(token: string): boolean {
  return token === generateToken();
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;
    return validateToken(token);
  } catch {
    return false;
  }
}
