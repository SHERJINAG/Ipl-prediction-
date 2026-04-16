import React, { useState } from 'react';
import { IPL_TEAMS, VENUES } from '../data/iplData';
import { simulateScorecardLocal, ScorecardSimulation } from '../services/predictionEngine';
import { Loader2, Play, ChevronRight, Info, Trophy, Activity, Target, User, Star } from 'lucide-react';

export default function Simulator() {
  const [team1, setTeam1] = useState(IPL_TEAMS[0]);
  const [team2, setTeam2] = useState(IPL_TEAMS[1]);
  const [venue, setVenue] = useState(VENUES[0]);
  
  const [loading, setLoading] = useState(false);
  const [simulation, setSimulation] = useState<ScorecardSimulation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeInnings, setActiveInnings] = useState<1 | 2>(1);
  const [activeTab, setActiveTab] = useState<'commentary' | 'scorecard'>('scorecard');

  const [selectedPlayers1, setSelectedPlayers1] = useState<string[]>(team1.players.slice(0, 12).map(p => p.name));
  const [selectedPlayers2, setSelectedPlayers2] = useState<string[]>(team2.players.slice(0, 12).map(p => p.name));

  const togglePlayer = (teamNum: 1 | 2, playerName: string) => {
    const current = teamNum === 1 ? selectedPlayers1 : selectedPlayers2;
    const setter = teamNum === 1 ? setSelectedPlayers1 : setSelectedPlayers2;
    const team = teamNum === 1 ? team1 : team2;
    
    if (current.includes(playerName)) {
      if (current.length > 1) {
        setter(current.filter(p => p !== playerName));
      }
    } else {
      if (current.length < 12) {
        const player = team.players.find(p => p.name === playerName);
        if (player?.isForeign) {
          const foreignCount = current.filter(pName => 
            team.players.find(p => p.name === pName)?.isForeign
          ).length;
          
          if (foreignCount >= 4) {
            setError(`You can only select a maximum of 4 foreign players for ${team.name}.`);
            return;
          }
        }
        setError(null);
        setter([...current, playerName]);
      }
    }
  };

  const handleSimulate = async () => {
    if (selectedPlayers1.length !== 12 || selectedPlayers2.length !== 12) {
      setError("Please select exactly 12 players for each team.");
      return;
    }

    setLoading(true);
    setError(null);
    setSimulation(null);
    try {
      // Simulate a small delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = simulateScorecardLocal({
        team1: team1.name,
        team2: team2.name,
        playing12Team1: selectedPlayers1,
        playing12Team2: selectedPlayers2,
        venue,
      });
      setSimulation(result);
      setActiveInnings(1);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to simulate match. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Scorecard Simulator</h2>
        <p className="text-slate-500 mt-1">Generate a detailed over-by-over simulation of a hypothetical match.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 flex items-center gap-3">
          <Info className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Configuration Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg">Configuration</h3>
            
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team 1</label>
              <select 
                value={team1.id}
                onChange={(e) => {
                  const newTeam = IPL_TEAMS.find(t => t.id === e.target.value);
                  if (newTeam) {
                    setTeam1(newTeam);
                    setSelectedPlayers1(newTeam.players.slice(0, 12).map(p => p.name));
                  }
                }}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              >
                {IPL_TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team 2</label>
              <select 
                value={team2.id}
                onChange={(e) => {
                  const newTeam = IPL_TEAMS.find(t => t.id === e.target.value);
                  if (newTeam) {
                    setTeam2(newTeam);
                    setSelectedPlayers2(newTeam.players.slice(0, 12).map(p => p.name));
                  }
                }}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              >
                {IPL_TEAMS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Venue</label>
              <select 
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              >
                {VENUES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Playing 12 (T1)</label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedPlayers1.length === 12 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {selectedPlayers1.length}/12
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto border border-slate-100 rounded-xl p-2 space-y-1">
                {team1.players.map(p => (
                  <button
                    key={p.name}
                    onClick={() => togglePlayer(1, p.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${selectedPlayers1.includes(p.name) ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'hover:bg-slate-50 text-slate-600 border border-transparent'}`}
                  >
                    <span>{p.name}</span>
                    {p.isForeign && (
                      <span className="text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full uppercase font-bold">INTL</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Playing 12 (T2)</label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedPlayers2.length === 12 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {selectedPlayers2.length}/12
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto border border-slate-100 rounded-xl p-2 space-y-1">
                {team2.players.map(p => (
                  <button
                    key={p.name}
                    onClick={() => togglePlayer(2, p.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${selectedPlayers2.includes(p.name) ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'hover:bg-slate-50 text-slate-600 border border-transparent'}`}
                  >
                    <span>{p.name}</span>
                    {p.isForeign && (
                      <span className="text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full uppercase font-bold">INTL</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading || selectedPlayers1.length !== 12 || selectedPlayers2.length !== 12}
              onClick={handleSimulate}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
              {loading ? "Simulating..." : "Start Simulation"}
            </button>
          </div>

          <div className="bg-blue-600 p-6 rounded-3xl text-white">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              How it works
            </h4>
            <p className="text-sm text-blue-100 leading-relaxed">
              Our AI engine simulates each delivery based on historical player performance, venue conditions, and team dynamics.
            </p>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="lg:col-span-3">
          {!simulation ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl h-[600px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="bg-slate-50 p-6 rounded-full mb-6">
                <Play className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-600">No Simulation Active</h3>
              <p className="max-w-xs mt-2">Configure the match parameters and click "Start Simulation" to see the over-by-over breakdown.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Match Summary Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <Trophy className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-lg">Match Summary</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{simulation.matchSummary}</p>
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Man of the Match</p>
                    <p className="font-bold text-slate-900">{simulation.manOfTheMatch}</p>
                  </div>
                </div>
              </div>

              {/* Score Summary */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full -ml-32 -mt-32 blur-[80px]" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full -mr-32 -mb-32 blur-[80px]" />
                </div>
                
                <div className="text-center md:text-left relative z-10">
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">{simulation.team1.name}</p>
                  <h4 className="text-4xl font-black">{simulation.team1.total}/{simulation.team1.wickets}</h4>
                  <p className="text-slate-400 text-sm mt-1">{simulation.team1.overs} Overs</p>
                </div>
                <div className="bg-white/10 px-6 py-2 rounded-full text-sm font-bold text-white/60 relative z-10">VS</div>
                <div className="text-center md:text-right relative z-10">
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">{simulation.team2.name}</p>
                  <h4 className="text-4xl font-black">{simulation.team2.total}/{simulation.team2.wickets}</h4>
                  <p className="text-slate-400 text-sm mt-1">{simulation.team2.overs} Overs</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-col gap-4">
                <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setActiveInnings(1)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeInnings === 1 ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    1st Innings: {simulation.team1.name}
                  </button>
                  <button
                    onClick={() => setActiveInnings(2)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeInnings === 2 ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    2nd Innings: {simulation.team2.name}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('scorecard')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'scorecard' ? "bg-blue-600 text-white" : "bg-white text-slate-500 border border-slate-200"}`}
                  >
                    Scorecard
                  </button>
                  <button
                    onClick={() => setActiveTab('commentary')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'commentary' ? "bg-blue-600 text-white" : "bg-white text-slate-500 border border-slate-200"}`}
                  >
                    Commentary
                  </button>
                </div>
              </div>

              {activeTab === 'scorecard' ? (
                <div className="space-y-6">
                  {/* Batting Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold">Batting</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            <th className="px-6 py-4">Batsman</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">R</th>
                            <th className="px-6 py-4 text-center">B</th>
                            <th className="px-6 py-4 text-center">4s</th>
                            <th className="px-6 py-4 text-center">6s</th>
                            <th className="px-6 py-4 text-center">SR</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(activeInnings === 1 ? simulation.team1?.batting : simulation.team2?.batting)?.map((player, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900">{player.name}</td>
                              <td className="px-6 py-4 text-xs text-slate-400">{player.outStatus}</td>
                              <td className="px-6 py-4 text-center font-black">{player.runs}</td>
                              <td className="px-6 py-4 text-center text-slate-500">{player.balls}</td>
                              <td className="px-6 py-4 text-center text-slate-500">{player.fours}</td>
                              <td className="px-6 py-4 text-center text-slate-500">{player.sixes}</td>
                              <td className="px-6 py-4 text-center text-blue-600 font-bold">
                                {player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(1) : '0.0'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bowling Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold">Bowling</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            <th className="px-6 py-4">Bowler</th>
                            <th className="px-6 py-4 text-center">O</th>
                            <th className="px-6 py-4 text-center">R</th>
                            <th className="px-6 py-4 text-center">W</th>
                            <th className="px-6 py-4 text-center">Econ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(activeInnings === 1 ? simulation.team2?.bowling : simulation.team1?.bowling)?.map((player, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900">{player.name}</td>
                              <td className="px-6 py-4 text-center font-bold">{player.overs}</td>
                              <td className="px-6 py-4 text-center font-bold">{player.runs}</td>
                              <td className="px-6 py-4 text-center font-black text-rose-600">{player.wickets}</td>
                              <td className="px-6 py-4 text-center text-blue-600 font-bold">{player.economy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Over Breakdown / Commentary */
                <div className="space-y-4">
                  {(activeInnings === 1 ? simulation.team1?.innings : simulation.team2?.innings)?.map((over, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            {over.over}
                          </div>
                          <div>
                            <p className="font-bold">Over {over.over} • {over.bowlerName}</p>
                            <p className="text-xs text-slate-400 font-medium">{over.runs} Runs • {over.wickets} Wickets</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {over.wickets > 0 && (
                            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                              Wicket
                            </span>
                          )}
                          {over.runs >= 12 && (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                              Big Over
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="pl-14 space-y-2">
                        {over.commentary.split('. ').map((ball, idx) => (
                          <p key={idx} className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-3">
                            {ball}{idx < over.commentary.split('. ').length - 1 ? '.' : ''}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
