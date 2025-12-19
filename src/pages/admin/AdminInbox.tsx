import { useState, useEffect } from "react";
import { Eye, Trash2, Mail, Phone, MapPin, Loader2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Contact {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  city: string | null;
  created_at: string;
  is_read: boolean;
}

const AdminInbox = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load inbox');
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (contact: Contact) => {
    if (!contact.is_read) {
      try {
        const { error } = await supabase
          .from('contact_submissions')
          .update({ is_read: true })
          .eq('id', contact.id);

        if (error) throw error;
        
        setContacts(contacts.map(c => 
          c.id === contact.id ? { ...c, is_read: true } : c
        ));
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
    setSelectedContact(contact);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContacts(contacts.filter(c => c.id !== id));
      toast.success("Message deleted successfully!");
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete message');
    }
  };

  const unreadCount = contacts.filter(c => !c.is_read).length;

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
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-foreground">Inbox</h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-accent text-accent-foreground font-body text-sm font-semibold rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="font-body text-muted-foreground mt-1">
            Contact form submissions
          </p>
        </div>

        {/* Table */}
        <Card className="bg-card border-0 shadow-card">
          <CardContent className="p-0">
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No contact submissions yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead className="font-body font-semibold">Name</TableHead>
                    <TableHead className="font-body font-semibold">Email</TableHead>
                    <TableHead className="font-body font-semibold">Mobile</TableHead>
                    <TableHead className="font-body font-semibold">City</TableHead>
                    <TableHead className="font-body font-semibold">Date</TableHead>
                    <TableHead className="font-body font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow 
                      key={contact.id} 
                      className={!contact.is_read ? "bg-accent/5" : ""}
                    >
                      <TableCell className="font-body">
                        <div className="flex items-center gap-2">
                          {!contact.is_read && (
                            <div className="w-2 h-2 bg-accent rounded-full" />
                          )}
                          <span className={!contact.is_read ? "font-semibold" : ""}>
                            {contact.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-body text-muted-foreground">{contact.email}</TableCell>
                      <TableCell className="font-body text-muted-foreground">{contact.mobile || '-'}</TableCell>
                      <TableCell className="font-body text-muted-foreground">{contact.city || '-'}</TableCell>
                      <TableCell className="font-body text-muted-foreground">
                        {format(new Date(contact.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm" onClick={() => handleView(contact)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
          <DialogContent className="bg-card border-0 shadow-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Contact Details</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-accent">
                      {selectedContact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {selectedContact.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Submitted on {format(new Date(selectedContact.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="font-body">{selectedContact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="font-body">{selectedContact.mobile || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="font-body">{selectedContact.city || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminInbox;