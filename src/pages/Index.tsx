
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, TrendingUp, Search, Plus, Filter } from 'lucide-react';
import VendorRegistrationForm from '@/components/VendorRegistrationForm';
import VendorCard from '@/components/VendorCard';

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

const Index = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample vendor data
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'TechSolutions Inc.',
      category: 'IT Services',
      status: 'active',
      contact: 'contact@techsolutions.com',
      location: 'New York, NY',
      rating: 4.8,
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Green Supply Co.',
      category: 'Manufacturing',
      status: 'active',
      contact: 'info@greensupply.com',
      location: 'California, CA',
      rating: 4.5,
      joinDate: '2023-03-22'
    },
    {
      id: '3',
      name: 'Digital Marketing Pro',
      category: 'Marketing',
      status: 'pending',
      contact: 'hello@digitalmarketing.com',
      location: 'Texas, TX',
      rating: 4.2,
      joinDate: '2024-01-08'
    }
  ]);

  const categories = ['all', 'IT Services', 'Manufacturing', 'Marketing', 'Logistics', 'Finance'];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalVendors: vendors.length,
    activeVendors: vendors.filter(v => v.status === 'active').length,
    pendingVendors: vendors.filter(v => v.status === 'pending').length,
    avgRating: (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1)
  };

  const handleVendorRegistration = (newVendor: Omit<Vendor, 'id' | 'joinDate'>) => {
    const vendor: Vendor = {
      ...newVendor,
      id: (vendors.length + 1).toString(),
      joinDate: new Date().toISOString().split('T')[0]
    };
    setVendors([...vendors, vendor]);
    setShowRegistrationForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  VendorNG
                </h1>
                <p className="text-sm text-slate-500">Vendor Management System</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowRegistrationForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Vendors</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stats.totalVendors}</div>
              <p className="text-xs text-slate-500">Registered vendors</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Vendors</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stats.activeVendors}</div>
              <p className="text-xs text-slate-500">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Approval</CardTitle>
              <Filter className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stats.pendingVendors}</div>
              <p className="text-xs text-slate-500">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stats.avgRating}</div>
              <p className="text-xs text-slate-500">Out of 5.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-slate-800">Vendor Directory</CardTitle>
            <CardDescription>Search and filter registered vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No vendors found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistrationForm && (
        <VendorRegistrationForm
          onClose={() => setShowRegistrationForm(false)}
          onSubmit={handleVendorRegistration}
        />
      )}
    </div>
  );
};

export default Index;
