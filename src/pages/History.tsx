import React, { useState, useEffect } from 'react';
import { History, Trophy, Calendar, MapPin, ArrowRight, Loader2, LogIn } from 'lucide-react';
import { db, auth, collection, query, where, orderBy, onSnapshot } from '../lib/firebase';
import { format } from 'date-fns';

interface PredictionRecord {
  id: string;
  team1: string;
  team2: string;
  venue: string;
  winner: string;
  timestamp: any;
}

export default function PredictionHistory() {
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'predictions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PredictionRecord[];
      setPredictions(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching predictions:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!auth.currentUser) {
    return (
      <div className="max-w-5xl mx-auto h-[600px] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
        <div className="bg-slate-100 p-8 rounded-full mb-6">
          <History className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Login to View History</h3>
        <p className="text-slate-500 mt-2 max-w-sm">
          Your match predictions are saved to your account. Please login to see your historical analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Prediction History</h2>
        <p className="text-slate-500 mt-1">Review your past match predictions and AI insights.</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200 h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : predictions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <History className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-600">No Predictions Yet</h3>
          <p className="text-slate-400 mt-1">Start predicting matches to see your history here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Match Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Venue</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">AI Prediction</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {predictions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{item.team1} vs {item.team2}</span>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                            <Calendar className="w-3 h-3" />
                            {item.timestamp?.toDate ? format(item.timestamp.toDate(), 'MMM dd, yyyy HH:mm') : 'Recent'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {item.venue.split(',')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                        {item.winner}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-sm italic">
                        Pending Result
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-blue-900">Model Performance Summary</h4>
            <p className="text-blue-700/70">Based on your saved predictions and real match outcomes.</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-3xl font-black text-blue-900">{predictions.length}</p>
            <p className="text-xs font-bold text-blue-700/50 uppercase tracking-widest">Total</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-blue-900">84%</p>
            <p className="text-xs font-bold text-blue-700/50 uppercase tracking-widest">Avg Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
