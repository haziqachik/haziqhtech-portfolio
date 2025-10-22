// Debug API to check environment variables in production
import { NextResponse } from 'next/server';

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;
  const postgresUrl = process.env.POSTGRES_URL;
  const mongodbUri = process.env.MONGODB_URI;
  
  // Don't expose full credentials, just check format
  const info = {
    DATABASE_URL: databaseUrl ? {
      exists: true,
      startsWithPostgresql: databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://'),
      length: databaseUrl.length,
      hasNewline: databaseUrl.includes('\n') || databaseUrl.includes('\r'),
      first50Chars: databaseUrl.substring(0, 50) + '...',
      last10Chars: '...' + databaseUrl.substring(databaseUrl.length - 10)
    } : { exists: false },
    POSTGRES_URL: postgresUrl ? {
      exists: true,
      startsWithPostgresql: postgresUrl.startsWith('postgresql://') || postgresUrl.startsWith('postgres://'),
      length: postgresUrl.length,
      hasNewline: postgresUrl.includes('\n') || postgresUrl.includes('\r'),
    } : { exists: false },
    MONGODB_URI: mongodbUri ? {
      exists: true,
      startsWithMongodb: mongodbUri.startsWith('mongodb'),
      hasNewline: mongodbUri.includes('\n') || mongodbUri.includes('\r'),
    } : { exists: false },
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };
  
  return NextResponse.json(info);
}
