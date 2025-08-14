// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import EmployeeManagement from "../components/EmployeeManagement";
import LeaveManagement from "../components/LeaveManagement";
import AttendanceManagement from "../components/AttendanceManagement";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Settings,
  User,
  Building,
  Award
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to view the dashboard.</p>
        </div>
      </div>
    );
  }

  // Mock data for dashboard stats
  const dashboardStats = [
    {
      title: "Total Employees",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Active Today",
      value: "2,234",
      change: "+5%",
      trend: "up",
      icon: UserCheck,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Leave Requests",
      value: "89",
      change: "-8%",
      trend: "down",
      icon: Calendar,
      color: "orange",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "+15%",
      trend: "up",
      icon: Clock,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "submitted leave request",
      time: "2 minutes ago",
      type: "leave",
      status: "pending"
    },
    {
      id: 2,
      user: "Michael Chen",
      action: "clocked in for today",
      time: "15 minutes ago",
      type: "attendance",
      status: "success"
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      action: "completed performance review",
      time: "1 hour ago",
      type: "performance",
      status: "success"
    },
    {
      id: 4,
      user: "David Kim",
      action: "requested time off",
      time: "2 hours ago",
      type: "leave",
      status: "pending"
    }
  ];

  const quickActions = [
    { name: "Add Employee", icon: Plus, color: "blue" },
    { name: "Approve Leaves", icon: CheckCircle, color: "green" },
    { name: "Generate Report", icon: BarChart3, color: "purple" },
    { name: "System Settings", icon: Settings, color: "gray" }
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "employees", name: "Employees", icon: Users },
    { id: "leaves", name: "Leave Requests", icon: Calendar },
    { id: "attendance", name: "Attendance", icon: Clock }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Left side - Welcome */}
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name || user?.email || "Admin"}!
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {formatDate(currentTime)} • {formatTime(currentTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm focus:outline-none w-32 lg:w-48"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 mt-4">
        {activeTab === "overview" && (
          <div className="space-y-6 mt-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <div className="flex items-center">
                        <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className={`w-8 h-8 bg-${action.color}-50 rounded-lg flex items-center justify-center`}>
                        <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                      </div>
                      <span className="font-medium text-gray-700">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Recent Activity
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' : 
                        activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className="flex items-center">
                        {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {activity.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500" />}
                        {activity.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Attendance Overview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Filter className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>

              {/* Department Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-green-600" />
                    Department Overview
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View details
                  </button>
                </div>
                <div className="space-y-4">
                  {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'].map((dept, index) => (
                    <div key={dept} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${['blue', 'green', 'purple', 'orange', 'red'][index]}-500`}></div>
                        <span className="text-sm font-medium text-gray-700">{dept}</span>
                      </div>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 200) + 50} employees</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "employees" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <EmployeeManagement />
          </div>
        )}
        {activeTab === "leaves" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <LeaveManagement />
          </div>
        )}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <AttendanceManagement />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;