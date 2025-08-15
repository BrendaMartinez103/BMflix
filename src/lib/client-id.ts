import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const COOKIE_NAME = 'bmflix_client';

export async function getOrSetClientId(): Promise<string> {
  const c = await cookies();
  let id = c.get(COOKIE_NAME)?.value;
  if (!id) {
    id = randomUUID();
    c.set({
      name: COOKIE_NAME,
      value: id,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 año
    });
  }
  return id;
}
