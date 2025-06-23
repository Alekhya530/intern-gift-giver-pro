
export interface EventRequirements {
  eventType: string;
  budget: number;
  location: string;
  guestCount: number;
  date?: string;
  preferences?: string[];
}

export interface VendorRecommendation {
  vendor: any;
  score: number;
  reasoning: string[];
  estimatedCost: number;
  priority: 'high' | 'medium' | 'low';
}

export interface PlanningStep {
  id: string;
  task: string;
  timeline: string;
  priority: 'critical' | 'important' | 'optional';
  category: string;
  estimatedDuration: string;
}

export interface EventPlan {
  vendorRecommendations: VendorRecommendation[];
  planningSteps: PlanningStep[];
  budgetBreakdown: { category: string; allocation: number; percentage: number }[];
  timeline: { phase: string; timeframe: string; tasks: string[] }[];
  totalScore: number;
}

// Mock vendor database with enhanced data
const mockVendors = [
  {
    id: '1',
    name: 'Elite Catering Co.',
    category: 'Catering',
    specialties: ['corporate', 'wedding', 'formal'],
    priceRange: { min: 25, max: 150 },
    location: 'New York, NY',
    rating: 4.8,
    capacity: { min: 50, max: 500 },
    features: ['dietary-restrictions', 'premium-service', 'international-cuisine']
  },
  {
    id: '2',
    name: 'Sound & Light Pro',
    category: 'Audio/Visual',
    specialties: ['concert', 'corporate', 'wedding'],
    priceRange: { min: 500, max: 5000 },
    location: 'New York, NY',
    rating: 4.6,
    capacity: { min: 20, max: 1000 },
    features: ['live-streaming', 'LED-walls', 'wireless-mics']
  },
  {
    id: '3',
    name: 'Bloom & Blossom',
    category: 'Decorations',
    specialties: ['wedding', 'birthday', 'corporate'],
    priceRange: { min: 200, max: 3000 },
    location: 'California, CA',
    rating: 4.7,
    capacity: { min: 10, max: 300 },
    features: ['seasonal-flowers', 'custom-arrangements', 'eco-friendly']
  },
  {
    id: '4',
    name: 'Metro Event Spaces',
    category: 'Venue',
    specialties: ['corporate', 'conference', 'gala'],
    priceRange: { min: 1000, max: 8000 },
    location: 'New York, NY',
    rating: 4.5,
    capacity: { min: 100, max: 800 },
    features: ['parking', 'AV-equipped', 'catering-kitchen']
  },
  {
    id: '5',
    name: 'Capture Moments',
    category: 'Photography',
    specialties: ['wedding', 'corporate', 'portrait'],
    priceRange: { min: 800, max: 4000 },
    location: 'California, CA',
    rating: 4.9,
    capacity: { min: 1, max: 200 },
    features: ['drone-photography', 'same-day-editing', 'album-printing']
  },
  {
    id: '6',
    name: 'Smooth Moves DJ',
    category: 'Entertainment',
    specialties: ['wedding', 'birthday', 'corporate'],
    priceRange: { min: 300, max: 1500 },
    location: 'Texas, TX',
    rating: 4.4,
    capacity: { min: 20, max: 400 },
    features: ['karaoke', 'lighting', 'MC-services']
  }
];

// Event type planning templates
const eventTemplates = {
  wedding: {
    categories: ['Venue', 'Catering', 'Photography', 'Entertainment', 'Decorations'],
    budgetAllocation: { Venue: 0.4, Catering: 0.3, Photography: 0.15, Entertainment: 0.1, Decorations: 0.05 },
    timeline: [
      { phase: 'Planning Phase', timeframe: '6-12 months before', tasks: ['Book venue', 'Hire photographer', 'Plan catering'] },
      { phase: 'Preparation Phase', timeframe: '3-6 months before', tasks: ['Finalize decorations', 'Book entertainment', 'Confirm details'] },
      { phase: 'Final Phase', timeframe: '1 month before', tasks: ['Final headcount', 'Rehearsal', 'Day-of coordination'] }
    ]
  },
  corporate: {
    categories: ['Venue', 'Catering', 'Audio/Visual', 'Entertainment'],
    budgetAllocation: { Venue: 0.3, Catering: 0.4, 'Audio/Visual': 0.2, Entertainment: 0.1 },
    timeline: [
      { phase: 'Planning Phase', timeframe: '2-4 months before', tasks: ['Secure venue', 'Plan agenda', 'Book AV equipment'] },
      { phase: 'Preparation Phase', timeframe: '1-2 months before', tasks: ['Finalize catering', 'Prepare materials', 'Send invitations'] },
      { phase: 'Final Phase', timeframe: '1 week before', tasks: ['Confirm attendees', 'Setup rehearsal', 'Brief team'] }
    ]
  },
  birthday: {
    categories: ['Venue', 'Catering', 'Entertainment', 'Decorations'],
    budgetAllocation: { Venue: 0.25, Catering: 0.35, Entertainment: 0.25, Decorations: 0.15 },
    timeline: [
      { phase: 'Planning Phase', timeframe: '1-2 months before', tasks: ['Choose theme', 'Book venue', 'Plan activities'] },
      { phase: 'Preparation Phase', timeframe: '2-4 weeks before', tasks: ['Order decorations', 'Plan catering', 'Send invitations'] },
      { phase: 'Final Phase', timeframe: '1 week before', tasks: ['Confirm details', 'Prepare party favors', 'Setup timeline'] }
    ]
  }
};

