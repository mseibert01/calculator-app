// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';

interface UsageStat {
  calculator_name: string;
  count: number;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UsageStat[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin');
    } else {
      fetch('/admin/stats')
        .then(res => res.json())
        .then(data => setStats(data.stats));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <Card>
          <h2 className="text-2xl font-bold mb-6">Usage Statistics</h2>
          <Table>
            <thead>
              <tr>
                <th className="text-left p-2">Calculator</th>
                <th className="text-right p-2">Usage Count</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.calculator_name}>
                  <td className="p-2">{stat.calculator_name}</td>
                  <td className="text-right p-2">{stat.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
