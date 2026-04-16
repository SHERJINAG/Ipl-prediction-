import React, { useState } from 'react';
import { IPL_TEAMS, VENUES } from '../data/iplData';
import { predictMatchLocal, PredictionResult } from '../services/predictionEngine';
import { Loader2, AlertCircle, CheckCircle2, Info, ChevronRight, ChevronLeft, Trophy } from 'lucide-react';
import { db, auth, collection, addDoc, Timestamp } from '../lib/firebase';

export default function Predictor() {
  const [step, setStep] = useState(1);
  const [team1, setTeam1] = useState(IPL_TEAMS[0]);
  const [team2, setTeam2] = useState(IPL_TEAMS[1]);
  const [playing12Team1, setPlaying12Team1] = useState<string[]>(team1.players.map(p => p.name));
  const [playing12Team2, setPlaying12Team2] = useState<string[]>(team2.players.map(p => p.name));
  const [venue, setVenue] = useState(VENUES[0]);
  const [tossWinner, setTossWinner] = useState(team1.name);
  const [tossDecision, setTossDecision] = useState('Bat first');
  const [isDayNight, setIsDayNight] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate a small delay to mimic "ML processing"
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = predictMatchLocal({
        team1: team1.name,
        team2: team2.name,
        playing12Team1,
        playing12Team2,
        venue,
        tossWinner,
        tossDecision,
        isDayNight,
      });
      setPrediction(result);
      setStep(4);

      // Save to Firestore if user is logged in
      if (auth.currentUser && result) {
        try {
          // Ensure no undefined values are sent to Firestore
          const firestoreData = {
            userId: auth.currentUser.uid,
            team1: team1.name,
            team2: team2.name,
            venue,
            winner: result.winner || 'Unknown',
            winProbability: result.winProbability || {},
            predictedScore: result.predictedScore || {},
            keyInsights: result.keyInsights || [],
            timestamp: Timestamp.now(),
          };

          await addDoc(collection(db, 'predictions'), firestoreData);
        } catch (saveErr) {
          console.error("Failed to save prediction to Firestore:", saveErr);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate prediction. Please try again.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayer = (team: 'team1' | 'team2', playerName: string) => {
    const currentTeam = team === 'team1' ? team1 : team2;
    if (team === 'team1') {
      setPlaying12Team1(prev => {
        if (prev.includes(playerName)) {
          return prev.length > 1 ? prev.filter(p => p !== playerName) : prev;
        }
        if (prev.length < 12) {
          const player = currentTeam.players.find(p => p.name === playerName);
          if (player?.isForeign) {
            const foreignCount = prev.filter(pName => 
              currentTeam.players.find(p => p.name === pName)?.isForeign
            ).length;
            
            if (foreignCount >= 4) {
              setError(`You can only select a maximum of 4 foreign players for ${currentTeam.name}.`);
              return prev;
            }
          }
          setError(null);
          return [...prev, playerName];
        }
        return prev;
      });
    } else {
      setPlaying12Team2(prev => {
        if (prev.includes(playerName)) {
          return prev.length > 1 ? prev.filter(p => p !== playerName) : prev;
        }
        if (prev.length < 12) {
          const player = currentTeam.players.find(p => p.name === playerName);
          if (player?.isForeign) {
            const foreignCount = prev.filter(pName => 
              currentTeam.players.find(p => p.name === pName)?.isForeign
            ).length;
            
            if (foreignCount >= 4) {
              setError(`You can only select a maximum of 4 foreign players for ${currentTeam.name}.`);
              return prev;
            }
          }
          setError(null);
          return [...prev, playerName];
        }
        return prev;
      });
    }
  };

  const nextStep = () => {
    if (step === 2) {
      if (playing12Team1.length !== 12 || playing12Team2.length !== 12) {
        setError("Please select exactly 12 players for each team.");
        return;
      }
    }
    setError(null);
    setStep(prev => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Match Predictor</h2>
        <p className="text-slate-500 mt-1">Configure match parameters to generate AI-powered predictions.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              step >= s ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white text-slate-400 border-2 border-slate-200"
            }`}
          >
            {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {step === 1 && (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">Step 1: Select Teams & Venue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Team 1 (Home)</label>
                <div className="grid grid-cols-2 gap-3">
                  {IPL_TEAMS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { 
                        setTeam1(t); 
                        setPlaying12Team1(t.players.slice(0, 12).map(p => p.name)); 
                        if (tossWinner === team1.name) setTossWinner(t.name);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        team1.id === t.id ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: t.color }} />
                      <p className="font-bold text-sm">{t.shortName}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Team 2 (Away)</label>
                <div className="grid grid-cols-2 gap-3">
                  {IPL_TEAMS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { 
                        setTeam2(t); 
                        setPlaying12Team2(t.players.slice(0, 12).map(p => p.name)); 
                        if (tossWinner === team2.name) setTossWinner(t.name);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        team2.id === t.id ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: t.color }} />
                      <p className="font-bold text-sm">{t.shortName}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Match Venue</label>
              <select 
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all font-medium"
              >
                {VENUES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">Step 2: Select Playing 12</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team1.color }} />
                    {team1.name}
                  </h4>
                  <span className={`text-xs font-bold ${playing12Team1.length === 12 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {playing12Team1.length}/12 selected
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {team1.players.map(player => (
                    <button
                      key={player.name}
                      onClick={() => togglePlayer('team1', player.name)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        playing12Team1.includes(player.name) ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{player.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium">{player.role}</span>
                          {player.isForeign && (
                            <span className="text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full uppercase font-bold">INTL</span>
                          )}
                        </div>
                      </div>
                      {playing12Team1.includes(player.name) && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team2.color }} />
                    {team2.name}
                  </h4>
                  <span className={`text-xs font-bold ${playing12Team2.length === 12 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {playing12Team2.length}/12 selected
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {team2.players.map(player => (
                    <button
                      key={player.name}
                      onClick={() => togglePlayer('team2', player.name)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        playing12Team2.includes(player.name) ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{player.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium">{player.role}</span>
                          {player.isForeign && (
                            <span className="text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full uppercase font-bold">INTL</span>
                          )}
                        </div>
                      </div>
                      {playing12Team2.includes(player.name) && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold">Step 3: Match Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Toss Winner</label>
                <div className="flex gap-4">
                  {[team1, team2].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTossWinner(t.name)}
                      className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                        tossWinner === t.name ? "border-blue-600 bg-blue-50" : "border-slate-100"
                      }`}
                    >
                      <p className="font-bold">{t.shortName}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Toss Decision</label>
                <div className="flex gap-4">
                  {['Bat first', 'Bowl first'].map(d => (
                    <button
                      key={d}
                      onClick={() => setTossDecision(d)}
                      className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                        tossDecision === d ? "border-blue-600 bg-blue-50" : "border-slate-100"
                      }`}
                    >
                      <p className="font-bold">{d}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-bold">Day/Night Match</p>
                <p className="text-sm text-slate-500">Enable for floodlight conditions and dew factor.</p>
              </div>
              <button 
                onClick={() => setIsDayNight(!isDayNight)}
                className={`w-14 h-8 rounded-full relative transition-colors ${isDayNight ? "bg-blue-600" : "bg-slate-300"}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isDayNight ? "left-7" : "left-1"}`} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && prediction && (
          <div className="p-8 space-y-10 animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-widest">
                Match Prediction Result
              </div>
              <h3 className="text-4xl font-black text-slate-900">
                {prediction.winner} <span className="text-blue-600">Predicted to Win</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Win Probability */}
              <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <BarChartChart className="w-5 h-5 text-blue-600" />
                  Win Probability
                </h4>
                <div className="space-y-6">
                  {Object.entries(prediction.winProbability || {}).map(([team, prob]) => (
                    <div key={team} className="space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>{team}</span>
                        <span>{prob}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${team === prediction.winner ? "bg-blue-600" : "bg-slate-400"}`}
                          style={{ width: `${prob}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predicted Scores */}
              <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Predicted Scores
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(prediction.predictedScore || {}).map(([team, score]) => (
                    <div key={team} className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">{team}</p>
                      <p className="text-3xl font-black text-slate-900">{score}</p>
                      <p className="text-xs text-slate-500 mt-1">Estimated Total</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                AI Match Insights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prediction.keyInsights?.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <span className="text-blue-600 font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(1)}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors"
            >
              Run Another Prediction
            </button>
          </div>
        )}

        {/* Footer Actions */}
        {step < 4 && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button
              disabled={step === 1}
              onClick={() => setStep(prev => prev - 1)}
              className="flex items-center gap-2 px-6 py-3 font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
              >
                Next Step
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {!auth.currentUser && (
                  <p className="text-xs text-slate-500 font-medium max-w-[200px] text-right">
                    Login to save your predictions to history.
                  </p>
                )}
                <button
                  disabled={loading}
                  onClick={handlePredict}
                  className="flex items-center gap-2 px-10 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Data...
                    </>
                  ) : (
                    <>
                      Generate Prediction
                      <Trophy className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}

// Helper components for icons
function BarChartChart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function Calculator(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}
