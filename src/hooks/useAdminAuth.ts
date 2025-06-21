
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  employee_id: string;
  department: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    } else {
      setAdminUser(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        setAdminUser(null);
        setIsAdmin(false);
      } else {
        setAdminUser(adminData);
        setIsAdmin(!!adminData);
      }
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
      setAdminUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { adminUser, isAdmin, loading };
};
