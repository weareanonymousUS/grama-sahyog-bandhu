
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminAccessButton = () => {
  const { isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <Button
      onClick={() => navigate('/admin')}
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      <Shield className="w-4 h-4 mr-2" />
      Admin Dashboard
    </Button>
  );
};

export default AdminAccessButton;
