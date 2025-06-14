import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  MapPin, Calendar, Users, Star, TrendingUp, Plane, Monitor, Brain, Shield, Globe, 
  Clock, Zap, BarChart3, Camera, Navigation, Settings, DollarSign, 
  CloudRain, Database, Cpu, Network, Lock, Radio, Satellite, 
  FileText, MessageSquare, Video, Music, Book, Coffee, ShoppingBag, Car, Train, 
  Ship, Activity, Leaf, Plus, Play, Pause, RefreshCw, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { apiRequest } from '@/lib/queryClient';

interface FeatureModulesProps {
  selectedFeature: string;
  onBack: () => void;
}

const FeatureModules = ({ selectedFeature, onBack }: FeatureModulesProps) => {
  const queryClient = useQueryClient();

  // Fetch real-time data
  const { data: drones } = useQuery({
    queryKey: ['/api/drones'],
    refetchInterval: 5000
  });

  const { data: vrSessions } = useQuery({
    queryKey: ['/api/vr-sessions'],
    refetchInterval: 3000
  });

  const { data: insights } = useQuery({
    queryKey: ['/api/insights'],
    refetchInterval: 10000
  });

  const { data: bookings } = useQuery({
    queryKey: ['/api/bookings']
  });

  const { data: weather } = useQuery({
    queryKey: ['/api/weather/Bucharest'],
    refetchInterval: 30000
  });

  // Mutations for creating new resources
  const createBookingMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/bookings', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    }
  });

  const createVRSessionMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/vr-sessions', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vr-sessions'] });
    }
  });

  const updateDroneStatusMutation = useMutation({
    mutationFn: ({ droneId, status, location }: any) => 
      apiRequest(`/api/drones/${droneId}/status`, { method: 'PATCH', body: { status, location } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/drones'] });
    }
  });

  const renderPredictiveAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Predictive Analytics Dashboard</h2>
        <Button onClick={onBack} variant="outline">Back to Dashboard</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Tourism Demand Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">Peak Season Prediction</h4>
                <p className="text-sm text-blue-600 mt-2">Summer 2025: 340% increase expected</p>
                <p className="text-sm text-blue-600">Optimal capacity: 15,000 daily visitors</p>
                <Progress value={85} className="mt-2" />
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Revenue Optimization</h4>
                <p className="text-sm text-green-600 mt-2">Dynamic pricing active</p>
                <p className="text-sm text-green-600">Projected revenue: +28% this quarter</p>
                <Progress value={72} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-purple-600" />
              Climate & Weather Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Current Conditions</span>
                <Badge variant="secondary">{weather?.condition || 'Sunny'} {weather?.temperature || 24}°C</Badge>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• Real-time weather impact analysis</p>
                <p>• Adaptive tour recommendations</p>
                <p>• Climate change mitigation strategies</p>
                <p>• Sustainable tourism load balancing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights?.map((insight: any, index: number) => (
              <div key={insight.id || index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'}>
                    {insight.priority}
                  </Badge>
                  <span className="text-xs text-gray-500">{Math.round(insight.confidence * 100)}% confidence</span>
                </div>
                <p className="text-sm text-gray-800">{insight.content}</p>
                <p className="text-xs text-gray-500 mt-2">Generated: {new Date(insight.generatedAt).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDroneManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Autonomous Drone Fleet Management</h2>
        <Button onClick={onBack} variant="outline">Back to Dashboard</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-purple-600" />
              Active Drone Fleet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drones?.map((drone: any) => (
                <div key={drone.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{drone.droneId}</span>
                    <Badge variant={drone.status === 'active' ? 'default' : 'secondary'}>
                      {drone.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Battery:</span>
                      <span>{drone.batteryLevel}%</span>
                    </div>
                    <Progress value={drone.batteryLevel} className="h-2" />
                    {drone.tourRoute && (
                      <div className="flex items-center justify-between">
                        <span>Route:</span>
                        <span className="text-blue-600">{drone.tourRoute}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateDroneStatusMutation.mutate({
                        droneId: drone.droneId,
                        status: drone.status === 'active' ? 'available' : 'active'
                      })}
                    >
                      {drone.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fleet Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{drones?.filter((d: any) => d.status === 'active').length || 0}</p>
                <p className="text-sm text-purple-600">Active Tours</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{drones?.length || 24}</p>
                <p className="text-sm text-green-600">Total Fleet</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">97.2%</p>
                <p className="text-sm text-blue-600">Efficiency Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Drone Tour Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Aerial Photography</h4>
              <p className="text-sm text-gray-600">4K HDR capture with AI enhancement</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">AI Commentary</h4>
              <p className="text-sm text-gray-600">Real-time narration in 67 languages</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h4 className="font-semibold">Safety Systems</h4>
              <p className="text-sm text-gray-600">Advanced collision avoidance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVRExperiences = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">VR/AR Tourism Experiences</h2>
        <Button onClick={onBack} variant="outline">Back to Dashboard</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-600" />
              Active VR Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-indigo-600">{vrSessions?.length || 0}</p>
              <p className="text-gray-600">Concurrent experiences running</p>
            </div>
            <div className="space-y-3">
              {vrSessions?.slice(0, 5).map((session: any) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div>
                    <p className="font-medium text-indigo-800">{session.experienceType}</p>
                    <p className="text-sm text-indigo-600">User {session.userId} • {session.duration}min</p>
                  </div>
                  <Badge variant="secondary">{session.quality}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <p className="text-xl font-bold text-purple-600">12</p>
                <p className="text-sm text-purple-600">Heritage Tours</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-600">Nature Walks</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-xl font-bold text-blue-600">9</p>
                <p className="text-sm text-blue-600">City Tours</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <p className="text-xl font-bold text-orange-600">5</p>
                <p className="text-sm text-orange-600">Food Tours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New VR Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Experience Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heritage">Danube Heritage Tour</SelectItem>
                  <SelectItem value="wildlife">Wildlife Safari</SelectItem>
                  <SelectItem value="historical">Historical Castles</SelectItem>
                  <SelectItem value="cultural">Cultural Village</SelectItem>
                  <SelectItem value="nature">Nature Walk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
              <Input type="number" placeholder="30" min="15" max="120" />
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full"
                onClick={() => {
                  createVRSessionMutation.mutate({
                    sessionId: `VR-${Date.now()}`,
                    experienceType: 'Danube Heritage Tour',
                    userId: Math.floor(Math.random() * 1000) + 1,
                    duration: 30,
                    quality: '4K'
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSmartBooking = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Smart Booking System</h2>
        <Button onClick={onBack} variant="outline">Back to Dashboard</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tour Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tour type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vr-heritage">VR Heritage Experience</SelectItem>
                    <SelectItem value="drone-tour">Drone Aerial Tour</SelectItem>
                    <SelectItem value="cultural-walk">Cultural Walking Tour</SelectItem>
                    <SelectItem value="river-cruise">Danube River Cruise</SelectItem>
                    <SelectItem value="combo-package">Complete Experience Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Participants</label>
                  <Input type="number" placeholder="2" min="1" max="20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Special Preferences</label>
                <Textarea placeholder="Accessibility needs, language preferences, dietary restrictions..." />
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  createBookingMutation.mutate({
                    userId: Math.floor(Math.random() * 1000) + 1,
                    tourType: 'VR Heritage Experience',
                    date: new Date().toISOString(),
                    participants: 2,
                    price: 89.99,
                    preferences: { language: 'English' }
                  });
                }}
              >
                Create Booking
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings?.slice(0, 5).map((booking: any) => (
                <div key={booking.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{booking.tourType}</span>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Participants: {booking.participants}</p>
                    <p>Price: ${booking.price}</p>
                    <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderQuantumSecurity = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quantum Security Framework</h2>
        <Button onClick={onBack} variant="outline">Back to Dashboard</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">All Systems Secure</h4>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <p>• Zero-trust architecture active</p>
                  <p>• Quantum encryption enabled</p>
                  <p>• AI threat detection operational</p>
                  <p>• Secure authentication verified</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">0</p>
                  <p className="text-sm text-blue-600">Active Threats</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-xl font-bold text-purple-600">0.003ms</p>
                  <p className="text-sm text-purple-600">Response Time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-6 h-6 text-red-600" />
                  <h4 className="font-semibold">Quantum Encryption</h4>
                </div>
                <p className="text-sm text-gray-600">Post-quantum cryptography protects all data transmission</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold">AI Threat Detection</h4>
                </div>
                <p className="text-sm text-gray-600">Real-time monitoring with machine learning analysis</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Network className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold">Secure Authentication</h4>
                </div>
                <p className="text-sm text-gray-600">Multi-factor authentication for secure access</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Feature routing
  const renderFeature = () => {
    switch (selectedFeature) {
      case 'predictive':
        return renderPredictiveAnalytics();
      case 'drones':
        return renderDroneManagement();
      case 'vr':
        return renderVRExperiences();
      case 'booking':
        return renderSmartBooking();
      case 'security':
        return renderQuantumSecurity();
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Feature Module</h2>
            <p className="text-gray-600 mb-4">Feature "{selectedFeature}" is under development</p>
            <Button onClick={onBack}>Back to Dashboard</Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      {renderFeature()}
    </div>
  );
};

export default FeatureModules;