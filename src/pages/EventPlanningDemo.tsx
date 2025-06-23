
import React, { useState } from 'react';
import EventPlanningForm from '@/components/EventPlanningForm';
import EventPlanResults from '@/components/EventPlanResults';
import { generateEventPlan, EventRequirements, EventPlan } from '@/utils/eventPlanningAI';
import { Sparkles, Brain, Target, Users } from 'lucide-react';

const EventPlanningDemo = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'results'>('form');
  const [eventPlan, setEventPlan] = useState<EventPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (requirements: EventRequirements) => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const plan = generateEventPlan(requirements);
    setEventPlan(plan);
    setCurrentStep('results');
    setIsLoading(false);
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setEventPlan(null);
  };

  if (currentStep === 'results' && eventPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <EventPlanResults eventPlan={eventPlan} onBack={handleBackToForm} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Event Planning AI
          </h1>
          
          <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
            Intelligent vendor recommendations and automated event planning powered by advanced AI algorithms
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Smart Matching</h3>
              <p className="text-sm text-slate-600">
                Multi-criteria vendor scoring based on specialty, budget, location, and capacity
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">AI Planning</h3>
              <p className="text-sm text-slate-600">
                Automated timeline generation and budget allocation for different event types
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Personalized</h3>
              <p className="text-sm text-slate-600">
                Tailored recommendations based on your specific requirements and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <EventPlanningForm onSubmit={handleFormSubmit} isLoading={isLoading} />

        {/* Demo Info */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border-0 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">🎯 UtsavAi Internship Demo</h2>
          <p className="text-slate-600 mb-3">
            This AI model demonstrates intelligent event planning using:
          </p>
          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li><strong>Mock Vendor Database:</strong> 6 realistic vendors with detailed attributes</li>
            <li><strong>Multi-Factor Scoring:</strong> Specialty match, budget compatibility, location, capacity, and ratings</li>
            <li><strong>Event Templates:</strong> Different planning approaches for weddings, corporate events, and birthdays</li>
            <li><strong>Dynamic Budget Allocation:</strong> Context-aware budget distribution across categories</li>
            <li><strong>Timeline Generation:</strong> Automated planning phases with priority-based task scheduling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventPlanningDemo;
