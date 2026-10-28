/**
 * Tournament Rules & Calculation Logic for Sawa'id Sports App
 */

export interface TeamStanding {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface Match {
  id: string;
  round: string; // 'prelim', 'qf', 'sf', 'final', 'group_a', 'group_b'
  team1Id: string;
  team1Name: string;
  team2Id: string;
  team2Name: string;
  score1: number | null;
  score2: number | null;
  isFinished: boolean;
  winnerId: string | null;
  sportId: string;
  date?: string;
  time?: string;
  venue?: string;
  nextMatchId?: string;
  nextMatchSlot?: 1 | 2;
}

/**
 * Calculate football or volleyball group standings
 * sportType: 'football' (allows draws, 3 for win, 1 for draw, 0 for loss)
 *            'volleyball' (no draws, 3 for win, 0 for loss)
 */
export function calculateGroupStandings(
  teams: { id: string; name: string }[],
  matches: Match[],
  sportType: 'football' | 'volleyball' = 'football'
): TeamStanding[] {
  const standingsMap: Record<string, TeamStanding> = {};

  teams.forEach((t) => {
    standingsMap[t.id] = {
      id: t.id,
      name: t.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
    };
  });

  matches.forEach((m) => {
    if (!m.isFinished || m.score1 === null || m.score2 === null) return;
    const t1 = standingsMap[m.team1Id];
    const t2 = standingsMap[m.team2Id];
    if (!t1 || !t2) return;

    t1.played += 1;
    t2.played += 1;
    t1.gf += m.score1;
    t1.ga += m.score2;
    t2.gf += m.score2;
    t2.ga += m.score1;

    t1.gd = t1.gf - t1.ga;
    t2.gd = t2.gf - t2.ga;

    if (m.score1 > m.score2) {
      t1.won += 1;
      t1.points += 3;
      t2.lost += 1;
    } else if (m.score2 > m.score1) {
      t2.won += 1;
      t2.points += 3;
      t1.lost += 1;
    } else {
      // Draw (football only)
      if (sportType === 'volleyball') {
        // In volleyball draws are not permitted, treat higher score as win
      } else {
        t1.drawn += 1;
        t2.drawn += 1;
        t1.points += 1;
        t2.points += 1;
      }
    }
  });

  return Object.values(standingsMap).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
}

/**
 * Advance winner in knockout bracket
 */
export function advanceKnockoutWinner(
  matches: Match[],
  matchId: string,
  score1: number,
  score2: number
): Match[] {
  const updated = matches.map((m) => ({ ...m }));
  const target = updated.find((m) => m.id === matchId);
  if (!target) return updated;

  target.score1 = score1;
  target.score2 = score2;
  target.isFinished = true;

  if (score1 > score2) {
    target.winnerId = target.team1Id;
  } else if (score2 > score1) {
    target.winnerId = target.team2Id;
  } else {
    // In knockout, ties must have a winner (e.g. penalties/tiebreak)
    target.winnerId = target.team1Id;
  }

  const winnerName =
    target.winnerId === target.team1Id ? target.team1Name : target.team2Name;

  // If there's a next match, propagate the winner
  if (target.nextMatchId) {
    const nextMatch = updated.find((m) => m.id === target.nextMatchId);
    if (nextMatch) {
      if (target.nextMatchSlot === 1) {
        nextMatch.team1Id = target.winnerId;
        nextMatch.team1Name = winnerName;
      } else if (target.nextMatchSlot === 2) {
        nextMatch.team2Id = target.winnerId;
        nextMatch.team2Name = winnerName;
      }
    }
  }

  return updated;
}
