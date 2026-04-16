export interface SeasonStat {
  season: string;
  runs?: number;
  wickets?: number;
  matches: number;
}

export interface Player {
  name: string;
  role: string;
  isForeign?: boolean;
  stats: {
    matches: number;
    runs?: number;
    avg?: number;
    sr?: number;
    wickets?: number;
    economy?: number;
  };
  detailedStats?: SeasonStat[];
  bestAgainst?: string;
  strongAgainst?: string;
  weakness?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  players: Player[];
}

export const IPL_TEAMS: Team[] = [
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    color: "#FDB913",
    players: [
      { 
        name: "Ruturaj Gaikwad", 
        role: "Batsman", 
        stats: { matches: 95, runs: 3850, avg: 44.2, sr: 142.5 },
        detailedStats: [
          { season: "2026", runs: 245, matches: 6 },
          { season: "2025", runs: 505, matches: 14 },
          { season: "2024", runs: 583, matches: 14 },
          { season: "2023", runs: 590, matches: 16 },
          { season: "2022", runs: 368, matches: 14 },
          { season: "2021", runs: 635, matches: 16 }
        ],
        bestAgainst: "Gujarat Titans",
        strongAgainst: "Pace bowlers",
        weakness: "Left-arm spin"
      },
      { 
        name: "Sanju Samson", 
        role: "Wicketkeeper-Batsman", 
        stats: { matches: 195, runs: 5650, avg: 32.5, sr: 142.8 },
        detailedStats: [
          { season: "2026", runs: 185, matches: 6 },
          { season: "2025", runs: 515, matches: 14 },
          { season: "2024", runs: 531, matches: 15 }
        ],
        bestAgainst: "Sunrisers Hyderabad",
        strongAgainst: "Leg spin",
        weakness: "High pace bouncers"
      },
      { 
        name: "Ayush Mhatre", 
        role: "Batsman", 
        stats: { matches: 12, runs: 350, avg: 31.8, sr: 145.2 },
        detailedStats: [
          { season: "2026", runs: 120, matches: 5 },
          { season: "2025", runs: 230, matches: 7 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Off-spin",
        weakness: "In-swinging yorkers"
      },
      { 
        name: "Kartik Sharma", 
        role: "Batsman", 
        stats: { matches: 15, runs: 280, avg: 21.5, sr: 128.4 },
        detailedStats: [
          { season: "2026", runs: 85, matches: 4 },
          { season: "2025", runs: 195, matches: 11 }
        ],
        bestAgainst: "Punjab Kings",
        strongAgainst: "Medium pace",
        weakness: "Googly"
      },
      { 
        name: "MS Dhoni", 
        role: "Wicketkeeper-Batsman", 
        stats: { matches: 295, runs: 5650, avg: 38.8, sr: 140.2 },
        detailedStats: [
          { season: "2026", runs: 110, matches: 6 },
          { season: "2025", runs: 140, matches: 14 },
          { season: "2024", runs: 161, matches: 14 },
          { season: "2023", runs: 104, matches: 16 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Death bowling",
        weakness: "Slow left-arm"
      },
      { 
        name: "Shivam Dube", 
        role: "All-rounder", 
        stats: { matches: 80, runs: 2450, avg: 36.5, sr: 162.4 },
        detailedStats: [
          { season: "2026", runs: 180, matches: 6 },
          { season: "2025", runs: 420, matches: 14 },
          { season: "2024", runs: 396, matches: 14 },
          { season: "2023", runs: 418, matches: 16 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Spinners",
        weakness: "Short ball at pace"
      },
      { 
        name: "Dewald Brevis", 
        role: "Batsman", 
        isForeign: true, 
        stats: { matches: 35, runs: 850, avg: 28.5, sr: 148.2 },
        detailedStats: [
          { season: "2026", runs: 120, matches: 4 },
          { season: "2025", runs: 280, matches: 10 }
        ],
        bestAgainst: "Punjab Kings",
        strongAgainst: "Leg spin",
        weakness: "High pace"
      },
      { 
        name: "Sarfaraz Khan", 
        role: "Batsman", 
        stats: { matches: 65, runs: 1050, avg: 26.5, sr: 135.2 },
        detailedStats: [
          { season: "2026", runs: 140, matches: 6 },
          { season: "2025", runs: 260, matches: 12 }
        ],
        bestAgainst: "Delhi Capitals",
        strongAgainst: "Sweep shots",
        weakness: "Short ball"
      },
      { 
        name: "Jamie Overton", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 25, runs: 350, wickets: 28, economy: 8.8 },
        detailedStats: [
          { season: "2026", runs: 80, wickets: 6, matches: 6 },
          { season: "2025", runs: 120, wickets: 10, matches: 14 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Bounce",
        weakness: "Yorkers"
      },
      { 
        name: "Khaleel Ahmed", 
        role: "Bowler", 
        stats: { matches: 85, wickets: 115, economy: 8.2, sr: 17.5 },
        detailedStats: [
          { season: "2026", wickets: 8, matches: 6 },
          { season: "2025", wickets: 15, matches: 14 }
        ],
        bestAgainst: "Rajasthan Royals",
        strongAgainst: "Powerplay",
        weakness: "Death overs"
      },
      { 
        name: "Noor Ahmad", 
        role: "Bowler", 
        isForeign: true, 
        stats: { matches: 55, wickets: 65, economy: 7.4, sr: 18.2 },
        detailedStats: [
          { season: "2026", wickets: 7, matches: 6 },
          { season: "2025", wickets: 10, matches: 14 }
        ],
        bestAgainst: "Sunrisers Hyderabad",
        strongAgainst: "Googly",
        weakness: "Power hitters"
      },
      { name: "Nathan Ellis", role: "Bowler", isForeign: true, stats: { matches: 20, wickets: 25, economy: 8.8, sr: 15.5 } },
      { name: "Rahul Chahar", role: "Bowler", stats: { matches: 97, wickets: 98, economy: 7.4, sr: 22.2 } },
      { name: "Mukesh Choudhary", role: "Bowler", stats: { matches: 20, wickets: 24, economy: 9.0, sr: 16.5 } },
      { name: "Matt Henry", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 18, economy: 8.5, sr: 16.8 } },
      { name: "Akeal Hosein", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 12, economy: 7.2, sr: 20.5 } },
      { name: "Shreyas Gopal", role: "Bowler", stats: { matches: 52, wickets: 50, economy: 8.1, sr: 19.5 } },
      { name: "Gurjapneet Singh", role: "Bowler", stats: { matches: 5, wickets: 6, economy: 8.1, sr: 18.2 } },
      { name: "Ramakrishna Ghosh", role: "Bowler", stats: { matches: 5, runs: 35, wickets: 4, economy: 8.9 } }
    ]
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    color: "#004BA0",
    players: [
      { 
        name: "Rohit Sharma", 
        role: "Batsman", 
        stats: { matches: 285, runs: 7450, avg: 32.2, sr: 138.5 },
        detailedStats: [
          { season: "2026", runs: 210, matches: 6 },
          { season: "2025", runs: 390, matches: 14 },
          { season: "2024", runs: 417, matches: 14 },
          { season: "2023", runs: 332, matches: 16 },
          { season: "2022", runs: 268, matches: 14 },
          { season: "2021", runs: 381, matches: 13 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Pull shot",
        weakness: "Left-arm pace"
      },
      { 
        name: "Ryan Rickelton", 
        role: "Wicketkeeper-Batsman", 
        isForeign: true, 
        stats: { matches: 28, runs: 850, avg: 32.5, sr: 158.4 },
        detailedStats: [
          { season: "2026", runs: 180, matches: 6 },
          { season: "2025", runs: 320, matches: 12 }
        ],
        bestAgainst: "Delhi Capitals",
        strongAgainst: "Powerplay",
        weakness: "Off-spin"
      },
      { 
        name: "Quinton de Kock", 
        role: "Wicketkeeper-Batsman", 
        isForeign: true, 
        stats: { matches: 138, runs: 4450, avg: 34.2, sr: 138.5 },
        detailedStats: [
          { season: "2026", runs: 195, matches: 6 },
          { season: "2025", runs: 405, matches: 14 },
          { season: "2024", runs: 250, matches: 11 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Pace",
        weakness: "Off-spin"
      },
      { 
        name: "Suryakumar Yadav", 
        role: "Batsman", 
        stats: { matches: 182, runs: 5150, avg: 36.8, sr: 155.2 },
        detailedStats: [
          { season: "2026", runs: 280, matches: 6 },
          { season: "2025", runs: 520, matches: 14 },
          { season: "2024", runs: 345, matches: 11 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "360 degree shots",
        weakness: "Slow bouncers"
      },
      { 
        name: "Tilak Varma", 
        role: "Batsman", 
        stats: { matches: 68, runs: 2250, avg: 43.8, sr: 150.2 },
        detailedStats: [
          { season: "2026", runs: 215, matches: 6 },
          { season: "2025", runs: 385, matches: 14 },
          { season: "2024", runs: 416, matches: 13 }
        ],
        bestAgainst: "Chennai Super Kings",
        strongAgainst: "Spin",
        weakness: "High pace"
      },
      { 
        name: "Hardik Pandya", 
        role: "All-rounder", 
        stats: { matches: 166, runs: 3450, wickets: 88, economy: 8.9 },
        detailedStats: [
          { season: "2026", runs: 165, wickets: 6, matches: 6 },
          { season: "2025", runs: 335, wickets: 10, matches: 14 },
          { season: "2024", runs: 216, wickets: 11, matches: 14 }
        ],
        bestAgainst: "Rajasthan Royals",
        strongAgainst: "Finishing",
        weakness: "Leg spin"
      },
      { name: "Will Jacks", role: "All-rounder", isForeign: true, stats: { matches: 36, runs: 1050, avg: 36.8, sr: 180.2 } },
      { name: "Mitchell Santner", role: "All-rounder", isForeign: true, stats: { matches: 25, runs: 220, wickets: 22, economy: 6.8 } },
      { name: "Sherfane Rutherford", role: "All-rounder", isForeign: true, stats: { matches: 15, runs: 150, avg: 22.5, sr: 155.2 } },
      { name: "Raj Angad Bawa", role: "All-rounder", stats: { matches: 10, runs: 100, wickets: 5, economy: 9.2 } },
      { name: "Atharva Ankolekar", role: "All-rounder", stats: { matches: 5, runs: 45, wickets: 4, economy: 7.8 } },
      { 
        name: "Jasprit Bumrah", 
        role: "Bowler", 
        stats: { matches: 148, wickets: 192, economy: 7.2, sr: 18.2 },
        detailedStats: [
          { season: "2024", wickets: 20, matches: 13 },
          { season: "2023", wickets: 0, matches: 0 },
          { season: "2022", wickets: 15, matches: 14 },
          { season: "2021", wickets: 21, matches: 14 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Opening Batsmen",
        weakness: "Left-handers (occasionally)"
      },
      { 
        name: "Trent Boult", 
        role: "Bowler", 
        isForeign: true, 
        stats: { matches: 130, wickets: 165, economy: 8.2, sr: 18.5 },
        detailedStats: [
          { season: "2026", wickets: 8, matches: 6 },
          { season: "2025", wickets: 12, matches: 14 },
          { season: "2024", wickets: 16, matches: 15 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "In-swing",
        weakness: "Death overs"
      },
      { 
        name: "Deepak Chahar", 
        role: "Bowler", 
        stats: { matches: 115, wickets: 115, economy: 8.1, sr: 20.2 },
        detailedStats: [
          { season: "2026", wickets: 6, matches: 6 },
          { season: "2025", wickets: 11, matches: 14 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Powerplay swing",
        weakness: "Injury prone"
      },
      { 
        name: "Shardul Thakur", 
        role: "Bowler", 
        stats: { matches: 110, wickets: 105, economy: 9.1, sr: 18.8 },
        detailedStats: [
          { season: "2026", wickets: 7, matches: 6 },
          { season: "2025", wickets: 9, matches: 14 }
        ],
        bestAgainst: "Punjab Kings",
        strongAgainst: "Partnership breaker",
        weakness: "Economy rate"
      },
      { name: "Mayank Markande", role: "Bowler", stats: { matches: 58, wickets: 58, economy: 8.2, sr: 20.0 } },
      { name: "Corbin Bosch", role: "Bowler", isForeign: true, stats: { matches: 10, runs: 120, wickets: 8, economy: 8.8 } },
      { name: "Allah Ghafanzar", role: "Bowler", isForeign: true, stats: { matches: 5, wickets: 6, economy: 6.5, sr: 18.5 } },
      { name: "Ashwani Kumar", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.5, sr: 20.2 } },
      { name: "Mohammad Izhar", role: "Bowler", stats: { matches: 5, wickets: 3, economy: 9.2, sr: 25.0 } }
    ]
  },
  {
    id: "rcb",
    name: "Royal Challengers Bengaluru",
    shortName: "RCB",
    color: "#2B2A29",
    players: [
      { 
        name: "Virat Kohli", 
        role: "Batsman", 
        stats: { matches: 280, runs: 9500, avg: 40.2, sr: 136.5 },
        detailedStats: [
          { season: "2026", runs: 260, matches: 6 },
          { season: "2025", runs: 740, matches: 15 },
          { season: "2024", runs: 741, matches: 15 },
          { season: "2023", runs: 639, matches: 14 },
          { season: "2022", runs: 341, matches: 16 },
          { season: "2021", runs: 405, matches: 15 }
        ],
        bestAgainst: "Delhi Capitals",
        strongAgainst: "Cover drive",
        weakness: "Outside off stump"
      },
      { 
        name: "Phil Salt", 
        role: "Wicketkeeper-Batsman", 
        isForeign: true, 
        stats: { matches: 52, runs: 1650, avg: 34.2, sr: 172.5 },
        detailedStats: [
          { season: "2026", runs: 210, matches: 6 },
          { season: "2025", runs: 390, matches: 14 },
          { season: "2024", runs: 435, matches: 12 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Powerplay",
        weakness: "Left-arm spin"
      },
      { 
        name: "Rajat Patidar", 
        role: "Batsman", 
        stats: { matches: 55, runs: 1850, avg: 42.5, sr: 152.4 },
        detailedStats: [
          { season: "2026", runs: 195, matches: 6 },
          { season: "2025", runs: 405, matches: 14 },
          { season: "2024", runs: 395, matches: 15 }
        ],
        bestAgainst: "Lucknow Super Giants",
        strongAgainst: "Spin",
        weakness: "High pace"
      },
      { 
        name: "Bhuvneshwar Kumar", 
        role: "Bowler", 
        stats: { matches: 202, wickets: 225, economy: 7.4, sr: 20.8 },
        detailedStats: [
          { season: "2026", wickets: 8, matches: 6 },
          { season: "2025", wickets: 15, matches: 14 },
          { season: "2024", wickets: 11, matches: 14 }
        ],
        bestAgainst: "Punjab Kings",
        strongAgainst: "Swing",
        weakness: "Death overs"
      },
      { name: "Josh Hazlewood", role: "Bowler", isForeign: true, stats: { matches: 35, wickets: 45, economy: 7.9, sr: 18.5 } },
      { name: "Rasikh Dar", role: "Bowler", stats: { matches: 15, wickets: 18, economy: 9.5, sr: 14.2 } },
      { name: "Suyash Sharma", role: "Bowler", stats: { matches: 39, wickets: 38, economy: 8.1, sr: 22.2 } },
      { name: "Nuwan Thushara", role: "Bowler", isForeign: true, stats: { matches: 12, wickets: 15, economy: 8.9, sr: 14.5 } },
      { name: "Jacob Duffy", role: "Bowler", isForeign: true, stats: { matches: 5, wickets: 8, economy: 8.1, sr: 15.5 } },
      { name: "Mangesh Yadav", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.8, sr: 20.2 } },
      { name: "Abhinandan Singh", role: "Bowler", stats: { matches: 5, wickets: 3, economy: 8.5, sr: 20.0 } },
      { name: "Satvik Deswal", role: "Bowler", stats: { matches: 5, runs: 35, avg: 12.0, sr: 110.2 } },
      { name: "Vicky Ostwal", role: "Bowler", stats: { matches: 10, wickets: 8, economy: 7.8, sr: 22.5 } },
      { name: "Kanishk Chouhan", role: "Bowler", stats: { matches: 5, runs: 35, wickets: 2, economy: 9.2 } }
    ]
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    color: "#3A225D",
    players: [
      { name: "Ajinkya Rahane", role: "Batsman", stats: { matches: 172, runs: 4400, avg: 30.5, sr: 123.5 } },
      { 
        name: "Rachin Ravindra", 
        role: "Batsman", 
        isForeign: true, 
        stats: { matches: 55, runs: 1650, avg: 34.5, sr: 155.2 },
        detailedStats: [
          { season: "2026", runs: 210, matches: 6 },
          { season: "2025", runs: 490, matches: 14 },
          { season: "2024", runs: 222, matches: 10 }
        ],
        bestAgainst: "Chennai Super Kings",
        strongAgainst: "Spin",
        weakness: "High pace"
      },
      { name: "Angkrish Raghuvanshi", role: "Batsman", stats: { matches: 22, runs: 450, avg: 28.5, sr: 152.4 } },
      { name: "Finn Allen", role: "Wicketkeeper-Batsman", isForeign: true, stats: { matches: 15, runs: 450, avg: 30.5, sr: 175.2 } },
      { name: "Sarthak Ranjan", role: "Batsman", stats: { matches: 5, runs: 45, avg: 15.0, sr: 125.2 } },
      { 
        name: "Rinku Singh", 
        role: "Batsman", 
        stats: { matches: 75, runs: 2150, avg: 42.5, sr: 152.4 },
        detailedStats: [
          { season: "2026", runs: 160, matches: 6 },
          { season: "2025", runs: 440, matches: 14 },
          { season: "2024", runs: 168, matches: 14 },
          { season: "2023", runs: 474, matches: 14 }
        ],
        bestAgainst: "Gujarat Titans",
        strongAgainst: "Finishing",
        weakness: "High pace bouncers"
      },
      { 
        name: "Sunil Narine", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 205, runs: 2450, wickets: 215, economy: 6.7 },
        detailedStats: [
          { season: "2026", runs: 140, wickets: 8, matches: 6 },
          { season: "2025", runs: 460, wickets: 12, matches: 14 },
          { season: "2024", runs: 488, wickets: 17, matches: 14 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Mystery spin",
        weakness: "Short ball"
      },
      { 
        name: "Varun Chakaravarthy", 
        role: "Bowler", 
        stats: { matches: 100, wickets: 135, economy: 7.4, sr: 18.5 },
        detailedStats: [
          { season: "2026", wickets: 12, matches: 6 },
          { season: "2025", wickets: 18, matches: 14 },
          { season: "2024", wickets: 21, matches: 14 }
        ],
        bestAgainst: "Delhi Capitals",
        strongAgainst: "Variations",
        weakness: "Power hitters"
      },
      { name: "Matheesha Pathirana", role: "Bowler", isForeign: true, stats: { matches: 42, wickets: 68, economy: 7.9, sr: 13.8 } },
      { name: "Harshit Rana", role: "Bowler", stats: { matches: 36, wickets: 42, economy: 9.0, sr: 18.2 } },
      { name: "Mustafizur Rahman", role: "Bowler", isForeign: true, stats: { matches: 55, wickets: 75, economy: 8.0, sr: 16.5 } },
      { name: "Vaibhav Arora", role: "Bowler", stats: { matches: 29, wickets: 32, economy: 9.3, sr: 17.2 } },
      { name: "Umran Malik", role: "Bowler", stats: { matches: 35, wickets: 42, economy: 9.5, sr: 15.2 } },
      { name: "Kartik Tyagi", role: "Bowler", stats: { matches: 25, wickets: 22, economy: 9.5, sr: 20.5 } },
      { name: "Prashant Solanki", role: "Bowler", stats: { matches: 10, wickets: 8, economy: 8.2, sr: 22.5 } },
      { name: "Tejasvi Singh", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.5, sr: 20.2 } }
    ]
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    color: "#ED1B24",
    players: [
      { name: "Prabhsimran Singh", role: "Wicketkeeper-Batsman", stats: { matches: 48, runs: 1050, avg: 23.8, sr: 148.2 } },
      { name: "Priyansh Arya", role: "Batsman", stats: { matches: 5, runs: 150, avg: 30.0, sr: 165.5 } },
      { name: "Harnoor Pannu", role: "Batsman", stats: { matches: 5, runs: 120, avg: 24.0, sr: 125.5 } },
      { name: "Pyala Avinash", role: "Batsman", stats: { matches: 5, runs: 85, avg: 17.0, sr: 130.2 } },
      { 
        name: "Shreyas Iyer", 
        role: "Batsman", 
        stats: { matches: 155, runs: 4650, avg: 34.8, sr: 132.5 },
        detailedStats: [
          { season: "2026", runs: 210, matches: 6 },
          { season: "2025", runs: 540, matches: 14 },
          { season: "2024", runs: 351, matches: 14 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Captaincy",
        weakness: "Short ball"
      },
      { 
        name: "Marcus Stoinis", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 135, runs: 3150, wickets: 75, economy: 9.1 },
        detailedStats: [
          { season: "2026", runs: 180, wickets: 6, matches: 6 },
          { season: "2025", runs: 420, wickets: 12, matches: 14 },
          { season: "2024", runs: 388, wickets: 4, matches: 14 }
        ],
        bestAgainst: "Chennai Super Kings",
        strongAgainst: "Power hitting",
        weakness: "Leg spin"
      },
      { 
        name: "Azmatullah Omarzai", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 45, runs: 650, wickets: 32, economy: 8.5 },
        detailedStats: [
          { season: "2026", runs: 110, wickets: 6, matches: 6 },
          { season: "2025", runs: 240, wickets: 12, matches: 14 }
        ],
        bestAgainst: "Sunrisers Hyderabad",
        strongAgainst: "New ball",
        weakness: "Death overs"
      },
      { 
        name: "Marco Jansen", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 55, runs: 450, wickets: 68, economy: 8.2 },
        detailedStats: [
          { season: "2026", wickets: 10, matches: 6 },
          { season: "2025", wickets: 18, matches: 14 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Bounce",
        weakness: "Death overs"
      },
      { 
        name: "Harpreet Brar", 
        role: "All-rounder", 
        stats: { matches: 75, runs: 450, wickets: 62, economy: 7.0 },
        detailedStats: [
          { season: "2026", wickets: 8, matches: 6 },
          { season: "2025", wickets: 12, matches: 14 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Accuracy",
        weakness: "Power hitters"
      },
      { name: "Nehal Wadhera", role: "Batsman", stats: { matches: 28, runs: 450, avg: 28.2, sr: 146.8 } },
      { name: "Musheer Khan", role: "Batsman", stats: { matches: 10, runs: 250, avg: 25.0, sr: 135.2 } },
      { name: "Vishnu Vinod", role: "Wicketkeeper-Batsman", stats: { matches: 15, runs: 250, avg: 22.5, sr: 155.2 } },
      { name: "Suryansh Shedge", role: "Batsman", stats: { matches: 5, runs: 45, avg: 15.0, sr: 135.2 } },
      { 
        name: "Shashank Singh", 
        role: "All-rounder", 
        stats: { matches: 55, runs: 1450, avg: 38.5, sr: 165.2 },
        detailedStats: [
          { season: "2026", runs: 145, matches: 6 },
          { season: "2025", runs: 355, matches: 14 },
          { season: "2024", runs: 354, matches: 14 }
        ],
        bestAgainst: "Gujarat Titans",
        strongAgainst: "Finishing",
        weakness: "Leg spin"
      },
      { 
        name: "Arshdeep Singh", 
        role: "Bowler", 
        stats: { matches: 95, wickets: 125, economy: 8.4, sr: 17.2 },
        detailedStats: [
          { season: "2026", wickets: 10, matches: 6 },
          { season: "2025", wickets: 17, matches: 14 },
          { season: "2024", wickets: 19, matches: 14 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Death overs",
        weakness: "Powerplay"
      },
      { 
        name: "Yuzvendra Chahal", 
        role: "Bowler", 
        stats: { matches: 188, wickets: 245, economy: 7.6, sr: 16.8 },
        detailedStats: [
          { season: "2026", wickets: 8, matches: 6 },
          { season: "2025", wickets: 12, matches: 14 },
          { season: "2024", wickets: 18, matches: 14 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Leg spin",
        weakness: "Small grounds"
      },
      { name: "Xavier Bartlett", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 18, economy: 8.5, sr: 16.2 } },
      { name: "Lockie Ferguson", role: "Bowler", isForeign: true, stats: { matches: 55, wickets: 68, economy: 8.8, sr: 15.2 } },
      { name: "Vyshak Vijaykumar", role: "Bowler", stats: { matches: 15, wickets: 18, economy: 9.2, sr: 14.5 } },
      { name: "Yash Thakur", role: "Bowler", stats: { matches: 37, wickets: 38, economy: 9.1, sr: 14.0 } },
      { name: "Pravin Dubey", role: "Bowler", stats: { matches: 15, wickets: 12, economy: 7.8, sr: 22.5 } },
      { name: "Vishal Nishad", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.5, sr: 20.2 } },
      { name: "Ben Dwarshuis", role: "Bowler", isForeign: true, stats: { matches: 10, wickets: 12, economy: 8.2, sr: 16.5 } }
    ]
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    color: "#EA1B85",
    players: [
      { 
        name: "Yashasvi Jaiswal", 
        role: "Batsman", 
        stats: { matches: 80, runs: 3250, avg: 42.5, sr: 158.4 },
        detailedStats: [
          { season: "2026", runs: 280, matches: 6 },
          { season: "2025", runs: 520, matches: 14 },
          { season: "2024", runs: 435, matches: 15 },
          { season: "2023", runs: 625, matches: 14 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Powerplay",
        weakness: "Left-arm spin"
      },
      { 
        name: "Riyan Parag", 
        role: "All-rounder", 
        stats: { matches: 95, runs: 2450, wickets: 18, economy: 9.5 },
        detailedStats: [
          { season: "2026", runs: 210, matches: 6 },
          { season: "2025", runs: 490, matches: 14 },
          { season: "2024", runs: 573, matches: 15 }
        ],
        bestAgainst: "Delhi Capitals",
        strongAgainst: "Spin",
        weakness: "High pace"
      },
      { 
        name: "Ravindra Jadeja", 
        role: "All-rounder", 
        stats: { matches: 270, runs: 3450, wickets: 195, economy: 7.3 },
        detailedStats: [
          { season: "2026", runs: 120, wickets: 6, matches: 6 },
          { season: "2025", runs: 230, wickets: 12, matches: 14 },
          { season: "2024", runs: 267, wickets: 8, matches: 14 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Left-arm spin",
        weakness: "Off-spin"
      },
      { 
        name: "Sam Curran", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 95, runs: 1650, wickets: 95, economy: 9.4 },
        detailedStats: [
          { season: "2026", runs: 120, wickets: 8, matches: 6 },
          { season: "2025", runs: 380, wickets: 12, matches: 14 },
          { season: "2024", runs: 270, wickets: 16, matches: 13 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "All-round skills",
        weakness: "Death overs"
      },
      { name: "Dasun Shanaka", role: "All-rounder", isForeign: true, stats: { matches: 15, runs: 250, wickets: 8, economy: 8.8 } },
      { name: "Yudhvir Singh Charak", role: "All-rounder", stats: { matches: 10, runs: 85, wickets: 6, economy: 9.2 } },
      { name: "Wanindu Hasaranga", role: "All-rounder", isForeign: true, stats: { matches: 35, runs: 250, wickets: 45, economy: 7.5 } },
      { name: "Vignesh Puthur", role: "All-rounder", stats: { matches: 5, wickets: 3, economy: 8.5, sr: 25.0 } },
      { name: "Brijesh Sharma", role: "All-rounder", stats: { matches: 5, runs: 35, wickets: 2, economy: 8.9 } },
      { name: "Yash Raj Punja", role: "All-rounder", stats: { matches: 5, runs: 45, avg: 15.0, sr: 110.2 } },
      { name: "Ravi Bishnoi", role: "Bowler", stats: { matches: 80, wickets: 92, economy: 7.3, sr: 21.2 } },
      { 
        name: "Jofra Archer", 
        role: "Bowler", 
        isForeign: true, 
        stats: { matches: 65, wickets: 85, economy: 7.2, sr: 16.5 },
        detailedStats: [
          { season: "2026", wickets: 10, matches: 6 },
          { season: "2025", wickets: 18, matches: 14 },
          { season: "2024", wickets: 0, matches: 0 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Extreme pace",
        weakness: "Injury prone"
      },
      { name: "Sandeep Sharma", role: "Bowler", stats: { matches: 144, wickets: 162, economy: 7.7, sr: 20.0 } },
      { name: "Tushar Deshpande", role: "Bowler", stats: { matches: 51, wickets: 58, economy: 9.1, sr: 16.2 } },
      { name: "Nandre Burger", role: "Bowler", isForeign: true, stats: { matches: 34, wickets: 38, economy: 9.1, sr: 17.2 } },
      { name: "Kwena Maphaka", role: "Bowler", isForeign: true, stats: { matches: 10, wickets: 12, economy: 9.5, sr: 14.2 } },
      { name: "Maheesh Theekshana", role: "Bowler", isForeign: true, stats: { matches: 35, wickets: 42, economy: 7.5, sr: 19.5 } },
      { name: "Adam Milne", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 18, economy: 8.2, sr: 18.5 } },
      { name: "Kuldeep Sen", role: "Bowler", stats: { matches: 25, wickets: 28, economy: 9.2, sr: 16.5 } },
      { name: "Sushant Mishra", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 9.2, sr: 22.5 } },
      { name: "Fazalhaq Farooqi", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 20, economy: 8.1, sr: 16.8 } },
      { name: "Kumar Kartikeya", role: "Bowler", stats: { matches: 15, wickets: 12, economy: 7.8, sr: 22.5 } },
      { name: "Akash Madhwal", role: "Bowler", stats: { matches: 15, wickets: 18, economy: 9.5, sr: 14.5 } }
    ]
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    color: "#F26522",
    players: [
      { 
        name: "Travis Head", 
        role: "Batsman", 
        isForeign: true, 
        stats: { matches: 55, runs: 2150, avg: 42.5, sr: 192.4 },
        detailedStats: [
          { season: "2026", runs: 290, matches: 6 },
          { season: "2025", runs: 510, matches: 14 },
          { season: "2024", runs: 567, matches: 15 }
        ],
        bestAgainst: "Delhi Capitals",
        strongAgainst: "Powerplay",
        weakness: "Slow left-arm"
      },
      { 
        name: "Abhishek Sharma", 
        role: "Batsman", 
        stats: { matches: 90, runs: 2850, avg: 32.5, sr: 175.2 },
        detailedStats: [
          { season: "2026", runs: 240, matches: 6 },
          { season: "2025", runs: 560, matches: 14 },
          { season: "2024", runs: 484, matches: 16 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Spin",
        weakness: "High pace"
      },
      { 
        name: "Heinrich Klaasen", 
        role: "Wicketkeeper-Batsman", 
        isForeign: true, 
        stats: { matches: 62, runs: 2450, avg: 49.5, sr: 182.4 },
        detailedStats: [
          { season: "2026", runs: 210, matches: 6 },
          { season: "2025", runs: 590, matches: 14 },
          { season: "2024", runs: 479, matches: 16 }
        ],
        bestAgainst: "Rajasthan Royals",
        strongAgainst: "Spin",
        weakness: "Wide yorkers"
      },
      { 
        name: "Pat Cummins", 
        role: "All-rounder", 
        isForeign: true, 
        stats: { matches: 85, wickets: 105, economy: 8.1, sr: 18.5 },
        detailedStats: [
          { season: "2026", wickets: 10, matches: 6 },
          { season: "2025", wickets: 13, matches: 14 },
          { season: "2024", wickets: 18, matches: 16 }
        ],
        bestAgainst: "Chennai Super Kings",
        strongAgainst: "Captaincy",
        weakness: "Flat tracks"
      },
      { name: "Kamindu Mendis", role: "All-rounder", isForeign: true, stats: { matches: 15, runs: 350, wickets: 8, economy: 7.8 } },
      { name: "Jack Edwards", role: "All-rounder", isForeign: true, stats: { matches: 10, runs: 150, wickets: 6, economy: 8.5 } },
      { name: "Harsh Dubey", role: "All-rounder", stats: { matches: 5, runs: 45, wickets: 3, economy: 8.2 } },
      { name: "Amit Kumar", role: "All-rounder", stats: { matches: 5, runs: 35, wickets: 2, economy: 8.8 } },
      { name: "Harshal Patel", role: "Bowler", stats: { matches: 119, wickets: 158, economy: 8.4, sr: 16.0 } },
      { name: "Praful Hinge", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.5, sr: 18.0 } },
      { name: "Krains Fuletra", role: "Bowler", stats: { matches: 5, wickets: 3, economy: 8.2, sr: 20.0 } },
      { name: "Sakib Hussain", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 9.2, sr: 20.5 } },
      { name: "Shivam Mavi", role: "Bowler", stats: { matches: 35, wickets: 32, economy: 8.5, sr: 18.5 } },
      { name: "Brydon Carse", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 18, economy: 8.2, sr: 16.5 } },
      { name: "Jaydev Unadkat", role: "Bowler", stats: { matches: 122, wickets: 122, economy: 8.7, sr: 20.2 } },
      { name: "Eshan Malinga", role: "Bowler", isForeign: true, stats: { matches: 5, wickets: 4, economy: 9.5, sr: 15.5 } },
      { name: "Zeeshan Ansari", role: "Bowler", stats: { matches: 5, wickets: 3, economy: 8.1, sr: 22.5 } },
      { name: "Onkar Tarmale", role: "Bowler", stats: { matches: 5, wickets: 2, economy: 8.8, sr: 25.0 } },
      { name: "Shivang Kumar", role: "Bowler", stats: { matches: 5, runs: 45, avg: 15.0, sr: 120.2 } },
      { name: "Murugan Ashwin", role: "Bowler", stats: { matches: 45, wickets: 38, economy: 7.8, sr: 22.5 } }
    ]
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    color: "#00008B",
    players: [
      { 
        name: "KL Rahul", 
        role: "Wicketkeeper-Batsman", 
        stats: { matches: 160, runs: 6150, avg: 45.2, sr: 138.5 },
        detailedStats: [
          { season: "2026", runs: 240, matches: 6 },
          { season: "2025", runs: 710, matches: 14 },
          { season: "2024", runs: 520, matches: 14 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Technique",
        weakness: "Left-arm pace"
      },
      { 
        name: "Tristan Stubbs", 
        role: "Wicketkeeper-Batsman", 
        isForeign: true, 
        stats: { matches: 58, runs: 1850, avg: 48.5, sr: 192.4 },
        detailedStats: [
          { season: "2026", runs: 260, matches: 6 },
          { season: "2025", runs: 440, matches: 14 },
          { season: "2024", runs: 378, matches: 14 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Power hitting",
        weakness: "Leg spin"
      },
      { 
        name: "Axar Patel", 
        role: "All-rounder", 
        stats: { matches: 180, runs: 2450, wickets: 165, economy: 7.2 },
        detailedStats: [
          { season: "2026", runs: 140, wickets: 8, matches: 6 },
          { season: "2025", runs: 360, wickets: 15, matches: 14 },
          { season: "2024", runs: 235, wickets: 11, matches: 14 }
        ],
        bestAgainst: "Punjab Kings",
        strongAgainst: "Control",
        weakness: "Power hitters"
      },
      { 
        name: "Kuldeep Yadav", 
        role: "Bowler", 
        stats: { matches: 115, wickets: 145, economy: 7.8, sr: 19.5 },
        detailedStats: [
          { season: "2026", wickets: 12, matches: 6 },
          { season: "2025", wickets: 21, matches: 14 },
          { season: "2024", wickets: 16, matches: 11 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Variations",
        weakness: "Small grounds"
      },
      { name: "Mitchell Starc", role: "Bowler", isForeign: true, stats: { matches: 55, wickets: 72, economy: 8.1, sr: 16.5 } },
      { name: "T. Natarajan", role: "Bowler", stats: { matches: 75, wickets: 85, economy: 8.6, sr: 21.0 } },
      { name: "Mukesh Kumar", role: "Bowler", stats: { matches: 38, wickets: 38, economy: 10.0, sr: 25.2 } },
      { name: "Lungi Ngidi", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 25, economy: 8.3, sr: 15.2 } },
      { name: "Kyle Jamieson", role: "Bowler", isForeign: true, stats: { matches: 10, wickets: 12, economy: 8.5, sr: 18.5 } },
      { name: "Dushmantha Chameera", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 12, economy: 8.5, sr: 22.5 } },
      { name: "Madhav Tiwari", role: "Bowler", stats: { matches: 5, wickets: 2, economy: 9.2, sr: 25.0 } },
      { name: "Sahil Parikh", role: "Bowler", stats: { matches: 5, runs: 35, avg: 12.0, sr: 110.2 } },
      { name: "Manvanth Kumar", role: "Bowler", stats: { matches: 5, runs: 45, wickets: 3, economy: 8.8 } }
    ]
  },
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "GT",
    color: "#1B2133",
    players: [
      { 
        name: "Shubman Gill", 
        role: "Batsman", 
        stats: { matches: 135, runs: 5250, avg: 42.5, sr: 138.5 },
        detailedStats: [
          { season: "2026", runs: 280, matches: 6 },
          { season: "2025", runs: 610, matches: 14 },
          { season: "2024", runs: 426, matches: 12 },
          { season: "2023", runs: 890, matches: 17 }
        ],
        bestAgainst: "Mumbai Indians",
        strongAgainst: "Technique",
        weakness: "Left-arm spin"
      },
      { 
        name: "Sai Sudharsan", 
        role: "Batsman", 
        stats: { matches: 58, runs: 2450, avg: 48.5, sr: 142.4 },
        detailedStats: [
          { season: "2026", runs: 240, matches: 6 },
          { season: "2025", runs: 560, matches: 14 },
          { season: "2024", runs: 527, matches: 12 }
        ],
        bestAgainst: "Chennai Super Kings",
        strongAgainst: "Consistency",
        weakness: "High pace"
      },
      { 
        name: "Rashid Khan", 
        role: "Bowler", 
        isForeign: true, 
        stats: { matches: 155, runs: 1050, wickets: 215, economy: 6.6 },
        detailedStats: [
          { season: "2026", wickets: 10, matches: 6 },
          { season: "2025", wickets: 17, matches: 14 },
          { season: "2024", wickets: 10, matches: 12 }
        ],
        bestAgainst: "Kolkata Knight Riders",
        strongAgainst: "Leg spin",
        weakness: "Power hitters"
      },
      { name: "Mohammed Siraj", role: "Bowler", stats: { matches: 107, wickets: 112, economy: 8.4, sr: 20.2 } },
      { name: "Kagiso Rabada", role: "Bowler", isForeign: true, stats: { matches: 97, wickets: 148, economy: 8.2, sr: 14.2 } },
      { name: "Prasidh Krishna", role: "Bowler", stats: { matches: 51, wickets: 49, economy: 8.9, sr: 18.5 } },
      { name: "Mohit Sharma", role: "Bowler", stats: { matches: 128, wickets: 158, economy: 8.2, sr: 16.5 } },
      { name: "Spencer Johnson", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 18, economy: 8.5, sr: 16.2 } },
      { name: "Luke Wood", role: "Bowler", isForeign: true, stats: { matches: 15, wickets: 18, economy: 8.5, sr: 16.8 } },
      { name: "Manav Suthar", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 7.8, sr: 20.2 } },
      { name: "Gurnoor Brar", role: "Bowler", stats: { matches: 5, wickets: 3, economy: 9.2, sr: 25.0 } },
      { name: "Ishant Sharma", role: "Bowler", stats: { matches: 105, wickets: 95, economy: 8.1, sr: 22.5 } },
      { name: "Ashok Sharma", role: "Bowler", stats: { matches: 5, wickets: 3, economy: 9.2, sr: 22.5 } },
      { name: "Prithvi Raj Yarra", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.8, sr: 20.2 } }
    ]
  },
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    color: "#0057E7",
    players: [
      { name: "Aiden Markram", role: "Batsman", isForeign: true, stats: { matches: 61, runs: 1450, avg: 31.8, sr: 134.5 } },
      { name: "Josh Inglis", role: "Wicketkeeper-Batsman", isForeign: true, stats: { matches: 15, runs: 450, avg: 32.5, sr: 155.2 } },
      { name: "Matthew Breetzke", role: "Batsman", isForeign: true, stats: { matches: 5, runs: 150, avg: 30.0, sr: 142.5 } },
      { name: "Himmat Singh", role: "Batsman", stats: { matches: 5, runs: 45, avg: 15.0, sr: 115.2 } },
      { 
        name: "Rishabh Pant", 
        role: "Wicketkeeper-Batsman", 
        stats: { matches: 142, runs: 4850, avg: 36.8, sr: 152.4 },
        detailedStats: [
          { season: "2026", runs: 240, matches: 6 },
          { season: "2025", runs: 460, matches: 14 },
          { season: "2024", runs: 446, matches: 13 }
        ],
        bestAgainst: "Chennai Super Kings",
        strongAgainst: "Aggression",
        weakness: "Outside off stump"
      },
      { 
        name: "Nicholas Pooran", 
        role: "Wicketkeeper-Batsman", 
        isForeign: true, 
        stats: { matches: 105, runs: 3250, avg: 32.5, sr: 168.4 },
        detailedStats: [
          { season: "2026", runs: 260, matches: 6 },
          { season: "2025", runs: 440, matches: 14 },
          { season: "2024", runs: 499, matches: 14 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Power hitting",
        weakness: "Off-spin"
      },
      { 
        name: "Mayank Yadav", 
        role: "Bowler", 
        stats: { matches: 45, wickets: 75, economy: 7.2, sr: 12.8 },
        detailedStats: [
          { season: "2026", wickets: 12, matches: 6 },
          { season: "2025", wickets: 18, matches: 14 },
          { season: "2024", wickets: 7, matches: 4 }
        ],
        bestAgainst: "Royal Challengers Bengaluru",
        strongAgainst: "Extreme pace",
        weakness: "Injury prone"
      },
      { name: "Mohsin Khan", role: "Bowler", stats: { matches: 42, wickets: 48, economy: 7.1, sr: 16.2 } },
      { name: "Wanindu Hasaranga", role: "Bowler", isForeign: true, stats: { matches: 35, runs: 250, wickets: 45, economy: 7.5 } },
      { name: "Avesh Khan", role: "Bowler", stats: { matches: 75, wickets: 92, economy: 8.5, sr: 18.0 } },
      { name: "Anrich Nortje", role: "Bowler", isForeign: true, stats: { matches: 68, wickets: 85, economy: 8.3, sr: 16.2 } },
      { name: "Naman Tiwari", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.9, sr: 16.5 } },
      { name: "M. Siddharth", role: "Bowler", stats: { matches: 15, wickets: 12, economy: 7.2, sr: 22.5 } },
      { name: "Digvesh Rathi", role: "Bowler", stats: { matches: 5, wickets: 4, economy: 8.5, sr: 20.2 } },
      { name: "Akash Singh", role: "Bowler", stats: { matches: 15, wickets: 12, economy: 8.8, sr: 18.5 } },
      { name: "Arjun Tendulkar", role: "Bowler", stats: { matches: 10, runs: 45, wickets: 5, economy: 9.5 } }
    ]
  }
];

export const VENUES = [
  "Wankhede Stadium, Mumbai",
  "M. Chinnaswamy Stadium, Bengaluru",
  "MA Chidambaram Stadium, Chennai",
  "Eden Gardens, Kolkata",
  "Arun Jaitley Stadium, Delhi",
  "Narendra Modi Stadium, Ahmedabad",
  "Rajiv Gandhi International Stadium, Hyderabad",
  "Sawai Mansingh Stadium, Jaipur",
  "Punjab Cricket Association IS Bindra Stadium, Mohali",
  "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow"
];
