'use server';

import { logger } from '@/lib/logger.config';
import { loginSchema } from '@/schema/auth.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const validated = loginSchema.safeParse({
    phoneNumber: formData.get('phoneNumber'),
    pin: formData.get('pin'),
  });

  if (!validated.success) {
    return { error: (validated as any).error.errors[0].message };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated.data),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Login failed' };
    }

    const cookieStore = await cookies();
    cookieStore.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    redirect('/');
  } catch (error) {
    logger.error('Login action failed:', error);
    return { error: 'Something went wrong' };
  }
}