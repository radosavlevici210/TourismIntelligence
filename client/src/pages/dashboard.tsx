import { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Star, TrendingUp, Plane, Monitor, Brain, Shield, Globe, 
  Clock, Copyright, Zap, BarChart3, Camera, Wifi, Navigation, Settings, DollarSign, 
  CloudRain, Smartphone, Database, Cpu, Network, Lock, UserCheck, Radio, Satellite, 
  FileText, MessageSquare, Video, Music, Book, Coffee, ShoppingBag, Car, Train, 
  Ship, Activity, Leaf, ShieldCheck
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedFeature, setSelectedFeature] = useState('dashboard');
  const [aiInsights, setAiInsights] = useState([]);
  const [tourismData, setTourismData] = useState({
    activeVisitors: 2847,
    predictedDemand: 3921,
    droneToursActive: 12,
    vrExperiencesRunning: 34,
    satisfactionScore: 4.8,
    revenue: 125847,
    bookingsToday: 89,
    averageStay: 3.2,
    weatherCondition: 'Sunny',
    temperature: 24,
    aiRecommendations: 156,
    securityThreats: 0,
    systemUptime: 99.98,
    quantumSecurityLevel: 'Maximum',
    totalUsers: 15847,
    conversionRate: 68.4,
    avgResponseTime: 0.245,
    dataProcessed: 2.8,
    aiAccuracy: 94.7,
    customerSatisfaction: 96.2,
    energyEfficiency: 87.5,
    carbonFootprint: 12.3,
    languagesSupported: 67,
    countriesServed: 89,
    partnersConnected: 234,
    apiCalls: 1547892
  });

  const [activityFeed, setActivityFeed] = useState([
    {
      id: 1,
      type: 'booking',
      message: 'New VR session started: "Danube Delta Wildlife Tour"',
      time: '2 minutes ago',
      color: 'blue'
    },
    {
      id: 2,
      type: 'drone',
      message: 'Drone tour completed successfully - 5⭐ rating',
      time: '5 minutes ago',
      color: 'green'
    },
    {
      id: 3,
      type: 'ai',
      message: 'AI prediction updated: +15% visitors expected tomorrow',
      time: '8 minutes ago',
      color: 'purple'
    },
    {
      id: 4,
      type: 'weather',
      message: 'Weather alert: Perfect conditions for outdoor tours',
      time: '12 minutes ago',
      color: 'yellow'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // AI insights rotation
    const insights = [
      "Peak tourism demand predicted for next weekend (+23%)",
      "VR experience 'Danube Heritage' trending (+45% engagement)",
      "Autonomous drone route optimization completed",
      "Weather-based tour recommendations updated",
      "Predictive maintenance alert: Drone fleet maintenance due",
      "Revenue optimization: Dynamic pricing increased bookings by 12%",
      "AI recommendation engine achieved 84% acceptance rate",
      "Quantum security framework blocked 127 threats today",
      "Smart booking system reduced wait times to 2.1 seconds",
      "Weather integration improved tour satisfaction by 18%",
      "Multi-language AI translator processed 5,847 requests",
      "Blockchain payment system verified 234 transactions",
      "Carbon footprint reduced by 15% through route optimization",
      "Customer sentiment analysis shows 96.2% satisfaction",
      "Real-time crowd management prevented overcrowding at 12 sites",
      "Emergency response system tested successfully - 0.8s response time"
    ];

    const insightsTimer = setInterval(() => {
      setAiInsights([insights[Math.floor(Math.random() * insights.length)]]);
    }, 4000);

    // Simulate real-time data updates
    const dataTimer = setInterval(() => {
      setTourismData(prev => ({
        ...prev,
        activeVisitors: prev.activeVisitors + Math.floor(Math.random() * 10 - 5),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 100)
      }));
    }, 6000);

    // Activity feed updates
    const activityTimer = setInterval(() => {
      const newActivities = [
        { type: 'booking', message: 'New booking: Premium Danube Cruise for 4 guests', color: 'green' },
        { type: 'drone', message: 'Drone maintenance completed - Fleet at 100% capacity', color: 'blue' },
        { type: 'ai', message: 'AI model updated with latest tourism patterns', color: 'purple' },
        { type: 'security', message: 'Security scan completed - No threats detected', color: 'red' },
        { type: 'weather', message: 'Weather forecast updated - Clear skies for next 48 hours', color: 'yellow' }
      ];
      
      const newActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      setActivityFeed(prev => [
        {
          id: Date.now(),
          ...newActivity,
          time: 'Just now'
        },
        ...prev.slice(0, 5)
      ]);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(insightsTimer);
      clearInterval(dataTimer);
      clearInterval(activityTimer);
    };
  }, []);

  const features = [
    { id: 'predictive', name: 'Predictive Analytics', icon: TrendingUp, color: 'blue' },
    { id: 'assistant', name: 'Travel Assistant', icon: Users, color: 'green' },
    { id: 'drones', name: 'Drone Tours', icon: Plane, color: 'purple' },
    { id: 'vr', name: 'VR/AR Experiences', icon: Monitor, color: 'indigo' },
    { id: 'security', name: 'Quantum Security', icon: Shield, color: 'red' },
    { id: 'revenue', name: 'Revenue Management', icon: BarChart3, color: 'emerald' },
    { id: 'weather', name: 'Weather Integration', icon: Zap, color: 'yellow' },
    { id: 'booking', name: 'Smart Booking', icon: Calendar, color: 'cyan' },
    { id: 'communication', name: 'Communication Hub', icon: MessageSquare, color: 'pink' },
    { id: 'transport', name: 'Transport Systems', icon: Car, color: 'orange' },
    { id: 'sustainability', name: 'Sustainability', icon: Globe, color: 'teal' },
    { id: 'analytics', name: 'Advanced Analytics', icon: Activity, color: 'violet' }
  ];

  const selectFeature = (featureId: string) => {
    setSelectedFeature(featureId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="tourism-gradient p-2 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Perla Dunării AI</h1>
                <p className="text-sm text-gray-600">Tourism Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
                Live
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Copyright Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Copyright className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800 font-medium">© 2025 Ervin Remus Radosavlevici - All Rights Reserved</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span className="text-purple-800">Quantum Security: Maximum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          
          {/* Active Visitors */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Visitors</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 counter-animation">{tourismData.activeVisitors.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">Real-time visitor tracking</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Peak: 10AM-2PM</span>
              <span className="text-green-600 font-medium">+12%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full w-3/4 transition-all duration-500"></div>
            </div>
          </div>

          {/* Predicted Demand */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Predicted Demand</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 counter-animation">{tourismData.predictedDemand.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">Next 7 days forecast</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Confidence: 94.7%</span>
              <span className="text-green-600 font-medium">↗ +23%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-600 h-1.5 rounded-full w-4/5 transition-all duration-500"></div>
            </div>
          </div>

          {/* Daily Revenue */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Daily Revenue</h3>
              <div className="bg-emerald-100 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-emerald-600 counter-animation">${tourismData.revenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">+18% from yesterday</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Target: $150K</span>
              <span className="text-emerald-600 font-medium">84% Progress</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-emerald-600 h-1.5 rounded-full w-5/6 transition-all duration-500"></div>
            </div>
          </div>

          {/* Satisfaction Score */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Satisfaction Score</h3>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-yellow-600 counter-animation">{tourismData.satisfactionScore}/5.0</p>
            <p className="text-sm text-gray-600 mt-2">AI-analyzed feedback</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Reviews: 2,847</span>
              <span className="text-yellow-600 font-medium">NPS: +67</span>
            </div>
            <div className="flex mt-2 space-x-1">
              <div className="w-4 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-1.5 bg-yellow-200 rounded-full"></div>
            </div>
          </div>

          {/* Drone Fleet Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Drone Fleet</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Plane className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600 counter-animation">{tourismData.droneToursActive}</p>
            <p className="text-sm text-gray-600 mt-2">Active autonomous tours</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Fleet: 24 units</span>
              <span className="text-purple-600 font-medium">97.2% Efficiency</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">All systems operational</span>
            </div>
          </div>

          {/* VR/AR Sessions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">VR/AR Sessions</h3>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Monitor className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-indigo-600 counter-animation">{tourismData.vrExperiencesRunning}</p>
            <p className="text-sm text-gray-600 mt-2">Immersive experiences active</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Avg: 45min</span>
              <span className="text-indigo-600 font-medium">4K HDR Quality</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p>Most popular: "Danube Heritage Tour"</p>
            </div>
          </div>

          {/* System Performance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">System Performance</h3>
              <div className="bg-cyan-100 p-2 rounded-lg">
                <Cpu className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-cyan-600 counter-animation">{tourismData.systemUptime}%</p>
            <p className="text-sm text-gray-600 mt-2">Uptime - All systems operational</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Response: {tourismData.avgResponseTime}s</span>
              <span className="text-cyan-600 font-medium">Load: 67%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-cyan-600 h-1.5 rounded-full w-2/3 transition-all duration-500"></div>
            </div>
          </div>

          {/* Global Reach */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 card-hover border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Global Reach</h3>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-orange-600 counter-animation">{tourismData.countriesServed}</p>
            <p className="text-sm text-gray-600 mt-2">Countries served worldwide</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Languages: {tourismData.languagesSupported}</span>
              <span className="text-orange-600 font-medium">Partners: {tourismData.partnersConnected}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p>Active in 6 continents</p>
            </div>
          </div>

        </div>

        {/* AI Insights Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">AI Insights & Real-Time Intelligence</h3>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Analysis</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
                  <p className="font-medium text-blue-800">{insight}</p>
                  <p className="text-xs text-blue-600 mt-1">Generated: {currentTime.toLocaleTimeString()}</p>
                </div>
              ))}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-blue-800 text-sm">Weather Integration</p>
                  <p className="text-blue-600 text-xs mt-1">{tourismData.temperature}°C {tourismData.weatherCondition}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-800 text-sm">Smart Booking</p>
                  <p className="text-green-600 text-xs mt-1">{tourismData.bookingsToday} bookings today</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <Cpu className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-green-800">AI Accuracy</p>
                <p className="text-green-600 text-xl font-bold">{tourismData.aiAccuracy}%</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-800">Data Processed</p>
                <p className="text-blue-600 text-xl font-bold">{tourismData.dataProcessed}TB</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <Network className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-purple-800">API Calls</p>
                <p className="text-purple-600 text-xl font-bold">{tourismData.apiCalls.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-semibold text-orange-800">Security Level</p>
                <p className="text-orange-600 text-sm font-bold">{tourismData.quantumSecurityLevel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Platform Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.id}
                  className={`p-4 bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-lg text-center card-hover cursor-pointer`}
                  onClick={() => selectFeature(feature.id)}
                >
                  <IconComponent className={`w-8 h-8 text-${feature.color}-600 mx-auto mb-2`} />
                  <p className={`font-medium text-${feature.color}-800 text-sm`}>{feature.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sustainability & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Sustainability Dashboard */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Sustainability Metrics</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Energy Efficiency</span>
                <span className="text-sm font-medium text-green-600">{tourismData.energyEfficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-4/5 transition-all duration-500"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Carbon Footprint</span>
                <span className="text-sm font-medium text-blue-600">{tourismData.carbonFootprint} tons CO₂</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-1/4 transition-all duration-500"></div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Carbon Neutral Goal: 2025</p>
                <p className="text-xs text-green-600 mt-1">15% reduction achieved through route optimization</p>
              </div>
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance Analytics</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{tourismData.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{tourismData.conversionRate}%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{tourismData.customerSatisfaction}%</p>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{tourismData.averageStay} days</p>
                <p className="text-sm text-gray-600">Average Stay</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800 font-medium">System Status: Optimal</p>
              <p className="text-xs text-purple-600 mt-1">All AI modules functioning at maximum efficiency</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Real-Time Activity Feed</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {activityFeed.map((activity) => (
              <div key={activity.id} className={`flex items-center space-x-3 p-3 bg-${activity.color}-50 rounded-lg`}>
                <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}></div>
                <div className="flex-1">
                  <p className={`text-sm font-medium text-${activity.color}-800`}>{activity.message}</p>
                  <p className={`text-xs text-${activity.color}-600`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="tourism-gradient p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Perla Dunării AI</h3>
                  <p className="text-sm text-gray-400">Tourism Intelligence Platform</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">Advanced AI-powered tourism analytics with quantum security and sustainable practices.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Platform Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Real-time Analytics Dashboard</li>
                <li>• Predictive Demand Forecasting</li>
                <li>• Autonomous Drone Tours</li>
                <li>• VR/AR Tourism Experiences</li>
                <li>• Quantum Security Framework</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">System Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400">{tourismData.systemUptime}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-blue-400">{tourismData.avgResponseTime}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Security</span>
                  <span className="text-purple-400">Quantum Level</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">© 2025 radosavlevici210 - Open Source MIT License. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-2">Production-ready AI Tourism Platform with Enterprise-grade Security</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
