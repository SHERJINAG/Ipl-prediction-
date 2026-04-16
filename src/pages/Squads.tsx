import React, { useState } from 'react';
import { IPL_TEAMS, VENUES } from '../data/iplData';
import { Users, Search, Trophy, Star, Activity, Target, ChevronRight } from 'lucide-react';

interface SeasonStat {
  season: string;
  runs?: number;
  wickets?: number;
  matches: number;
}

interface Player {
  name: string;
  role: string;
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    avg?: number;
    sr?: number;
    economy?: number;
  };
  detailedStats?: SeasonStat[];
  bestAgainst?: string;
  strongAgainst?: string;
  weakness?: string;
}

export default function Squads() {
  const [selectedTeam, setSelectedTeam] = useState(IPL_TEAMS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = selectedTeam.players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">IPL Squads</h2>
          <p className="text-slate-500 mt-1">Explore full team rosters and player performance statistics.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search players or roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Team Selection Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Select Team</h3>
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {IPL_TEAMS.map(team => (
              <button
                key={team.id}
                onClick={() => { setSelectedTeam(team); setSearchQuery(''); setSelectedPlayer(null); }}
                className={`flex-shrink-0 lg:w-full p-3 rounded-2xl flex items-center gap-3 transition-all ${
                  selectedTeam.id === team.id 
                    ? "bg-white shadow-md border border-slate-100 ring-1 ring-slate-200" 
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
                <span className="font-bold text-sm truncate">{team.name}</span>
                {selectedTeam.id === team.id && <ChevronRight className="w-4 h-4 ml-auto text-blue-600 hidden lg:block" />}
              </button>
            ))}
          </div>
        </div>

        {/* Squad Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 z-0 opacity-50" />
            
            <div className="relative z-10 flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl" style={{ backgroundColor: selectedTeam.color }}>
                {selectedTeam.shortName}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">{selectedTeam.name}</h3>
                <p className="text-slate-500 font-medium">Official Squad - 2024 Season</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
              {filteredPlayers.map((player, idx) => {
                const isSelected = selectedPlayer?.name === player.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPlayer(isSelected ? null : player)}
                    className={`group bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-transparent hover:border-slate-200 p-4 rounded-3xl transition-all text-left flex flex-col justify-between ${
                      isSelected ? "col-span-2 ring-2 ring-blue-500 bg-white shadow-lg h-auto" : "h-40"
                    }`}
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100">
                          {player.role}
                        </span>
                        <Star className={`w-4 h-4 transition-colors ${isSelected ? 'text-yellow-400' : 'text-slate-200 group-hover:text-yellow-400'}`} />
                      </div>
                      <h4 className={`font-bold transition-colors ${isSelected ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{player.name}</h4>
                    </div>
                    
                    <div className="flex items-end justify-between w-full">
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-xs font-black text-slate-900">{player.stats.matches}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Mat</p>
                        </div>
                        {player.stats.runs !== undefined && (
                          <div className="text-center">
                            <p className="text-xs font-black text-slate-900">{player.stats.runs}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase">Runs</p>
                          </div>
                        )}
                        {player.stats.wickets !== undefined && (
                          <div className="text-center">
                            <p className="text-xs font-black text-slate-900">{player.stats.wickets}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase">Wkts</p>
                          </div>
                        )}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-blue-600 border-blue-600 rotate-90' : 'bg-white border-slate-100 group-hover:bg-blue-600 group-hover:border-blue-600'
                      }`}>
                        <ChevronRight className={`w-4 h-4 transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-slate-100 w-full space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {player.stats.avg !== undefined && (
                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                              <p className="text-lg font-black text-slate-900">{player.stats.avg}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Average</p>
                            </div>
                          )}
                          {player.stats.sr !== undefined && (
                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                              <p className="text-lg font-black text-slate-900">{player.stats.sr}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Strike Rate</p>
                            </div>
                          )}
                          {player.stats.economy !== undefined && (
                            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                              <p className="text-lg font-black text-slate-900">{player.stats.economy}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Economy</p>
                            </div>
                          )}
                        </div>

                        {player.detailedStats && (
                          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                            <table className="w-full text-left text-[10px]">
                              <thead className="bg-slate-100/50 text-slate-400 font-black uppercase tracking-widest">
                                <tr>
                                  <th className="px-3 py-2">Season</th>
                                  <th className="px-3 py-2">Mat</th>
                                  <th className="px-3 py-2">Runs</th>
                                  <th className="px-3 py-2">Wkts</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {player.detailedStats.map((s, i) => (
                                  <tr key={i} className="hover:bg-white transition-colors">
                                    <td className="px-3 py-2 font-bold text-slate-900">{s.season}</td>
                                    <td className="px-3 py-2 text-slate-600">{s.matches}</td>
                                    <td className="px-3 py-2 text-slate-600 font-bold">{s.runs ?? '-'}</td>
                                    <td className="px-3 py-2 text-slate-600 font-bold">{s.wickets ?? '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-3">
                          <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                            <Target className="w-3 h-3" /> Player Analysis
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px]">
                            <div>
                              <p className="text-blue-800/60 font-bold mb-1">Best Against</p>
                              <p className="text-blue-900 font-black">{player.bestAgainst || 'All Teams'}</p>
                            </div>
                            <div>
                              <p className="text-blue-800/60 font-bold mb-1">Strong Against</p>
                              <p className="text-emerald-600 font-black">{player.strongAgainst || 'Pace & Spin'}</p>
                            </div>
                            <div>
                              <p className="text-blue-800/60 font-bold mb-1">Weakness</p>
                              <p className="text-rose-600 font-black">{player.weakness || 'None'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {filteredPlayers.length === 0 && (
              <div className="text-center py-20">
                <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">No players found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
