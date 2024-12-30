import jwt from 'jsonwebtoken';

export default async (request: Request) => {
  const { token } = await request.json();
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    return new Response(JSON.stringify({ decodedToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
