import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  provider: z.string(),
  accessToken: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = requestSchema.parse(body);

    // Implémentation réelle de la synchronisation avec Zeutland
    const zeutlandResponse = await fetch(`${process.env.ZEUTLAND_API_URL}/auth/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${validated.accessToken}`
      },
      body: JSON.stringify({
        id: validated.id,
        email: validated.email,
        name: validated.name,
        provider: validated.provider
      })
    });

    if (!zeutlandResponse.ok) {
      const error = await zeutlandResponse.json();
      throw new Error(error.message || 'Zeutland sync failed');
    }

    const zeutlandData = await zeutlandResponse.json();
    
    return NextResponse.json({
      success: true,
      token: zeutlandData.token,
      user: {
        id: validated.id,
        email: validated.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Zeutland sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync with Zeutland' },
      { status: 500 }
    );
  }
}
