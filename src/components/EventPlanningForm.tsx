
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, DollarSign, MapPin, Users, Sparkles } from 'lucide-react';
import { EventRequirements } from '@/utils/eventPlanningAI';

interface EventPlanningFormProps {
  onSubmit: (requirements: EventRequirements) => void;
  isLoading?: boolean;
}

const EventPlanningForm = ({ onSubmit, isLoading }: EventPlanningFormProps) => {
  const [requirements, setRequirements] = useState<EventRequirements>({
    eventType: '',
    budget: 5000,
    location: '',
    guestCount: 50,
    date: '',
    preferences: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requirements.eventType && requirements.location) {
      onSubmit(requirements);
    }
  };

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'conference', label: 'Conference' },
    { value: 'gala', label: 'Gala/Fundraiser' }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Event Planning AI Assistant
        </CardTitle>
        <p className="text-slate-600">Tell us about your event and get personalized vendor recommendations</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-slate-700 font-medium">Event Type</Label>
              <Select value={requirements.eventType} onValueChange={(value) => 
                setRequirements(prev => ({ ...prev, eventType: value }))
              }>
                <SelectTrigger className="border-slate-200 focus:border-purple-500">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-700 font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={requirements.location}
                onChange={(e) => setRequirements(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
                className="border-slate-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-slate-700 font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Budget
              </Label>
              <Input
                id="budget"
                type="number"
                value={requirements.budget}
                onChange={(e) => setRequirements(prev => ({ ...prev, budget: Number(e.target.value) }))}
                placeholder="5000"
                className="border-slate-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestCount" className="text-slate-700 font-medium flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Guest Count
              </Label>
              <Input
                id="guestCount"
                type="number"
                value={requirements.guestCount}
                onChange={(e) => setRequirements(prev => ({ ...prev, guestCount: Number(e.target.value) }))}
                placeholder="50"
                className="border-slate-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-slate-700 font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Event Date (Optional)
              </Label>
              <Input
                id="date"
                type="date"
                value={requirements.date}
                onChange={(e) => setRequirements(prev => ({ ...prev, date: e.target.value }))}
                className="border-slate-200 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences" className="text-slate-700 font-medium">
              Special Preferences (Optional)
            </Label>
            <Textarea
              id="preferences"
              placeholder="Any special requirements, themes, or preferences..."
              className="border-slate-200 focus:border-purple-500 min-h-[80px]"
              onChange={(e) => setRequirements(prev => ({ 
                ...prev, 
                preferences: e.target.value.split(',').map(p => p.trim()).filter(Boolean)
              }))}
            />
          </div>

          <Button 
            type="submit" 
            disabled={!requirements.eventType || !requirements.location || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Recommendations...
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventPlanningForm;