// Advanced vendor scoring algorithm
export const calculateVendorScore = (vendor: any, requirements: EventRequirements): number => {
  let score = 0;
  const weights = {
    specialty: 30,
    budget: 25,
    location: 20,
    capacity: 15,
    rating: 10
  };

  // Specialty match scoring
  if (vendor.specialties.includes(requirements.eventType)) {
    score += weights.specialty;
  } else if (vendor.specialties.some((s: string) => s === 'corporate' && requirements.eventType !== 'corporate')) {
    score += weights.specialty * 0.5;
  }

  // Budget compatibility scoring
  const avgPrice = (vendor.priceRange.min + vendor.priceRange.max) / 2;
  const budgetPerCategory = requirements.budget / 4; // Assuming 4 main categories
  const budgetFit = Math.max(0, 1 - Math.abs(avgPrice - budgetPerCategory) / budgetPerCategory);
  score += weights.budget * budgetFit;

  // Location scoring (same state gets full points)
  const vendorState = vendor.location.split(', ')[1];
  const requirementState = requirements.location.split(', ')[1] || requirements.location;
  if (vendorState === requirementState) {
    score += weights.location;
  } else {
    score += weights.location * 0.3; // Reduced score for different states
  }

  // Capacity scoring
  if (requirements.guestCount >= vendor.capacity.min && requirements.guestCount <= vendor.capacity.max) {
    score += weights.capacity;
  } else if (requirements.guestCount < vendor.capacity.min) {
    score += weights.capacity * 0.7; // Can handle smaller events
  } else {
    score += weights.capacity * 0.3; // Over capacity but might work
  }

  // Rating scoring
  score += weights.rating * (vendor.rating / 5);

  return Math.min(100, score);
};

// Generate reasoning for recommendations
const generateReasoning = (vendor: any, requirements: EventRequirements, score: number): string[] => {
  const reasons = [];
  
  if (vendor.specialties.includes(requirements.eventType)) {
    reasons.push(`Specializes in ${requirements.eventType} events`);
  }
  
  if (vendor.rating >= 4.5) {
    reasons.push(`Excellent rating of ${vendor.rating}/5.0`);
  }
  
  const vendorState = vendor.location.split(', ')[1];
  const requirementState = requirements.location.split(', ')[1] || requirements.location;
  if (vendorState === requirementState) {
    reasons.push(`Local to your area (${vendor.location})`);
  }
  
  if (requirements.guestCount >= vendor.capacity.min && requirements.guestCount <= vendor.capacity.max) {
    reasons.push(`Perfect capacity match for ${requirements.guestCount} guests`);
  }
  
  if (score >= 80) {
    reasons.push(`High compatibility score (${Math.round(score)}%)`);
  }
  
  return reasons;
};

// Generate planning steps based on event type and requirements
const generatePlanningSteps = (requirements: EventRequirements): PlanningStep[] => {
  const template = eventTemplates[requirements.eventType as keyof typeof eventTemplates] || eventTemplates.corporate;
  const steps: PlanningStep[] = [];
  
  // Dynamic step generation based on timeline
  template.timeline.forEach((phase, phaseIndex) => {
    phase.tasks.forEach((task, taskIndex) => {
      steps.push({
        id: `${phaseIndex}-${taskIndex}`,
        task,
        timeline: phase.timeframe,
        priority: phaseIndex === 0 ? 'critical' : phaseIndex === 1 ? 'important' : 'optional',
        category: phase.phase,
        estimatedDuration: phaseIndex === 0 ? '2-3 weeks' : phaseIndex === 1 ? '1-2 weeks' : '3-5 days'
      });
    });
  });
  
  // Add budget-specific steps
  if (requirements.budget < 5000) {
    steps.push({
      id: 'budget-1',
      task: 'Consider DIY options for decorations to save costs',
      timeline: '1-2 months before',
      priority: 'important',
      category: 'Budget Optimization',
      estimatedDuration: '1 week'
    });
  }
  
  return steps;
};

// Main AI recommendation engine
export const generateEventPlan = (requirements: EventRequirements): EventPlan => {
  console.log('Generating event plan for:', requirements);
  
  // Get relevant vendors and calculate scores
  const vendorRecommendations: VendorRecommendation[] = mockVendors
    .map(vendor => {
      const score = calculateVendorScore(vendor, requirements);
      const reasoning = generateReasoning(vendor, requirements, score);
      const template = eventTemplates[requirements.eventType as keyof typeof eventTemplates] || eventTemplates.corporate;
      const categoryBudget = (template.budgetAllocation[vendor.category] || 0.1) * requirements.budget;
      
      return {
        vendor,
        score,
        reasoning,
        estimatedCost: Math.min(categoryBudget, (vendor.priceRange.min + vendor.priceRange.max) / 2),
        priority: score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low'
      };
    })
    .filter(rec => rec.score > 30) // Filter out very low scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 8); // Top 8 recommendations

  // Generate planning steps
  const planningSteps = generatePlanningSteps(requirements);
  
  // Create budget breakdown
  const template = eventTemplates[requirements.eventType as keyof typeof eventTemplates] || eventTemplates.corporate;
  const budgetBreakdown = Object.entries(template.budgetAllocation).map(([category, percentage]) => ({
    category,
    allocation: requirements.budget * percentage,
    percentage: percentage * 100
  }));
  
  const totalScore = vendorRecommendations.reduce((sum, rec) => sum + rec.score, 0) / vendorRecommendations.length;
  
  return {
    vendorRecommendations,
    planningSteps,
    budgetBreakdown,
    timeline: template.timeline,
    totalScore
  };
};
