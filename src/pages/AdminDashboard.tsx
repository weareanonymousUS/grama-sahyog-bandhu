
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Building,
  LogOut,
  BarChart3,
  Calendar
} from 'lucide-react';

interface AdminUser {
  id: string;
  employee_id: string;
  department: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface DashboardStats {
  total_requests: number;
  pending_requests: number;
  completed_requests: number;
  sector_wise_stats: Record<string, number>;
}

interface RequestSummary {
  id: string;
  name: string;
  problem_type: string;
  status: string;
  submitted_at: string;
  sector: string;
}

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<RequestSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    if (user) {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    if (!user) return;

    try {
      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (adminError || !adminData) {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin access',
          variant: 'destructive'
        });
        navigate('/');
        return;
      }

      setAdminUser(adminData);

      // Record admin session
      await supabase.from('admin_sessions').insert({
        admin_user_id: adminData.id,
        ip_address: 'Unknown', // Would need additional setup to get real IP
        user_agent: navigator.userAgent
      });

      // Fetch dashboard stats
      await fetchDashboardStats();
      
      // Fetch recent requests
      await fetchRecentRequests();
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load admin dashboard',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const tableNames = [
        'agriculture_requests',
        'roads_infrastructure_requests',
        'health_requests',
        'education_requests',
        'electricity_requests',
        'employment_requests',
        'housing_requests',
        'welfare_requests'
      ];

      let totalRequests = 0;
      let pendingRequests = 0;
      let completedRequests = 0;
      const sectorStats: Record<string, number> = {};

      for (const tableName of tableNames) {
        const { data, error } = await supabase
          .from(tableName as any)
          .select('status');

        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          continue;
        }

        if (data) {
          const sectorName = tableName.replace('_requests', '').replace('roads_infrastructure', 'roads');
          sectorStats[sectorName] = data.length;
          totalRequests += data.length;
          
          data.forEach(item => {
            if (item.status === 'pending') pendingRequests++;
            if (item.status === 'resolved') completedRequests++;
          });
        }
      }

      setStats({
        total_requests: totalRequests,
        pending_requests: pendingRequests,
        completed_requests: completedRequests,
        sector_wise_stats: sectorStats
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchRecentRequests = async () => {
    try {
      const tableNames = [
        'agriculture_requests',
        'roads_infrastructure_requests',
        'health_requests',
        'education_requests',
        'electricity_requests',
        'employment_requests',
        'housing_requests',
        'welfare_requests'
      ];

      const allRequests: RequestSummary[] = [];

      for (const tableName of tableNames) {
        const { data, error } = await supabase
          .from(tableName as any)
          .select('id, name, problem_type, status, submitted_at')
          .order('submitted_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          continue;
        }

        if (data) {
          const sectorName = tableName.replace('_requests', '').replace('roads_infrastructure', 'roads');
          const formattedData = data.map(item => ({
            ...item,
            sector: sectorName
          }));
          allRequests.push(...formattedData);
        }
      }

      // Sort by submitted_at and take top 10
      allRequests.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
      setRecentRequests(allRequests.slice(0, 10));
    } catch (error) {
      console.error('Error fetching recent requests:', error);
    }
  };

  const handleLogout = async () => {
    if (adminUser) {
      // Update admin session logout time
      await supabase
        .from('admin_sessions')
        .update({ logout_time: new Date().toISOString(), is_active: false })
        .eq('admin_user_id', adminUser.id)
        .eq('is_active', true);
    }
    
    await signOut();
    navigate('/auth');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You do not have admin privileges</p>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-blue-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Welcome, {adminUser.employee_id} | {adminUser.department}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-blue-600">{stats?.total_requests || 0}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats?.pending_requests || 0}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.completed_requests || 0}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {stats?.total_requests ? 
                      Math.round((stats.completed_requests / stats.total_requests) * 100) : 0}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sector-wise Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Sector-wise Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.sector_wise_stats && Object.entries(stats.sector_wise_stats).map(([sector, count]) => (
                  <div key={sector} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{sector}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentRequests.map((request) => (
                  <div key={request.id} className="border-l-4 border-blue-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{request.problem_type}</h4>
                      <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      {request.name} • {request.sector} • {formatDate(request.submitted_at)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
