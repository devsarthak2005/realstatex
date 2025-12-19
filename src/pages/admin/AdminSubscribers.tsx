import { useState, useEffect } from "react";
import { Trash2, Mail, Download, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSubscribers(subscribers.filter(s => s.id !== id));
      toast.success("Subscriber removed successfully!");
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    }
  };

  const handleExport = () => {
    const csv = [
      "Email,Date",
      ...subscribers.map(s => `${s.email},${format(new Date(s.created_at), 'yyyy-MM-dd')}`)
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    
    toast.success("Subscribers exported successfully!");
  };

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Subscribers</h1>
            <p className="font-body text-muted-foreground mt-1">
              Newsletter subscribers ({subscribers.length} total)
            </p>
          </div>
          <Button variant="outline" onClick={handleExport} disabled={subscribers.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <Card className="bg-card border-0 shadow-card">
          <CardContent className="p-0">
            {subscribers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No subscribers yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead className="font-body font-semibold w-8">#</TableHead>
                    <TableHead className="font-body font-semibold">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </div>
                    </TableHead>
                    <TableHead className="font-body font-semibold">Subscribed Date</TableHead>
                    <TableHead className="font-body font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber, index) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-body text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-body font-medium">
                        {subscriber.email}
                      </TableCell>
                      <TableCell className="font-body text-muted-foreground">
                        {format(new Date(subscriber.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(subscriber.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <div className="grid sm:grid-cols-3 gap-6">
          <Card className="bg-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-display text-3xl font-bold text-foreground">
                {subscribers.length}
              </p>
              <p className="font-body text-muted-foreground text-sm">
                Total Subscribers
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-display text-3xl font-bold text-foreground">
                +{subscribers.filter(s => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(s.created_at) >= weekAgo;
                }).length}
              </p>
              <p className="font-body text-muted-foreground text-sm">
                This Week
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-0 shadow-card">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-display text-3xl font-bold text-foreground">
                98%
              </p>
              <p className="font-body text-muted-foreground text-sm">
                Delivery Rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscribers;