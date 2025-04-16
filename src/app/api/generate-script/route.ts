import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

const prisma = new PrismaClient();

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.0-flash",
});

const promptTemplate = PromptTemplate.fromTemplate(`
Create a sales script for a call with {customerName}. 
Previous conversation history: {conversationHistory}
Topics to discuss: {topics}

Please create a natural, conversational script that:
1. Introduces the sales representative
2. Acknowledges any previous conversations
3. Addresses the topics to discuss
4. Maintains a professional yet friendly tone
5. Includes key points to cover
6. Has a clear call to action`);

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

    const prompt = await promptTemplate.format({
      customerName: customer.name,
      conversationHistory: customer.conversationHistory,
      topics: customer.topics,
    });

    const response = await llm.invoke(prompt);
    const script = response.content.toString();

    // Update the customer record with the generated script
    await prisma.customer.update({
      where: { id: customerId },
      data: { salesScript: script },
    });

    return NextResponse.json({ script });
  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
} 