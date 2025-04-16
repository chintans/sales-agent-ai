'use client';

interface CallTranscriptProps {
  transcript: string;
  onBack: () => void;
  onCallInitiation: () => void;
}

export function CallTranscript({ transcript, onBack, onCallInitiation }: CallTranscriptProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Call & Transcript</h2>
      
      <div className="mb-6">
        <button
          onClick={onCallInitiation}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Call the customer
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Transcript</h3>
        {transcript ? (
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-gray-800">
              {transcript}
            </pre>
          </div>
        ) : (
          <p className="text-gray-600">No transcript available yet. Click "Call the customer" to start a call.</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
      </div>
    </div>
  );
} 