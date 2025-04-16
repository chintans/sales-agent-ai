'use client';

import { useState } from 'react';
import { countryCodes } from '@/data/countryCodes';

interface CustomerFormProps {
  onSubmit: (data: any) => void;
  onNext: () => void;
}

export function CustomerForm({ onSubmit, onNext }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    conversationHistory: '',
    topics: '',
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (code: string, number: string) => {
    // For India, validate 10 digits
    if (code === '+91') {
      return /^[0-9]{10}$/.test(number);
    }
    // For other countries, just check if it's not empty
    return number.length > 0;
  };

  const validateEmail = (email: string) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(selectedCountryCode, phoneNumber)) {
      newErrors.phone = selectedCountryCode === '+91' 
        ? 'Please enter a valid 10-digit phone number' 
        : 'Please enter a valid phone number';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.topics) {
      newErrors.topics = 'Topics to discuss are required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...formData,
        phone: selectedCountryCode + phoneNumber
      });
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setPhoneNumber(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Information</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-800">
          Customer Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
          Phone Number
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <select
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
            className="flex-shrink-0 rounded-l-md border border-gray-300 bg-gray-50 py-2 pl-3 pr-8 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder={selectedCountryCode === '+91' ? '9876543210' : 'Enter phone number'}
            className="block w-full rounded-r-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800">
          Email (Optional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="conversationHistory" className="block text-sm font-medium text-gray-800">
          Conversation History
        </label>
        <textarea
          id="conversationHistory"
          name="conversationHistory"
          value={formData.conversationHistory}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800"
        />
      </div>

      <div>
        <label htmlFor="topics" className="block text-sm font-medium text-gray-800">
          Topics to Discuss
        </label>
        <textarea
          id="topics"
          name="topics"
          value={formData.topics}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800"
        />
        {errors.topics && <p className="mt-1 text-sm text-red-600">{errors.topics}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next: Generate Script
        </button>
      </div>
    </form>
  );
} 