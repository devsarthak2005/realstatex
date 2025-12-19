import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Upload, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  designation: string | null;
  description: string | null;
  avatar_url: string | null;
}

const defaultAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingClient) {
        const { error } = await supabase
          .from('clients')
          .update({
            name: formData.name,
            designation: formData.designation,
            description: formData.description,
          })
          .eq('id', editingClient.id);

        if (error) throw error;
        toast.success("Client updated successfully!");
      } else {
        const { error } = await supabase
          .from('clients')
          .insert({
            name: formData.name,
            designation: formData.designation,
            description: formData.description,
            avatar_url: defaultAvatar,
          });

        if (error) throw error;
        toast.success("Client added successfully!");
      }
      
      await fetchClients();
      setFormData({ name: "", designation: "", description: "" });
      setEditingClient(null);
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Failed to save client');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      designation: client.designation || "",
      description: client.description || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setClients(clients.filter(c => c.id !== id));
      toast.success("Client removed successfully!");
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
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
            <h1 className="font-display text-3xl font-bold text-foreground">Clients</h1>
            <p className="font-body text-muted-foreground mt-1">
              Manage client testimonials
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="cta" onClick={() => { setEditingClient(null); setFormData({ name: "", designation: "", description: "" }); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {editingClient ? "Edit Client" : "Add New Client"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-body text-sm text-muted-foreground">
                    Upload Photo (150x150)
                  </p>
                </div>
                <Input
                  placeholder="Client Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  placeholder="Designation (e.g., CEO, TechSquare)"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Testimonial Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
                <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingClient ? "Update Client" : "Add Client"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Clients Grid */}
        {clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No clients yet. Add your first testimonial!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Card key={client.id} className="bg-card border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={client.avatar_url || defaultAvatar}
                      alt={client.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent/20"
                    />
                    <div>
                      <h3 className="font-display font-bold text-foreground">{client.name}</h3>
                      <p className="font-body text-sm text-muted-foreground">{client.designation}</p>
                    </div>
                  </div>
                  <p className="font-body text-foreground/80 text-sm mb-4">
                    "{client.description}"
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(client)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(client.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminClients;