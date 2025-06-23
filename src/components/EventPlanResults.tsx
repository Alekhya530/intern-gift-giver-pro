
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';
import { EventPlan, VendorRecommendation } from '@/utils/eventPlanningAI';

interface EventPlanResultsProps {
  eventPlan: EventPlan;
  onBack: () => void;
}

const EventPlanResults = ({ eventPlan, onBack }: EventPlanResultsProps) => {
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'important': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'optional': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Event Planning Results
          </h1>
          <p className="text-slate-600 mt-2">
            Based on your requirements, here's your personalized event plan
          </p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{Math.round(eventPlan.totalScore)}%</div>
          <div className="text-sm text-slate-500">Match Score</div>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium text-purple-800">Overall Compatibility</span>
            </div>
            <span className="text-purple-600 font-semibold">{Math.round(eventPlan.totalScore)}%</span>
          </div>
          <Progress value={eventPlan.totalScore} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Recommended Vendors
          </h2>
          
          <div className="space-y-3">
            {eventPlan.vendorRecommendations.slice(0, 6).map((rec: VendorRecommendation, index) => (
              <Card key={rec.vendor.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-800">{rec.vendor.name}</h3>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{rec.vendor.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">{Math.round(rec.score)}%</div>
                      <div className="text-xs text-slate-500">match</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {rec.vendor.location}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {rec.vendor.rating}/5.0
                    </div>
                    <div className="flex items-center text-slate-600">
                      <DollarSign className="w-3 h-3 mr-1" />
                      ${rec.estimatedCost.toLocaleString()}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-3 h-3 mr-1" />
                      {rec.vendor.capacity.min}-{rec.vendor.capacity.max}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Progress value={rec.score} className="h-1" />
                  </div>
                  
                  <div className="space-y-1">
                    {rec.reasoning.slice(0, 2).map((reason, idx) => (
                      <div key={idx} className="text-xs text-slate-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        {reason}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Planning Steps & Budget */}
        <div className="space-y-6">
          {/* Planning Steps */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center mb-4">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Planning Timeline
            </h2>
            
            <div className="space-y-3">
              {eventPlan.planningSteps.slice(0, 6).map((step, index) => (
                <Card key={step.id} className="bg-white/60 border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {getPriorityIcon(step.priority)}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-slate-800 mb-1">
                          {step.task}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.timeline}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {step.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Budget Breakdown */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center mb-4">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Budget Allocation
            </h2>
            
            <Card className="bg-white/60 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {eventPlan.budgetBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                            style={{width: `${item.percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-800 w-16 text-right">
                          ${item.allocation.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline Overview */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Event Timeline</h2>
            <div className="space-y-2">
              {eventPlan.timeline.map((phase, index) => (
                <Card key={index} className="bg-white/40 border-0 shadow-sm">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-slate-800 text-sm">{phase.phase}</h4>
                    <p className="text-xs text-slate-600">{phase.timeframe}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {phase.tasks.slice(0, 2).join(', ')}
                      {phase.tasks.length > 2 && '...'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-slate-200">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Plan Another Event
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Export Plan
        </Button>
      </div>
    </div>
  );
};

export default EventPlanResults;
