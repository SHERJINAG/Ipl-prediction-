import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, TrendingUp, Users, Target, ArrowUpRight, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { IPL_TEAMS } from '../data/iplData';

const SEASON_DATA: { [key: string]: any } = {
  '2024': [
    { name: 'KKR', winRate: 78, color: '#3A225D' },
    { name: 'SRH', winRate: 64, color: '#F26522' },
    { name: 'RR', winRate: 62, color: '#EA1B85' },
    { name: 'RCB', winRate: 58, color: '#2B2A29' },
    { name: 'CSK', winRate: 54, color: '#FDB913' },
    { name: 'DC', winRate: 50, color: '#00008B' },
  ],
  '2025': [
    { name: 'KKR', winRate: 82, color: '#3A225D' },
    { name: 'RR', winRate: 70, color: '#EA1B85' },
    { name: 'CSK', winRate: 65, color: '#FDB913' },
    { name: 'MI', winRate: 60, color: '#004BA0' },
    { name: 'SRH', winRate: 55, color: '#F26522' },
    { name: 'GT', winRate: 52, color: '#1B2133' },
  ],
  '2026': [
    { name: 'RR', winRate: 85, color: '#EA1B85' },
    { name: 'KKR', winRate: 75, color: '#3A225D' },
    { name: 'LSG', winRate: 68, color: '#0057E7' },
    { name: 'CSK', winRate: 62, color: '#FDB913' },
    { name: 'RCB', winRate: 58, color: '#2B2A29' },
    { name: 'MI', winRate: 45, color: '#004BA0' },
  ]
};

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [season, setSeason] = useState('2026');
  const winRateData = SEASON_DATA[season] || [];
  const topTeam = winRateData[0] || { name: 'N/A', winRate: 0, color: '#ccc' };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">IPL {season} Insights</h2>
          <p className="text-slate-500 mt-1">Real-time match predictions and historical performance analytics.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {['2024', '2025', '2026'].map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                season === s ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Trophy className="text-blue-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Season Leader</p>
          <p className="text-2xl font-bold mt-1">{topTeam.name}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="text-amber-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Model Accuracy</p>
          <p className="text-2xl font-bold mt-1">84.2%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Users className="text-emerald-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Active Users</p>
          <p className="text-2xl font-bold mt-1">12.4k</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Target className="text-rose-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Matches Analyzed</p>
          <p className="text-2xl font-bold mt-1">1,240+</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Team Win Rates ({season})</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Updated 5m ago</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winRateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  unit="%"
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="winRate" radius={[6, 6, 0, 0]} barSize={40}>
                  {winRateData?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Teams List */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Top Contenders</h3>
          <div className="space-y-6">
            {winRateData?.slice(0, 5).map((team: any, i: number) => (
              <div key={team.name} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: team.color }}>
                  {team.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{team.name}</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${team.winRate}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-500">{team.winRate}%</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onNavigate('predictor')}
            className="w-full mt-8 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            Run New Prediction
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
