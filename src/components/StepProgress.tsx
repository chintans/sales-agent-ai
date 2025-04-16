'use client';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const steps = [
    { title: 'Customer Details', description: 'Enter customer information' },
    { title: 'Sales Script', description: 'Generate sales script' },
    { title: 'Call & Transcript', description: 'Make call and view transcript' },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
                  ${index + 1 <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'}`}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-24 mx-4
                  ${index + 1 < currentStep 
                    ? 'bg-blue-600' 
                    : 'bg-gray-200'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 