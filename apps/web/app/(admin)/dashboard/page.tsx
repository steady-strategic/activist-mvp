// apps/web/app/(admin)/dashboard/page.tsx
import React from 'react';
import { Card, Button } from '../../../../../packages/ui/src/index';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <StatCard label="Total Supporters" value="12,450" trend="+12%" />
        <StatCard label="Donations (MTD)" value="$45,200" trend="+5%" />
        <StatCard label="Active Campaigns" value="3" trend="0%" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 text-sm border-b border-slate-100 pb-3 last:border-0">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-600">New donation of <strong>$50.00</strong> from Jane Doe</span>
                <span className="ml-auto text-slate-400 text-xs">2m ago</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">Create New Campaign</Button>
            <Button variant="outline" className="w-full justify-start">Export Supporter Data</Button>
            <Button variant="outline" className="w-full justify-start">Manage Team Access</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, trend }: any) => (
  <Card>
    <div className="text-slate-500 text-sm font-medium mb-1">{label}</div>
    <div className="text-3xl font-bold text-slate-900">{value}</div>
    <div className="text-emerald-600 text-sm font-medium mt-2">{trend} vs last month</div>
  </Card>
);
