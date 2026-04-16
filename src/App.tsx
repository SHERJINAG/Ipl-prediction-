import React, { useState, useEffect } from 'react';
import { Layout, Trophy, Calculator, PlayCircle, History, Settings, Menu, X, BarChart3, LogIn, LogOut, Users } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Predictor from './pages/Predictor';
import Simulator from './pages/Simulator';
import PredictionHistory from './pages/History';
import Squads from './pages/Squads';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { auth, googleProvider, signInWithPopup, onAuthStateChanged, User } from './lib/firebase';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => auth.signOut();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'predictor', name: 'Match Predictor', icon: Calculator },
    { id: 'simulator', name: 'Scorecard Simulator', icon: PlayCircle },
    { id: 'squads', name: 'Team Squads', icon: Users },
    { id: 'history', name: 'Prediction History', icon: History },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'predictor':
        return <Predictor />;
      case 'simulator':
        return <Simulator />;
      case 'squads':
        return <Squads />;
      case 'history':
        return <PredictionHistory />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">IPL Predictor</h1>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-white" : "group-hover:text-white")} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">System Status</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300 font-medium">Models Retrained Today</span>
              </div>
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch('/api/admin/update-data', { method: 'POST' });
                    const data = await res.json();
                    alert(data.message);
                  } catch (err) {
                    alert('Failed to retrain models.');
                  }
                }}
                className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-3 h-3" />
                Retrain Now
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold">{user.displayName}</span>
                  <button onClick={handleLogout} className="text-[10px] text-rose-500 font-bold uppercase hover:underline">Logout</button>
                </div>
                <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border-2 border-slate-100" referrerPolicy="no-referrer" />
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
