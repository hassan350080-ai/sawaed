import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGroupStandings, advanceKnockoutWinner, Match } from './tournament_rules';

test('Group stage football standings calculates wins, draws, goals and points correctly', () => {
  const teams = [
    { id: 't1', name: 'الفريق الأول' },
    { id: 't2', name: 'الفريق الثاني' },
    { id: 't3', name: 'الفريق الثالث' },
    { id: 't4', name: 'الفريق الرابع' },
  ];

  const matches: Match[] = [
    {
      id: 'm1',
      round: 'group_a',
      team1Id: 't1',
      team1Name: 'الفريق الأول',
      team2Id: 't2',
      team2Name: 'الفريق الثاني',
      score1: 3,
      score2: 1,
      isFinished: true,
      winnerId: 't1',
      sportId: 'football',
    },
    {
      id: 'm2',
      round: 'group_a',
      team1Id: 't3',
      team1Name: 'الفريق الثالث',
      team2Id: 't4',
      team2Name: 'الفريق الرابع',
      score1: 2,
      score2: 2,
      isFinished: true,
      winnerId: null,
      sportId: 'football',
    },
    {
      id: 'm3',
      round: 'group_a',
      team1Id: 't1',
      team1Name: 'الفريق الأول',
      team2Id: 't3',
      team2Name: 'الفريق الثالث',
      score1: 2,
      score2: 0,
      isFinished: true,
      winnerId: 't1',
      sportId: 'football',
    },
  ];

  const standings = calculateGroupStandings(teams, matches, 'football');

  // t1: 2 matches, 2 wins, 0 draws, 6 points, GD +4 (5-1)
  assert.equal(standings[0].id, 't1');
  assert.equal(standings[0].points, 6);
  assert.equal(standings[0].won, 2);
  assert.equal(standings[0].gf, 5);
  assert.equal(standings[0].ga, 1);
  assert.equal(standings[0].gd, 4);

  // t4 has 1 point, GD 0 (2-2), t3 has 1 point, GD -2 (2-4)
  assert.equal(standings[1].id, 't4');
  assert.equal(standings[1].points, 1);
  assert.equal(standings[1].gd, 0);

  assert.equal(standings[2].id, 't3');
  assert.equal(standings[2].points, 1);
  assert.equal(standings[2].gd, -2);
});

test('Knockout tournament progression advances winner to designated next match slot', () => {
  const matches: Match[] = [
    {
      id: 'prelim_1',
      round: 'prelim',
      team1Id: 'p3',
      team1Name: 'لاعب 3',
      team2Id: 'p4',
      team2Name: 'لاعب 4',
      score1: null,
      score2: null,
      isFinished: false,
      winnerId: null,
      sportId: 'chess',
      nextMatchId: 'qf_1',
      nextMatchSlot: 2,
    },
    {
      id: 'qf_1',
      round: 'qf',
      team1Id: 'p1', // Seed 1 bye
      team1Name: 'لاعب 1',
      team2Id: '',
      team2Name: 'الفائز من م1',
      score1: null,
      score2: null,
      isFinished: false,
      winnerId: null,
      sportId: 'chess',
      nextMatchId: 'sf_1',
      nextMatchSlot: 1,
    },
  ];

  // Player 3 wins 2-0
  const updated = advanceKnockoutWinner(matches, 'prelim_1', 2, 0);
  const qfMatch = updated.find((m) => m.id === 'qf_1');

  assert.ok(qfMatch);
  assert.equal(qfMatch.team2Id, 'p3');
  assert.equal(qfMatch.team2Name, 'لاعب 3');
});
