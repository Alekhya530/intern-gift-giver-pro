
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Star, Calendar, Eye } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'inactive';
  contact: string;
  location: string;
  rating: number;
  joinDate: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              {vendor.name}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">{vendor.category}</p>
          </div>
          <Badge className={`${getStatusColor(vendor.status)} text-xs font-medium`}>
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-slate-600">
            <Mail className="w-4 h-4 mr-2 text-slate-400" />
            <span className="truncate">{vendor.contact}</span>
          </div>
          
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            <span>{vendor.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-slate-600">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
              <span>{vendor.rating}/5.0</span>
            </div>
            
            <div className="flex items-center text-sm text-slate-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(vendor.joinDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-slate-100">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
