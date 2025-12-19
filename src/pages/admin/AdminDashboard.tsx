import { useEffect, useState } from "react";
import { FolderOpen, Users, Inbox, Mail, ArrowUpRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Stats {
  projects: number;
  clients: number;
  contacts: number;
  subscribers: number;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  city: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ projects: 0, clients: 0, contacts: 0, subscribers: 0 });
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch counts in parallel
      const [projectsRes, clientsRes, contactsRes, subscribersRes, recentRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id, name, email, city, created_at').order('created_at', { ascending: false }).limit(3),
      ]);

      setStats({
        projects: projectsRes.count || 0,
        clients: clientsRes.count || 0,
        contacts: contactsRes.count || 0,
        subscribers: subscribersRes.count || 0,
      });

      setRecentContacts(recentRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return format(date, 'MMM d, yyyy');
  };

  const statItems = [
    { name: "Total Projects", value: stats.projects.toString(), icon: FolderOpen, change: "+3", trend: "up" },
    { name: "Happy Clients", value: stats.clients.toString(), icon: Users, change: "+12", trend: "up" },
    { name: "Inbox Messages", value: stats.contacts.toString(), icon: Inbox, change: "+8", trend: "up" },
    { name: "Subscribers", value: stats.subscribers.toString(), icon: Mail, change: "+52", trend: "up" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="font-body text-muted-foreground mt-1">
            Overview of your real estate platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat) => (
            <Card key={stat.name} className="bg-card border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-body text-muted-foreground text-sm">{stat.name}</p>
                    <p className="font-display text-3xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="font-body text-sm text-green-500 font-medium">
                    {stat.change}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    this month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Inquiries */}
        <Card className="bg-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {recentContacts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No recent inquiries</p>
            ) : (
              <div className="space-y-4">
                {recentContacts.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="font-body font-semibold text-accent">
                          {inquiry.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-body font-medium text-foreground">
                          {inquiry.name}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          {inquiry.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm text-foreground">{inquiry.city || 'Unknown'}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        {formatRelativeDate(inquiry.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;