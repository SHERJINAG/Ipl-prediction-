import { IPL_TEAMS, Team, Player } from '../data/iplData';

export interface PredictionResult {
  winner: string;
  winProbability: { [key: string]: number };
  predictedScore: { [key: string]: number };
  keyInsights: string[];
}

export interface ScorecardPlayerBatting {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  outStatus: string;
}

export interface ScorecardPlayerBowling {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface ScorecardOver {
  over: number;
  runs: number;
  wickets: number;
  bowlerName: string;
  commentary: string;
}

export interface ScorecardSimulation {
  matchSummary: string;
  manOfTheMatch: string;
  team1: {
    name: string;
    total: number;
    wickets: number;
    overs: number;
    batting: ScorecardPlayerBatting[];
    bowling: ScorecardPlayerBowling[];
    innings: ScorecardOver[];
  };
  team2: {
    name: string;
    total: number;
    wickets: number;
    overs: number;
    batting: ScorecardPlayerBatting[];
    bowling: ScorecardPlayerBowling[];
    innings: ScorecardOver[];
  };
}

/**
 * Local Prediction Engine (Heuristic-based ML simulation)
 */

const calculateTeamStrength = (players: string[], teamData: Team) => {
  let battingStrength = 0;
  let bowlingStrength = 0;

  players.forEach(pName => {
    const player = teamData.players.find(p => p.name === pName);
    if (player) {
      if (player.role.includes('Batsman') || player.role.includes('All-rounder')) {
        battingStrength += (player.stats.avg || 20) * (player.stats.sr || 120) / 100;
      }
      if (player.role.includes('Bowler') || player.role.includes('All-rounder')) {
        bowlingStrength += (100 / (player.stats.economy || 8.5)) * (player.stats.wickets || 10) / (player.stats.matches || 10);
      }
    }
  });

  return { battingStrength, bowlingStrength };
};

export const predictMatchLocal = (params: {
  team1: string;
  team2: string;
  playing12Team1: string[];
  playing12Team2: string[];
  venue: string;
  tossWinner: string;
  tossDecision: string;
  isDayNight: boolean;
}): PredictionResult => {
  const t1Data = IPL_TEAMS.find(t => t.name === params.team1);
  const t2Data = IPL_TEAMS.find(t => t.name === params.team2);

  if (!t1Data || !t2Data) {
    throw new Error("One or both teams not found in database.");
  }

  const t1Strength = calculateTeamStrength(params.playing12Team1, t1Data);
  const t2Strength = calculateTeamStrength(params.playing12Team2, t2Data);

  // Heuristic weights
  let t1Score = t1Strength.battingStrength * 0.6 + t1Strength.bowlingStrength * 0.4;
  let t2Score = t2Strength.battingStrength * 0.6 + t2Strength.bowlingStrength * 0.4;

  // Toss factor
  if (params.tossWinner === params.team1) t1Score *= 1.05;
  else t2Score *= 1.05;

  // Venue factor (Home advantage if applicable - simplified)
  if (params.venue.includes(params.team1)) t1Score *= 1.1;
  if (params.venue.includes(params.team2)) t2Score *= 1.1;

  const total = t1Score + t2Score;
  const t1Prob = Math.round((t1Score / total) * 100);
  const t2Prob = 100 - t1Prob;

  const winner = t1Prob > t2Prob ? params.team1 : params.team2;

  // Predicted scores (Average IPL scores around 160-190)
  const baseScore = 170;
  const t1Predicted = Math.round(baseScore * (t1Strength.battingStrength / 400));
  const t2Predicted = Math.round(baseScore * (t2Strength.battingStrength / 400));

  const insights = [
    `${params.team1}'s batting depth looks ${t1Strength.battingStrength > t2Strength.battingStrength ? 'superior' : 'comparable'} to ${params.team2}.`,
    `${params.venue} traditionally favors ${params.tossDecision === 'Bowl first' ? 'chasers' : 'teams batting first'}.`,
    `${params.isDayNight ? 'Dew factor' : 'Dry conditions'} might play a crucial role in the second innings.`,
    `Key matchup: ${params.playing12Team1[0]} vs ${params.playing12Team2[10]} could decide the powerplay momentum.`
  ];

  return {
    winner,
    winProbability: { [params.team1]: t1Prob, [params.team2]: t2Prob },
    predictedScore: { [params.team1]: t1Predicted, [params.team2]: t2Predicted },
    keyInsights: insights
  };
};

export const simulateScorecardLocal = (params: {
  team1: string;
  team2: string;
  playing12Team1: string[];
  playing12Team2: string[];
  venue: string;
}): ScorecardSimulation => {
  const simulateInnings = (battingTeam: string, bowlingTeam: string, playersBatting: string[], playersBowling: string[], target?: number) => {
    const tBatData = IPL_TEAMS.find(t => t.name === battingTeam);
    const tBowlData = IPL_TEAMS.find(t => t.name === bowlingTeam);

    if (!tBatData || !tBowlData) {
      throw new Error(`Team data not found for ${!tBatData ? battingTeam : bowlingTeam}`);
    }

    // Sort batting order: Batsmen -> All-rounders -> Bowlers
    const sortPlayersByRole = (players: string[], team: Team) => {
      return [...players].sort((a, b) => {
        const pA = team.players.find(p => p.name === a);
        const pB = team.players.find(p => p.name === b);
        
        if (!pA || !pB) return 0;

        const roleScore = (role: string) => {
          if (role.includes('Batsman')) return 1;
          if (role.includes('Wicketkeeper')) return 2;
          if (role.includes('All-rounder')) return 3;
          return 4;
        };
        return roleScore(pA.role) - roleScore(pB.role);
      });
    };

    const sortedBattingNames = sortPlayersByRole(playersBatting, tBatData);
    const battingPlayers = sortedBattingNames
      .map(name => tBatData.players.find(p => p.name === name))
      .filter((p): p is Player => !!p);
    
    const bowlingPlayers = playersBowling
      .map(name => tBowlData.players.find(p => p.name === name))
      .filter((p): p is Player => !!p);

    const battingScorecard: ScorecardPlayerBatting[] = battingPlayers.map(p => ({
      name: p.name,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      outStatus: "Not Out"
    }));

    // Identify specialists and opening bowlers
    let bowlers = bowlingPlayers
      .filter(p => p.role.includes('Bowler') || p.role.includes('All-rounder'))
      .sort((a, b) => {
        const aIsSpecialist = a.role === 'Bowler' ? 0 : 1;
        const bIsSpecialist = b.role === 'Bowler' ? 0 : 1;
        return aIsSpecialist - bIsSpecialist;
      });

    // Fallback if no bowlers/all-rounders selected (unlikely but safe)
    if (bowlers.length === 0) {
      bowlers = [bowlingPlayers[bowlingPlayers.length - 1]];
    }

    const bowlingScorecard: ScorecardPlayerBowling[] = bowlers.map(p => ({
      name: p.name,
      overs: 0,
      runs: 0,
      wickets: 0,
      economy: 0
    }));

    let totalRuns = 0;
    let totalWickets = 0;
    let totalBalls = 0;
    let strikerIdx = 0;
    let nonStrikerIdx = 1;
    let nextBatterIdx = 2;
    let lastBowlerName = "";
    const inningsCommentary: ScorecardOver[] = [];

    const bowlerOverCount: { [key: string]: number } = {};
    bowlers.forEach(b => bowlerOverCount[b.name] = 0);

    const SHOTS = ["cover drive", "pull shot", "flick", "straight drive", "square cut", "sweep", "loft over long on", "delicate late cut"];
    const DELIVERIES = ["good length", "short and wide", "full toss", "yorker", "back of a length", "slower ball", "bouncer"];

    for (let over = 1; over <= 20; over++) {
      if (totalWickets >= 10 || (target && totalRuns >= target)) break;

      // Bowler Selection Logic (Strict Rotation: No consecutive overs)
      let currentBowler: ScorecardPlayerBowling;
      const availableBowlers = bowlingScorecard.filter(b => bowlerOverCount[b.name] < 4 && b.name !== lastBowlerName);
      
      if (availableBowlers.length === 0) {
        // If no one else is available (rare), pick anyone who hasn't finished 4
        const anyAvailable = bowlingScorecard.filter(b => bowlerOverCount[b.name] < 4);
        currentBowler = anyAvailable[0] || bowlingScorecard[0];
      } else if (over <= 6) {
        // Powerplay: Rotate between top 2-3 bowlers
        currentBowler = availableBowlers[over % 3] || availableBowlers[0];
      } else if (over >= 16) {
        // Death: Rotate between best 2 bowlers
        currentBowler = [...availableBowlers].sort((a, b) => a.economy - b.economy)[0];
      } else {
        // Middle: Rotate between all available bowlers
        currentBowler = availableBowlers[Math.floor(Math.random() * availableBowlers.length)];
      }

      if (!currentBowler) {
        currentBowler = bowlingScorecard[0];
      }

      lastBowlerName = currentBowler.name;
      bowlerOverCount[currentBowler.name]++;
      let overRuns = 0;
      let overWickets = 0;
      let ballCommentaries: string[] = [];

      for (let ball = 1; ball <= 6; ball++) {
        if (totalWickets >= 10 || (target && totalRuns >= target)) break;

        totalBalls++;
        const striker = battingScorecard[strikerIdx];
        const nonStriker = battingScorecard[nonStrikerIdx];
        striker.balls++;

        const isDeath = over >= 16;
        const isPowerplay = over <= 6;
        
        let batterSkillFactor = 1.0;
        if (strikerIdx <= 2) batterSkillFactor = 1.3;
        else if (strikerIdx <= 5) batterSkillFactor = 1.1;
        else if (strikerIdx <= 7) batterSkillFactor = 0.8;
        else batterSkillFactor = 0.4;

        let wicketProb = 0.04 / batterSkillFactor;
        let sixProb = 0.05 * batterSkillFactor;
        let fourProb = 0.12 * batterSkillFactor;
        let dotProb = 0.30;

        if (isDeath) {
          wicketProb = 0.08 / batterSkillFactor;
          sixProb = 0.15 * batterSkillFactor;
          fourProb = 0.18 * batterSkillFactor;
          dotProb = 0.20;
        } else if (isPowerplay) {
          wicketProb = 0.03 / batterSkillFactor;
          sixProb = 0.08 * batterSkillFactor;
          fourProb = 0.20 * batterSkillFactor;
          dotProb = 0.35;
        }

        const rand = Math.random();
        let runsOnBall = 0;
        const delivery = DELIVERIES[Math.floor(Math.random() * DELIVERIES.length)];
        const shot = SHOTS[Math.floor(Math.random() * SHOTS.length)];

        if (rand < wicketProb) {
          overWickets++;
          totalWickets++;
          
          const wicketTypeRand = Math.random();
          if (wicketTypeRand < 0.7) {
            // Caught
            const fielders = bowlingPlayers.filter(p => p.name !== currentBowler.name);
            const fielder = fielders[Math.floor(Math.random() * fielders.length)]?.name || "fielder";
            striker.outStatus = `c ${fielder} b ${currentBowler.name}`;
            ballCommentaries.push(`${over-1}.${ball}: OUT! ${striker.name} tries a ${shot} but finds ${fielder} at deep mid-wicket. [${delivery}].`);
          } else if (wicketTypeRand < 0.85) {
            // Bowled
            striker.outStatus = `b ${currentBowler.name}`;
            ballCommentaries.push(`${over-1}.${ball}: OUT! Clean bowled! ${striker.name} beaten by a ${delivery}.`);
          } else {
            // LBW
            striker.outStatus = `lbw b ${currentBowler.name}`;
            ballCommentaries.push(`${over-1}.${ball}: OUT! Loud appeal and given! ${striker.name} trapped in front by a ${delivery}.`);
          }
          
          if (nextBatterIdx < battingPlayers.length) {
            strikerIdx = nextBatterIdx;
            nextBatterIdx++;
          } else {
            break;
          }
        } else if (rand < wicketProb + sixProb) {
          runsOnBall = 6;
          striker.runs += 6;
          striker.sixes++;
          ballCommentaries.push(`${over-1}.${ball}: SIX! ${striker.name} lofts the ${delivery} over the ropes with a massive ${shot}.`);
        } else if (rand < wicketProb + sixProb + fourProb) {
          runsOnBall = 4;
          striker.runs += 4;
          striker.fours++;
          ballCommentaries.push(`${over-1}.${ball}: FOUR! Beautifully timed ${shot} by ${striker.name} against a ${delivery}.`);
        } else if (rand < wicketProb + sixProb + fourProb + (1 - dotProb - wicketProb - sixProb - fourProb)) {
          const runRand = Math.random();
          if (runRand < 0.7) runsOnBall = 1;
          else if (runRand < 0.9) runsOnBall = 2;
          else runsOnBall = 3;
          
          striker.runs += runsOnBall;
          ballCommentaries.push(`${over-1}.${ball}: ${runsOnBall} run(s). ${striker.name} flicks the ${delivery} to the leg side.`);
          if (runsOnBall % 2 !== 0) {
            [strikerIdx, nonStrikerIdx] = [nonStrikerIdx, strikerIdx];
          }
        } else {
          runsOnBall = 0;
          ballCommentaries.push(`${over-1}.${ball}: Dot ball. ${striker.name} defends the ${delivery} back to ${currentBowler.name}.`);
        }

        overRuns += runsOnBall;
        totalRuns += runsOnBall;
        currentBowler.runs += runsOnBall;
      }

      currentBowler.overs++;
      currentBowler.wickets += overWickets;
      currentBowler.economy = Number((currentBowler.runs / currentBowler.overs).toFixed(2));

      inningsCommentary.push({
        over,
        runs: overRuns,
        wickets: overWickets,
        bowlerName: currentBowler.name,
        commentary: ballCommentaries.join(' ')
      });

      [strikerIdx, nonStrikerIdx] = [nonStrikerIdx, strikerIdx];
    }

    return { 
      total: totalRuns, 
      wickets: totalWickets, 
      overs: Math.floor(totalBalls / 6) + (totalBalls % 6) / 10, 
      batting: battingScorecard, 
      bowling: bowlingScorecard, 
      innings: inningsCommentary 
    };
  };

  const innings1 = simulateInnings(params.team1, params.team2, params.playing12Team1, params.playing12Team2);
  const innings2 = simulateInnings(params.team2, params.team1, params.playing12Team2, params.playing12Team1, innings1.total);

  // Calculate Man of the Match based on performance points
  const calculatePoints = (batting: ScorecardPlayerBatting[], bowling: ScorecardPlayerBowling[]) => {
    const pointsMap: { [key: string]: number } = {};
    batting.forEach(p => {
      pointsMap[p.name] = (pointsMap[p.name] || 0) + p.runs + (p.sixes * 2) + (p.fours);
    });
    bowling.forEach(p => {
      pointsMap[p.name] = (pointsMap[p.name] || 0) + (p.wickets * 25) + (p.overs * 2);
    });
    return pointsMap;
  };

  const p1 = calculatePoints(innings1.batting, innings2.bowling);
  const p2 = calculatePoints(innings2.batting, innings1.bowling);
  const allPoints = { ...p1 };
  Object.entries(p2).forEach(([name, pts]) => {
    allPoints[name] = (allPoints[name] || 0) + pts;
  });

  const sortedPoints = Object.entries(allPoints).sort((a, b) => b[1] - a[1]);
  const bestPlayerName = sortedPoints.length > 0 ? sortedPoints[0][0] : "N/A";
  const bestPlayerPoints = sortedPoints.length > 0 ? Math.round(sortedPoints[0][1]) : 0;

  const winner = innings2.total > innings1.total ? params.team2 : params.team1;

  return {
    matchSummary: `${winner} won by ${innings2.total > innings1.total ? (10 - innings2.wickets) + ' wickets' : (innings1.total - innings2.total) + ' runs'} at ${params.venue}.`,
    manOfTheMatch: `${bestPlayerName} (${bestPlayerPoints} performance points)`,
    team1: { name: params.team1, ...innings1 },
    team2: { name: params.team2, ...innings2 }
  };
};
