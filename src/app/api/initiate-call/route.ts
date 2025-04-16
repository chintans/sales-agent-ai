import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();
    
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    if (!customer.salesScript) {
      return NextResponse.json(
        { error: 'No sales script available' },
        { status: 400 }
      );
    }

    // Initialize Bland AI call
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BLAND_AI_API_KEY}`,
      },
      body: JSON.stringify({
        phone_number: customer.phone,
        task: customer.salesScript,
        record: true,
        voice: 'Keelan', // You can change this based on your preference
        wait_for_greeting: false,
        answered_by_enabled: true,
        noise_cancellation: false,
        interruption_threshold: 100,
        block_interruptions: false,
        max_duration: 12,
        model: 'base',
        language: 'en',
        background_track: 'none',
        endpoint: 'https://api.bland.ai',
        voicemail_action: 'hangup',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate call with Bland AI');
    }

    const callData = await response.json();

    return NextResponse.json({ 
      message: 'Call initiated successfully',
      callId: callData.call_id 
    });
  } catch (error) {
    console.error('Error initiating call:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
} 