// API route to test all database connections
import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/database';

export async function GET() {
  try {
    const health = await checkDatabaseHealth();
    
    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      databases: health,
      summary: {
        total: 3,
        healthy: Object.values(health).filter(Boolean).length - 1, // exclude timestamp
        unhealthy: Object.values(health).filter(h => h === false).length
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Failed to check database health',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}