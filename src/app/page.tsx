'use client';

import { useState } from 'react';
import { CustomerForm } from '@/components/CustomerForm';
import { SalesScript } from '@/components/SalesScript';
import { CallTranscript } from '@/components/CallTranscript';
import { StepProgress } from '@/components/StepProgress';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [salesScript, setSalesScript] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [customerId, setCustomerId] = useState<string>('');

  const handleFormSubmit = async (formData: any) => {
    try {
      // First, save customer data
      const customerResponse = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to save customer data');
      }

      const customer = await customerResponse.json();
      setCustomerId(customer.id);

      // Then, generate sales script
      const scriptResponse = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: customer.id }),
      });

      if (!scriptResponse.ok) {
        throw new Error('Failed to generate sales script');
      }

      const scriptData = await scriptResponse.json();
      setSalesScript(scriptData.script);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleCallInitiation = async () => {
    try {
      const response = await fetch('/api/initiate-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate call');
      }

      // Start polling for transcript
      const pollTranscript = async () => {
        const transcriptResponse = await fetch(`/api/transcript?customerId=${customerId}`);
        if (transcriptResponse.ok) {
          const data = await transcriptResponse.json();
          setTranscript(data.transcript);
        }
      };

      // Poll every 5 seconds
      const interval = setInterval(pollTranscript, 5000);
      return () => clearInterval(interval);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CustomerForm
            onSubmit={handleFormSubmit}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <SalesScript
            script={salesScript}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <CallTranscript
            transcript={transcript}
            onBack={() => setCurrentStep(2)}
            onCallInitiation={handleCallInitiation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Sales Call Preparation</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <StepProgress currentStep={currentStep} totalSteps={3} />
        
        {renderStep()}
      </div>
    </main>
  );
}
