/**
 * @license
 * تطبيق سواعد الرياضي - Sawa'id Sports App
 * ملف التحكم والمنطق الأساسي (Vanilla JavaScript)
 * متوافق مع كافة المتصفحات، حفظ في localStorage وبدون أي مكتبات خارجية
 */

/* ==========================================================================
   1. كتلة البيانات الأولية القابلة للتعديل بسهولة (Single Data Source)
   ========================================================================== */
const DEFAULT_CONFIG = {
  // رمز دخول المدير الافتراضي (يمكن تغييره من تبويب الإعدادات)
  adminPin: '1234',

  // أسماء فرق كرة القدم وكرة الطائرة (7 فرق: 4 في المجموعة أ، و 3 في المجموعة ب)
  footballTeams: [
    { id: 'fb_t1', name: 'الفريق الأول', group: 'A' },
    { id: 'fb_t2', name: 'الفريق الثاني', group: 'A' },
    { id: 'fb_t3', name: 'الفريق الثالث', group: 'A' },
    { id: 'fb_t4', name: 'الفريق الرابع', group: 'A' },
    { id: 'fb_t5', name: 'الفريق الخامس', group: 'B' },
    { id: 'fb_t6', name: 'الفريق السادس', group: 'B' },
    { id: 'fb_t7', name: 'الفريق السابع', group: 'B' },
  ],

  volleyballTeams: [
    { id: 'vb_t1', name: 'الفريق الأول', group: 'A' },
    { id: 'vb_t2', name: 'الفريق الثاني', group: 'A' },
    { id: 'vb_t3', name: 'الفريق الثالث', group: 'A' },
    { id: 'vb_t4', name: 'الفريق الرابع', group: 'A' },
    { id: 'vb_t5', name: 'الفريق الخامس', group: 'B' },
    { id: 'vb_t6', name: 'الفريق السادس', group: 'B' },
    { id: 'vb_t7', name: 'الفريق السابع', group: 'B' },
  ],

  // أسماء لاعبي الشطرنج (14 لاعباً: يتأهل الأول والثاني مباشرة، و 12 في التمهيدي)
  chessPlayers: [
    { id: 'ch_p1', name: 'لاعب 1 (تأهل مباشر)' },
    { id: 'ch_p2', name: 'لاعب 2 (تأهل مباشر)' },
    { id: 'ch_p3', name: 'لاعب 3' },
    { id: 'ch_p4', name: 'لاعب 4' },
    { id: 'ch_p5', name: 'لاعب 5' },
    { id: 'ch_p6', name: 'لاعب 6' },
    { id: 'ch_p7', name: 'لاعب 7' },
    { id: 'ch_p8', name: 'لاعب 8' },
    { id: 'ch_p9', name: 'لاعب 9' },
    { id: 'ch_p10', name: 'لاعب 10' },
    { id: 'ch_p11', name: 'لاعب 11' },
    { id: 'ch_p12', name: 'لاعب 12' },
    { id: 'ch_p13', name: 'لاعب 13' },
    { id: 'ch_p14', name: 'لاعب 14' },
  ],

  // أسماء لاعبي البلياردو (14 لاعباً)
  billiardsPlayers: [
    { id: 'bl_p1', name: 'لاعب 1 (تأهل مباشر)' },
    { id: 'bl_p2', name: 'لاعب 2 (تأهل مباشر)' },
    { id: 'bl_p3', name: 'لاعب 3' },
    { id: 'bl_p4', name: 'لاعب 4' },
    { id: 'bl_p5', name: 'لاعب 5' },
    { id: 'bl_p6', name: 'لاعب 6' },
    { id: 'bl_p7', name: 'لاعب 7' },
    { id: 'bl_p8', name: 'لاعب 8' },
    { id: 'bl_p9', name: 'لاعب 9' },
    { id: 'bl_p10', name: 'لاعب 10' },
    { id: 'bl_p11', name: 'لاعب 11' },
    { id: 'bl_p12', name: 'لاعب 12' },
    { id: 'bl_p13', name: 'لاعب 13' },
    { id: 'bl_p14', name: 'لاعب 14' },
  ],

  // أسماء لاعبي البلايستيشن (14 لاعباً)
  playstationPlayers: [
    { id: 'ps_p1', name: 'لاعب 1 (تأهل مباشر)' },
    { id: 'ps_p2', name: 'لاعب 2 (تأهل مباشر)' },
    { id: 'ps_p3', name: 'لاعب 3' },
    { id: 'ps_p4', name: 'لاعب 4' },
    { id: 'ps_p5', name: 'لاعب 5' },
    { id: 'ps_p6', name: 'لاعب 6' },
    { id: 'ps_p7', name: 'لاعب 7' },
    { id: 'ps_p8', name: 'لاعب 8' },
    { id: 'ps_p9', name: 'لاعب 9' },
    { id: 'ps_p10', name: 'لاعب 10' },
    { id: 'ps_p11', name: 'لاعب 11' },
    { id: 'ps_p12', name: 'لاعب 12' },
    { id: 'ps_p13', name: 'لاعب 13' },
    { id: 'ps_p14', name: 'لاعب 14' },
  ],

  // قائمة ترتيب الدفعة العام المبدئية للبطاقة الرئيسية
  batchTop5: [
    { rank: 1, name: 'الفريق الأول (شعبة أ)', points: 48, note: 'متصدر الدرع العام' },
    { rank: 2, name: 'الفريق الثالث (شعبة ج)', points: 42, note: 'وصيف الترتيب' },
    { rank: 3, name: 'الفريق الثاني (شعبة ب)', points: 37, note: 'المركز الثالث' },
    { rank: 4, name: 'الفريق الخامس (شعبة هـ)', points: 31, note: 'المركز الرابع' },
    { rank: 5, name: 'الفريق الرابع (شعبة د)', points: 26, note: 'المركز الخامس' },
  ],

  // قائمة آخر الأحداث والأخبار
  events: [
    {
      id: 'ev1',
      title: 'انطلاق دورة سواعد للألعاب الرياضية',
      desc: 'افتتاح رسمي بحضور ممثلي الدفعة ووسط أجواء من الحماس والتنافس الأخوي.',
      date: 'اليوم، 10:00 صباحاً',
      sport: 'كرة القدم',
      sportKey: 'football',
    },
    {
      id: 'ev2',
      title: 'اكتمال قرعة الشطرنج والبلايستيشن',
      desc: 'تحديد مسارات الأدوار الإقصائية وتأهل المصنفين الأول والثاني لربع النهائي.',
      date: 'أمس، 06:30 مساءً',
      sport: 'الشطرنج',
      sportKey: 'chess',
    },
    {
      id: 'ev3',
      title: 'تجهيز صالة الأنشطة لمنافسات الطائرة',
      desc: 'اعتماد الحكام والجدول الزمني لمباريات المجموعتين أ و ب.',
      date: 'منذ يومين',
      sport: 'كرة الطائرة',
      sportKey: 'volleyball',
    },
    {
      id: 'ev4',
      title: 'مواجهات قوية في بطولة البلياردو',
      desc: 'استعداد اللاعبين للجولة التمهيدية في صالة ألعاب الكلية.',
      date: 'منذ 3 أيام',
      sport: 'البلياردو',
      sportKey: 'billiards',
    },
  ],

  // التنبيهات والإعلانات
  notifications: [
    { id: 'notif1', title: 'تذكير بمباراة الافتتاح', desc: 'تنطلق مباراة كرة القدم الأولى بين الفريق الأول والفريق الثاني الساعة 4:30 مساءً.', time: 'منذ 15 دقيقة', read: false },
    { id: 'notif2', title: 'تعليمات الحكام', desc: 'يرجى الالتزام بالروح الرياضية والحضور قبل موعد كل مباراة بـ 15 دقيقة.', time: 'منذ ساعة', read: false },
    { id: 'notif3', title: 'جدول ربع النهائي', desc: 'سيتم تحديث المتأهلين تلقائياً بمجرد اعتماد نتائج الدور التمهيدي.', time: 'منذ ساعتين', read: false },
  ]
};

/* ==========================================================================
   2. حالة التطبيق وإدارة التخزين المحلي (Storage & State)
   ========================================================================== */
const STORAGE_KEY = 'sawaed_app_state_v1';
let appState = null;
let currentActiveView = 'home';
let currentActiveTourSport = 'football';
let currentActiveTourSubtab = 'bracket';
let sliderInterval = null;
let currentSlideIndex = 0;
let isAdminLoggedIn = false;

/**
 * تهيئة أو استرجاع بيانات التطبيق من التخزين المحلي
 */
function initAppState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appState = JSON.parse(saved);
      // التحقق من توافر كافة البنيات الأساسية
      if (appState && appState.tournaments && appState.adminPin) {
        return;
      }
    } catch (e) {
      console.warn('تعذر قراءة البيانات المحفوظة، سيتم إعادة التهيئة', e);
    }
  }

  // إنشاء بيانات جديدة من الصفر
  appState = {
    adminPin: DEFAULT_CONFIG.adminPin,
    batchTop5: [...DEFAULT_CONFIG.batchTop5],
    events: [...DEFAULT_CONFIG.events],
    notifications: [...DEFAULT_CONFIG.notifications],
    tournaments: {
      football: generateGroupTournamentData('football', 'كرة القدم', DEFAULT_CONFIG.footballTeams, 'الأهداف'),
      volleyball: generateGroupTournamentData('volleyball', 'كرة الطائرة', DEFAULT_CONFIG.volleyballTeams, 'الأشواط'),
      chess: generateKnockoutTournamentData('chess', 'الشطرنج', DEFAULT_CONFIG.chessPlayers),
      billiards: generateKnockoutTournamentData('billiards', 'البلياردو', DEFAULT_CONFIG.billiardsPlayers),
      playstation: generateKnockoutTournamentData('playstation', 'البلايستيشن', DEFAULT_CONFIG.playstationPlayers),
    }
  };

  saveAppState();
}

function saveAppState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (err) {
    console.error('خطأ أثناء حفظ البيانات:', err);
  }
}

/* ==========================================================================
   3. مولدات جداول البطولات (Knockout 14 Players & Groups 7 Teams)
   ========================================================================== */

/**
 * أ) توليد بطولة خروج المغلوب بـ 14 لاعباً (الشطرنج، البلياردو، البلايستيشن)
 * - 14 لاعباً:
 *   * لاعبان يتأهلان مباشرة إلى ربع النهائي (دور الـ 8)
 *   * الـ 12 الآخرون يلعبون 6 مباريات تمهيدية
 *   * ربع النهائي: 8 متأهلين (6 فائزين + 2 مباشرين) -> 4 مباريات
 *   * نصف النهائي: 4 متأهلين -> مباراتان
 *   * النهائي: مبارزة على اللقب
 */
function generateKnockoutTournamentData(sportId, sportTitle, players) {
  // اللاعب 1 واللاعب 2 تأهل مباشر إلى ربع النهائي
  const bye1 = players[0];
  const bye2 = players[1];

  // 6 مباريات تمهيدية لـ 12 لاعباً
  const prelimMatches = [
    { id: `${sportId}_pre_1`, round: 'prelim', roundName: 'الدور التمهيدي', team1Id: players[2].id, team1Name: players[2].name, team2Id: players[3].id, team2Name: players[3].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت القادم', time: '04:00 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_qf_1`, nextMatchSlot: 2 },
    { id: `${sportId}_pre_2`, round: 'prelim', roundName: 'الدور التمهيدي', team1Id: players[4].id, team1Name: players[4].name, team2Id: players[5].id, team2Name: players[5].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت القادم', time: '04:30 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_qf_2`, nextMatchSlot: 1 },
    { id: `${sportId}_pre_3`, round: 'prelim', roundName: 'الدور التمهيدي', team1Id: players[6].id, team1Name: players[6].name, team2Id: players[7].id, team2Name: players[7].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت القادم', time: '05:00 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_qf_2`, nextMatchSlot: 2 },
    { id: `${sportId}_pre_4`, round: 'prelim', roundName: 'الدور التمهيدي', team1Id: players[8].id, team1Name: players[8].name, team2Id: players[9].id, team2Name: players[9].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت القادم', time: '05:30 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_qf_3`, nextMatchSlot: 1 },
    { id: `${sportId}_pre_5`, round: 'prelim', roundName: 'الدور التمهيدي', team1Id: players[10].id, team1Name: players[10].name, team2Id: players[11].id, team2Name: players[11].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت القادم', time: '06:00 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_qf_3`, nextMatchSlot: 2 },
    { id: `${sportId}_pre_6`, round: 'prelim', roundName: 'الدور التمهيدي', team1Id: players[12].id, team1Name: players[12].name, team2Id: players[13].id, team2Name: players[13].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت القادم', time: '06:30 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_qf_4`, nextMatchSlot: 2 },
  ];

  // 4 مباريات لربع النهائي
  const qfMatches = [
    { id: `${sportId}_qf_1`, round: 'qf', roundName: 'ربع النهائي', team1Id: bye1.id, team1Name: bye1.name, team2Id: '', team2Name: 'فائز تمهيدي 1', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الأحد', time: '04:00 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_sf_1`, nextMatchSlot: 1 },
    { id: `${sportId}_qf_2`, round: 'qf', roundName: 'ربع النهائي', team1Id: '', team1Name: 'فائز تمهيدي 2', team2Id: '', team2Name: 'فائز تمهيدي 3', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الأحد', time: '04:45 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_sf_1`, nextMatchSlot: 2 },
    { id: `${sportId}_qf_3`, round: 'qf', roundName: 'ربع النهائي', team1Id: '', team1Name: 'فائز تمهيدي 4', team2Id: '', team2Name: 'فائز تمهيدي 5', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الأحد', time: '05:30 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_sf_2`, nextMatchSlot: 1 },
    { id: `${sportId}_qf_4`, round: 'qf', roundName: 'ربع النهائي', team1Id: bye2.id, team1Name: bye2.name, team2Id: '', team2Name: 'فائز تمهيدي 6', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الأحد', time: '06:15 م', venue: 'صالة الأنشطة', nextMatchId: `${sportId}_sf_2`, nextMatchSlot: 2 },
  ];

  // مباراتان لنصف النهائي
  const sfMatches = [
    { id: `${sportId}_sf_1`, round: 'sf', roundName: 'نصف النهائي', team1Id: '', team1Name: 'فائز ربع النهائي 1', team2Id: '', team2Name: 'فائز ربع النهائي 2', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الاثنين', time: '05:00 م', venue: 'الصالة الرئيسية', nextMatchId: `${sportId}_final`, nextMatchSlot: 1 },
    { id: `${sportId}_sf_2`, round: 'sf', roundName: 'نصف النهائي', team1Id: '', team1Name: 'فائز ربع النهائي 3', team2Id: '', team2Name: 'فائز ربع النهائي 4', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الاثنين', time: '06:00 م', venue: 'الصالة الرئيسية', nextMatchId: `${sportId}_final`, nextMatchSlot: 2 },
  ];

  // النهائي
  const finalMatch = [
    { id: `${sportId}_final`, round: 'final', roundName: 'المباراة النهائية', team1Id: '', team1Name: 'المتأهل للنهائي 1', team2Id: '', team2Name: 'المتأهل للنهائي 2', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الثلاثاء', time: '07:00 م', venue: 'الميدان الشرفي', nextMatchId: null, nextMatchSlot: null },
  ];

  return {
    type: 'knockout',
    id: sportId,
    title: sportTitle,
    players: [...players],
    matches: [...prelimMatches, ...qfMatches, ...sfMatches, ...finalMatch],
  };
}

/**
 * ب) توليد بطولة دوري المجموعات بـ 7 فرق (كرة القدم وكرة الطائرة)
 * - المجموعة (أ) 4 فرق -> 6 مباريات
 * - المجموعة (ب) 3 فرق -> 3 مباريات
 * - يتأهل المتصدر والوصيف لنصف النهائي: متصدر (أ) ضد وصيف (ب) ، ومتصدر (ب) ضد وصيف (أ)
 * - النهائي بين الفائزين
 */
function generateGroupTournamentData(sportId, sportTitle, teams, scoreMetricName = 'الأهداف') {
  const groupA = teams.filter(t => t.group === 'A');
  const groupB = teams.filter(t => t.group === 'B');

  // مباريات المجموعة أ (4 فرق = 6 مباريات)
  const groupAMatches = [
    { id: `${sportId}_ga_1`, round: 'group_a', roundName: 'المجموعة أ - الجولة 1', team1Id: groupA[0].id, team1Name: groupA[0].name, team2Id: groupA[1].id, team2Name: groupA[1].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'الخميس', time: '04:30 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_ga_2`, round: 'group_a', roundName: 'المجموعة أ - الجولة 1', team1Id: groupA[2].id, team1Name: groupA[2].name, team2Id: groupA[3].id, team2Name: groupA[3].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'الخميس', time: '05:30 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_ga_3`, round: 'group_a', roundName: 'المجموعة أ - الجولة 2', team1Id: groupA[0].id, team1Name: groupA[0].name, team2Id: groupA[2].id, team2Name: groupA[2].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'الجمعة', time: '04:00 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_ga_4`, round: 'group_a', roundName: 'المجموعة أ - الجولة 2', team1Id: groupA[1].id, team1Name: groupA[1].name, team2Id: groupA[3].id, team2Name: groupA[3].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'الجمعة', time: '05:00 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_ga_5`, round: 'group_a', roundName: 'المجموعة أ - الجولة 3', team1Id: groupA[0].id, team1Name: groupA[0].name, team2Id: groupA[3].id, team2Name: groupA[3].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت', time: '04:00 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_ga_6`, round: 'group_a', roundName: 'المجموعة أ - الجولة 3', team1Id: groupA[1].id, team1Name: groupA[1].name, team2Id: groupA[2].id, team2Name: groupA[2].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت', time: '05:00 م', venue: 'ملعب الكلية' },
  ];

  // مباريات المجموعة ب (3 فرق = 3 مباريات)
  const groupBMatches = [
    { id: `${sportId}_gb_1`, round: 'group_b', roundName: 'المجموعة ب - الجولة 1', team1Id: groupB[0].id, team1Name: groupB[0].name, team2Id: groupB[1].id, team2Name: groupB[1].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'الخميس', time: '06:30 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_gb_2`, round: 'group_b', roundName: 'المجموعة ب - الجولة 2', team1Id: groupB[0].id, team1Name: groupB[0].name, team2Id: groupB[2].id, team2Name: groupB[2].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'الجمعة', time: '06:00 م', venue: 'ملعب الكلية' },
    { id: `${sportId}_gb_3`, round: 'group_b', roundName: 'المجموعة ب - الجولة 3', team1Id: groupB[1].id, team1Name: groupB[1].name, team2Id: groupB[2].id, team2Name: groupB[2].name, score1: null, score2: null, isFinished: false, winnerId: null, date: 'السبت', time: '06:00 م', venue: 'ملعب الكلية' },
  ];

  // نصف النهائي (نظام التقاطع بين المجموعتين أ و ب)
  const sfMatches = [
    { id: `${sportId}_sf_1`, round: 'sf', roundName: 'نصف النهائي 1', team1Id: '', team1Name: 'متصدر المجموعة (أ)', team2Id: '', team2Name: 'وصيف المجموعة (ب)', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الأحد', time: '05:00 م', venue: 'الملعب الرئيسي', nextMatchId: `${sportId}_final`, nextMatchSlot: 1 },
    { id: `${sportId}_sf_2`, round: 'sf', roundName: 'نصف النهائي 2', team1Id: '', team1Name: 'متصدر المجموعة (ب)', team2Id: '', team2Name: 'وصيف المجموعة (أ)', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الأحد', time: '06:30 م', venue: 'الملعب الرئيسي', nextMatchId: `${sportId}_final`, nextMatchSlot: 2 },
  ];

  // النهائي
  const finalMatch = [
    { id: `${sportId}_final`, round: 'final', roundName: 'المباراة النهائية', team1Id: '', team1Name: 'المتأهل للنهائي 1', team2Id: '', team2Name: 'المتأهل للنهائي 2', score1: null, score2: null, isFinished: false, winnerId: null, date: 'الثلاثاء', time: '07:30 م', venue: 'الملعب الرئيسي', nextMatchId: null, nextMatchSlot: null },
  ];

  return {
    type: 'groups',
    id: sportId,
    title: sportTitle,
    metricName: scoreMetricName,
    teams: [...teams],
    matches: [...groupAMatches, ...groupBMatches, ...sfMatches, ...finalMatch],
  };
}

/* ==========================================================================
   4. دوال الحسابات الرياضية والترتيب (Standings & Bracket Advancing)
   ========================================================================== */

/**
 * حساب جدول ترتيب المجموعة الواحدة
 * الفوز = 3 نقاط، التعادل = 1 (في كرة القدم فقط، الطائرة لا يوجد تعادل)، الخسارة = 0
 * الترتيب: النقاط -> فارق الأهداف/الأشواط -> الأهداف المسجلة
 */
function computeGroupStandings(teamsInGroup, matches, sportId) {
  const isVolleyball = (sportId === 'volleyball');
  const table = {};

  teamsInGroup.forEach(t => {
    table[t.id] = {
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

  matches.forEach(m => {
    if (!m.isFinished || m.score1 === null || m.score2 === null) return;
    const t1 = table[m.team1Id];
    const t2 = table[m.team2Id];
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
      if (!isVolleyball) {
        t1.drawn += 1;
        t2.drawn += 1;
        t1.points += 1;
        t2.points += 1;
      }
    }
  });

  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
}

/**
 * تحديث المتأهلين لنصف النهائي والنهائي في بطولات المجموعات
 */
function updateGroupKnockoutQualifiers(tour) {
  const groupATeams = tour.teams.filter(t => t.group === 'A');
  const groupBTeams = tour.teams.filter(t => t.group === 'B');

  const groupAMatches = tour.matches.filter(m => m.round === 'group_a');
  const groupBMatches = tour.matches.filter(m => m.round === 'group_b');

  const standingsA = computeGroupStandings(groupATeams, groupAMatches, tour.id);
  const standingsB = computeGroupStandings(groupBTeams, groupBMatches, tour.id);

  const sf1 = tour.matches.find(m => m.id === `${tour.id}_sf_1`);
  const sf2 = tour.matches.find(m => m.id === `${tour.id}_sf_2`);

  // متصدر أ ضد وصيف ب
  if (sf1) {
    if (standingsA.length > 0 && standingsA[0].played > 0) {
      sf1.team1Id = standingsA[0].id;
      sf1.team1Name = `متصدر أ: ${standingsA[0].name}`;
    }
    if (standingsB.length > 1 && standingsB[1].played > 0) {
      sf1.team2Id = standingsB[1].id;
      sf1.team2Name = `وصيف ب: ${standingsB[1].name}`;
    }
  }

  // متصدر ب ضد وصيف أ
  if (sf2) {
    if (standingsB.length > 0 && standingsB[0].played > 0) {
      sf2.team1Id = standingsB[0].id;
      sf2.team1Name = `متصدر ب: ${standingsB[0].name}`;
    }
    if (standingsA.length > 1 && standingsA[1].played > 0) {
      sf2.team2Id = standingsA[1].id;
      sf2.team2Name = `وصيف أ: ${standingsA[1].name}`;
    }
  }
}

/**
 * تحديث وتصعيد الفائز إلى الدور التالي في الشجرة الإقصائية
 */
function applyScoreToMatch(sportId, matchId, score1, score2) {
  const tour = appState.tournaments[sportId];
  if (!tour) return false;

  const match = tour.matches.find(m => m.id === matchId);
  if (!match) return false;

  match.score1 = score1;
  match.score2 = score2;
  match.isFinished = true;

  if (score1 > score2) {
    match.winnerId = match.team1Id;
  } else if (score2 > score1) {
    match.winnerId = match.team2Id;
  } else {
    // في مباريات خروج المغلوب أو الطائرة لا يوجد تعادل
    match.winnerId = match.team1Id;
  }

  const winnerName = (match.winnerId === match.team1Id) ? match.team1Name : match.team2Name;

  // إذا كانت المباراة مرتبطة بدور تالٍ (nextMatchId)
  if (match.nextMatchId) {
    const nextMatch = tour.matches.find(m => m.id === match.nextMatchId);
    if (nextMatch) {
      if (match.nextMatchSlot === 1) {
        nextMatch.team1Id = match.winnerId;
        nextMatch.team1Name = winnerName;
      } else if (match.nextMatchSlot === 2) {
        nextMatch.team2Id = match.winnerId;
        nextMatch.team2Name = winnerName;
      }
    }
  }

  // إذا كانت بطولة مجموعات، نحدّث المتأهلين للأدوار التالية
  if (tour.type === 'groups') {
    updateGroupKnockoutQualifiers(tour);
  }

  saveAppState();
  return true;
}

/* ==========================================================================
   5. إدارة الواجهات والتنقل (View Routing & Tab Switching)
   ========================================================================== */

function navigateTo(viewName) {
  currentActiveView = viewName;

  // إخفاء كافة الشاشات
  document.querySelectorAll('.view-container').forEach(el => {
    el.classList.remove('active-view');
  });

  // تفعيل الشاشة المختارة
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.add('active-view');
  }

  // تحديث شريط التنقل السفلي
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // التمرير لأعلى الصفحة
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // تحديث المحتوى وفق الشاشة
  if (viewName === 'home') {
    renderHomeComponents();
  } else if (viewName === 'sports') {
    renderSportsView();
  } else if (viewName === 'matches') {
    renderUnifiedMatchesView();
  } else if (viewName === 'tournaments') {
    renderTournamentsOverview();
  } else if (viewName === 'settings') {
    renderSettingsView();
  }
}

/**
 * فتح صفحة بطولة معينة
 */
function openTournament(sportId) {
  currentActiveTourSport = sportId;
  navigateTo('tournament-detail');
  renderTournamentDetailPage();
}

/**
 * التبديل بين تبويبات البطولة الفرعية
 * (الجدول/المجموعات | المباريات | النتائج)
 */
function switchTourSubtab(subtabName) {
  currentActiveTourSubtab = subtabName;

  document.querySelectorAll('.tour-subtab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`subtab-${subtabName}`);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.tour-tab-pane').forEach(pane => {
    pane.style.display = 'none';
  });

  const targetPane = document.getElementById(`tour-tabcontent-${subtabName}`);
  if (targetPane) targetPane.style.display = 'block';

  renderTournamentDetailPage();
}

/* ==========================================================================
   6. تصيير مكونات الشاشة الرئيسية (Home View Components)
   ========================================================================== */

function renderHomeComponents() {
  renderUpcomingMatchCard();
  renderBatchTop5();
  renderEventsList();
  updateNotificationBadge();
}

/**
 * استخراج اختصار أنيق للصورة الرمزية (مثل ف1 للفريق الأول، ل3 للاعب 3)
 */
function getParticipantShortCode(name) {
  if (!name) return 'س';
  const clean = name.trim();
  const teamMatch = clean.match(/الفريق\s+(الأول|الثاني|الثالث|الرابع|الخامس|السادس|السابع|\d+)/);
  if (teamMatch) {
    const map = { 'الأول': 'ف1', 'الثاني': 'ف2', 'الثالث': 'ف3', 'الرابع': 'ف4', 'الخامس': 'ف5', 'السادس': 'ف6', 'السابع': 'ف7' };
    return map[teamMatch[1]] || ('ف' + teamMatch[1]);
  }
  const playerMatch = clean.match(/لاعب\s+(\d+)/);
  if (playerMatch) {
    return 'ل' + playerMatch[1];
  }
  return clean.replace(/^ال/, '').substring(0, 2);
}

/**
 * بطاقة "المباراة القادمة"
 */
function renderUpcomingMatchCard() {
  // البحث عن أول مباراة غير منتهية عبر كافة البطولات
  let nextMatch = null;
  let sportTitle = 'كرة القدم';

  const sportKeys = ['football', 'volleyball', 'chess', 'billiards', 'playstation'];
  for (const sKey of sportKeys) {
    const tour = appState.tournaments[sKey];
    if (tour && tour.matches) {
      const pending = tour.matches.find(m => !m.isFinished && m.team1Id && m.team2Id);
      if (pending) {
        nextMatch = pending;
        sportTitle = tour.title;
        break;
      }
    }
  }

  // إذا لم نجد مباراة قادمة بفريقين محددين، نأخذ أول مباراة في كرة القدم
  if (!nextMatch) {
    nextMatch = appState.tournaments.football.matches[0];
  }

  document.getElementById('upcoming-sport-name').textContent = `${sportTitle} - ${nextMatch.roundName || 'مواجهة مرتقبة'}`;
  document.getElementById('upcoming-team1-name').textContent = nextMatch.team1Name;
  document.getElementById('upcoming-team2-name').textContent = nextMatch.team2Name;

  // الحرف الرمزي لكل طرف في الدائرة
  document.getElementById('upcoming-team1-avatar').textContent = getParticipantShortCode(nextMatch.team1Name);
  document.getElementById('upcoming-team2-avatar').textContent = getParticipantShortCode(nextMatch.team2Name);

  document.getElementById('upcoming-match-date').textContent = nextMatch.date || 'اليوم';
  document.getElementById('upcoming-match-time').textContent = nextMatch.time || '04:30 م';
  document.getElementById('upcoming-match-venue').textContent = nextMatch.venue || 'ملعب الكلية';

  // زر تفاصيل المباراة
  document.getElementById('btn-upcoming-details').onclick = () => {
    openMatchDetailsModal(nextMatch, sportTitle);
  };
}

/**
 * بطاقة "ترتيب الدفعة" (أفضل 5 مع المركز الأول بالأصفر)
 */
function renderBatchTop5() {
  const container = document.getElementById('batch-top5-list');
  if (!container) return;

  container.innerHTML = '';
  appState.batchTop5.forEach(item => {
    const isFirst = item.rank === 1;
    const row = document.createElement('div');
    row.className = `standing-row ${isFirst ? 'top-rank-gold' : ''}`;
    row.innerHTML = `
      <div class="rank-left-info">
        <span class="rank-number-badge">${item.rank}</span>
        <div>
          <div class="rank-participant-name">${item.name}</div>
          <div style="font-size: 10.5px; color: ${isFirst ? '#855303' : 'var(--text-muted)'}; font-weight: 600;">
            ${item.note || ''}
          </div>
        </div>
      </div>
      <div class="rank-points-tag">${item.points} نقطة</div>
    `;
    container.appendChild(row);
  });
}

/**
 * قسم "آخر الأحداث" (بطاقات أفقية)
 */
function renderEventsList() {
  const container = document.getElementById('events-list-container');
  if (!container) return;

  container.innerHTML = '';
  appState.events.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.onclick = () => openTournament(ev.sportKey);
    card.innerHTML = `
      <div class="event-card-img-wrap">
        <span class="event-sport-tag">${ev.sport}</span>
        <svg class="svg-icon" style="width: 44px; height: 44px; opacity: 0.9;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div class="event-card-body">
        <h4 class="event-card-title">${ev.title}</h4>
        <p class="event-card-desc">${ev.desc}</p>
        <div class="event-card-date">
          <svg class="svg-icon" style="width: 12px; height: 12px;" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>${ev.date}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ==========================================================================
   7. تصيير تفاصيل البطولة (Tournament Detail Views)
   ========================================================================== */

function renderTournamentDetailPage() {
  const tour = appState.tournaments[currentActiveTourSport];
  if (!tour) return;

  document.getElementById('tour-detail-title').textContent = `بطولة ${tour.title}`;
  document.getElementById('tour-detail-pill').textContent = tour.type === 'knockout' ? '14 لاعباً (إقصائي)' : '7 فرق (مجموعات)';

  // تصيير المحتوى وفق التبويب النشط
  if (currentActiveTourSubtab === 'bracket') {
    renderBracketOrGroupsTab(tour);
  } else if (currentActiveTourSubtab === 'matches') {
    renderTournamentMatchesTab(tour);
  } else if (currentActiveTourSubtab === 'results') {
    renderTournamentResultsTab(tour);
  }
}

/**
 * تبويب 1: الشجرة الإقصائية أو جداول المجموعات
 */
function renderBracketOrGroupsTab(tour) {
  const container = document.getElementById('tour-bracket-renderer');
  container.innerHTML = '';

  if (tour.type === 'knockout') {
    // عرض شجرة إقصائية أفقية لـ 14 لاعباً
    renderKnockoutBracketTree(tour, container);
  } else {
    // عرض جداول المجموعتين أ و ب + شجرة نصف النهائي والنهائي
    renderGroupsAndFinals(tour, container);
  }
}

/**
 * شجرة خروج المغلوب بـ 14 لاعباً (قابلة للتمرير أفقياً)
 */
function renderKnockoutBracketTree(tour, container) {
  const scrollWrapper = document.createElement('div');
  scrollWrapper.className = 'bracket-scroll-wrapper';

  const bracket = document.createElement('div');
  bracket.className = 'bracket-container';

  const prelims = tour.matches.filter(m => m.round === 'prelim');
  const qfs = tour.matches.filter(m => m.round === 'qf');
  const sfs = tour.matches.filter(m => m.round === 'sf');
  const finals = tour.matches.filter(m => m.round === 'final');

  // العمود 1: الدور التمهيدي (6 مباريات)
  bracket.appendChild(createBracketColumn('الدور التمهيدي (12 لاعباً)', prelims, tour.id));

  // العمود 2: ربع النهائي (8 لاعبين: 6 فائزين + 2 مباشرين)
  bracket.appendChild(createBracketColumn('ربع النهائي (8 لاعبين)', qfs, tour.id));

  // العمود 3: نصف النهائي (4 لاعبين)
  bracket.appendChild(createBracketColumn('نصف النهائي', sfs, tour.id));

  // العمود 4: النهائي
  bracket.appendChild(createBracketColumn('المباراة النهائية', finals, tour.id));

  scrollWrapper.appendChild(bracket);
  container.appendChild(scrollWrapper);

  // إشعار أو بطاقة بطل البطولة إن وُجد
  const finalMatch = finals[0];
  if (finalMatch && finalMatch.isFinished && finalMatch.winnerId) {
    const champName = (finalMatch.winnerId === finalMatch.team1Id) ? finalMatch.team1Name : finalMatch.team2Name;
    const champCard = document.createElement('div');
    champCard.className = 'champion-card';
    champCard.innerHTML = `
      <div style="font-size: 13px; font-weight: 800;">بطل بطولة ${tour.title} لدفعة سواعد</div>
      <div style="font-size: 20px; font-weight: 900;">${champName}</div>
      <div style="font-size: 11px; opacity: 0.9;">مبارك الفوز المستحق والتتويج بالمركز الأول</div>
    `;
    container.appendChild(champCard);
  }
}

function createBracketColumn(title, matches, sportId) {
  const col = document.createElement('div');
  col.className = 'bracket-round-column';

  const header = document.createElement('div');
  header.className = 'round-header-box';
  header.textContent = title;
  col.appendChild(header);

  const list = document.createElement('div');
  list.className = 'round-matches-list';

  matches.forEach(m => {
    const box = document.createElement('div');
    box.className = 'bracket-match-box';
    box.title = 'اضغط لتفاصيل المباراة أو إدخال النتيجة';
    box.onclick = () => handleMatchClick(m, sportId);

    const isT1Winner = m.isFinished && m.winnerId === m.team1Id;
    const isT2Winner = m.isFinished && m.winnerId === m.team2Id;

    box.innerHTML = `
      <div class="match-participant-line ${isT1Winner ? 'winner' : ''}">
        <span>${m.team1Name || 'بانتظار المتأهل'}</span>
        <span class="bracket-score-badge">${m.score1 !== null ? m.score1 : '-'}</span>
      </div>
      <div class="match-participant-line ${isT2Winner ? 'winner' : ''}">
        <span>${m.team2Name || 'بانتظار المتأهل'}</span>
        <span class="bracket-score-badge">${m.score2 !== null ? m.score2 : '-'}</span>
      </div>
      <div class="bracket-status-tag">
        ${m.isFinished ? 'انتهت' : (m.date || 'قادمة')}
      </div>
    `;
    list.appendChild(box);
  });

  col.appendChild(list);
  return col;
}

/**
 * جداول المجموعات ونصف النهائي لكرة القدم والطائرة (7 فرق)
 */
function renderGroupsAndFinals(tour, container) {
  const groupATeams = tour.teams.filter(t => t.group === 'A');
  const groupBTeams = tour.teams.filter(t => t.group === 'B');

  const groupAMatches = tour.matches.filter(m => m.round === 'group_a');
  const groupBMatches = tour.matches.filter(m => m.round === 'group_b');

  const standingsA = computeGroupStandings(groupATeams, groupAMatches, tour.id);
  const standingsB = computeGroupStandings(groupBTeams, groupBMatches, tour.id);

  // جدول المجموعة (أ)
  container.appendChild(buildGroupTableElement('المجموعة (أ) - 4 فرق', standingsA, tour.metricName));

  // جدول المجموعة (ب)
  container.appendChild(buildGroupTableElement('المجموعة (ب) - 3 فرق', standingsB, tour.metricName));

  // شجرة الأدوار الإقصائية (نصف النهائي والنهائي)
  const finalsHeader = document.createElement('div');
  finalsHeader.className = 'section-header';
  finalsHeader.style.marginTop = '16px';
  finalsHeader.innerHTML = `
    <div class="section-title-wrap">
      <span class="title-pill"></span>
      <h3 class="section-title">الأدوار النهائية (نصف النهائي والنهائي)</h3>
    </div>
  `;
  container.appendChild(finalsHeader);

  const scrollWrap = document.createElement('div');
  scrollWrap.className = 'bracket-scroll-wrapper';
  const bracket = document.createElement('div');
  bracket.className = 'bracket-container';
  bracket.style.minWidth = '450px';

  const sfMatches = tour.matches.filter(m => m.round === 'sf');
  const finalMatch = tour.matches.filter(m => m.round === 'final');

  bracket.appendChild(createBracketColumn('نصف النهائي (المتأهلون)', sfMatches, tour.id));
  bracket.appendChild(createBracketColumn('المباراة النهائية', finalMatch, tour.id));

  scrollWrap.appendChild(bracket);
  container.appendChild(scrollWrap);
}

function buildGroupTableElement(title, standings, metricName) {
  const wrap = document.createElement('div');
  wrap.className = 'group-table-wrap';

  wrap.innerHTML = `
    <div class="group-table-title">
      <span>${title}</span>
      <span style="font-size: 11px; font-weight: normal; opacity: 0.9;">يتأهل المتصدر والوصيف لنصف النهائي</span>
    </div>
    <div style="overflow-x: auto;">
      <table class="group-table">
        <thead>
          <tr>
            <th style="width: 30px;">#</th>
            <th style="text-align: right; padding-right: 10px;">الفريق</th>
            <th>لعب</th>
            <th>فاز</th>
            <th>تعادل</th>
            <th>خسر</th>
            <th>له</th>
            <th>عليه</th>
            <th>الفارق</th>
            <th class="pts-cell">نقاط</th>
          </tr>
        </thead>
        <tbody>
          ${standings.map((t, idx) => {
            const isQualified = idx < 2; // المتصدر والوصيف
            return `
              <tr>
                <td>${idx + 1}</td>
                <td class="team-cell">
                  ${isQualified ? '<span class="qualify-badge" title="متأهل لنصف النهائي"></span>' : ''}
                  ${t.name}
                </td>
                <td>${t.played}</td>
                <td>${t.won}</td>
                <td>${t.drawn}</td>
                <td>${t.lost}</td>
                <td>${t.gf}</td>
                <td>${t.ga}</td>
                <td style="color: ${t.gd > 0 ? 'var(--success)' : (t.gd < 0 ? 'var(--danger)' : 'inherit')};">
                  ${t.gd > 0 ? '+' + t.gd : t.gd}
                </td>
                <td class="pts-cell">${t.points}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  return wrap;
}

/**
 * تبويب 2: مباريات البطولة
 */
function renderTournamentMatchesTab(tour) {
  const container = document.getElementById('tour-matches-renderer');
  container.innerHTML = '';

  tour.matches.forEach(m => {
    container.appendChild(createMatchCardItem(m, tour.id));
  });
}

/**
 * تبويب 3: نتائج وترتيب البطولة
 */
function renderTournamentResultsTab(tour) {
  const container = document.getElementById('tour-results-renderer');
  container.innerHTML = '';

  const finishedMatches = tour.matches.filter(m => m.isFinished);
  if (finishedMatches.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 16px; color: var(--text-muted); background: var(--white); border-radius: 16px;">
        <svg class="svg-icon" style="width: 48px; height: 48px; color: var(--yellow-gold); margin-bottom: 10px;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <h4 style="font-size: 15px; font-weight: 800; color: var(--navy-dark); margin-bottom: 4px;">لم تكتمل أي مباراة بعد</h4>
        <p style="font-size: 12px;">عند تسجيل نتائج المباريات، ستظهر هنا قائمة النتائج وإحصائيات التأهل فوراً.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="font-size: 13px; font-weight: 800; color: var(--navy-dark); margin-bottom: 10px;">
      المباريات المعتمدة (${finishedMatches.length})
    </div>
  `;

  finishedMatches.forEach(m => {
    container.appendChild(createMatchCardItem(m, tour.id));
  });
}

function createMatchCardItem(m, sportId) {
  const card = document.createElement('div');
  card.className = 'match-list-item';

  const isT1Winner = m.isFinished && m.winnerId === m.team1Id;
  const isT2Winner = m.isFinished && m.winnerId === m.team2Id;

  card.innerHTML = `
    <div class="match-item-header">
      <span>${m.roundName || 'مباراة دورية'}</span>
      <span>${m.date || 'قريباً'} • ${m.time || ''}</span>
    </div>
    <div class="match-item-content">
      <div class="match-item-team ${isT1Winner ? 'text-primary' : ''}">
        ${m.team1Name || 'بانتظار المتأهل'}
      </div>
      <div>
        ${m.isFinished ? `
          <div class="match-item-score-box">
            ${m.score1} : ${m.score2}
          </div>
        ` : `
          <div class="match-item-score-box pending">
            لم تبدأ
          </div>
        `}
      </div>
      <div class="match-item-team team-two ${isT2Winner ? 'text-primary' : ''}">
        ${m.team2Name || 'بانتظار المتأهل'}
      </div>
    </div>
    <div class="match-item-actions">
      <button class="btn-sm-action" onclick="openMatchDetailsModalById('${sportId}', '${m.id}')">
        التفاصيل
      </button>
      <button class="btn-sm-action primary" onclick="openScoreEntryModal('${sportId}', '${m.id}')">
        ${m.isFinished ? 'تعديل النتيجة' : 'تسجيل النتيجة'}
      </button>
    </div>
  `;
  return card;
}

/* ==========================================================================
   8. تصيير شاشات التنقل الإضافية (Sports, Matches, Settings)
   ========================================================================== */

function renderSportsView() {
  const container = document.getElementById('sports-all-list');
  if (!container) return;

  const sports = [
    { id: 'football', name: 'كرة القدم', desc: 'نظام 7 فرق: مجموعتان (أ و ب) مع نصف نهائي ونهائي', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4 3 3-1 4-4 0-1-4 3-3z' },
    { id: 'volleyball', name: 'كرة الطائرة', desc: 'نظام 7 فرق: مجموعتان (أ و ب) بدون تعادل، مع نصف نهائي ونهائي', icon: 'M12 2a10 10 0 0 0 0 20M2 12a10 10 0 0 1 10-10' },
    { id: 'chess', name: 'الشطرنج', desc: 'خروج المغلوب بـ 14 لاعباً: تمهيدي لـ 12 لاعباً وتأهل مباشر لاثنين', icon: 'M7 21h10M9 21v-3h6v3M12 4c2 0 3 2 3 4s-1 3-3 4-3-2-3-4 1-4 3-4z' },
    { id: 'billiards', name: 'البلياردو', desc: 'خروج المغلوب بـ 14 لاعباً في صالة الكلية', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6a4 4 0 1 1-4 4 4 4 0 0 1 4-4z' },
    { id: 'playstation', name: 'البلايستيشن', desc: 'خروج المغلوب بـ 14 لاعباً في بطولة الألعاب الإلكترونية', icon: 'M2 6h20v12H2zm4 6h4m-2-2v4m7-1h.01m2 2h.01' },
  ];

  container.innerHTML = '';
  sports.forEach(s => {
    const card = document.createElement('div');
    card.className = 'settings-section-card';
    card.style.cursor = 'pointer';
    card.onclick = () => openTournament(s.id);
    card.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="sport-cat-icon" style="background: var(--navy-dark); color: var(--yellow-gold);">
            <svg class="svg-icon" viewBox="0 0 24 24"><path d="${s.icon}"></path></svg>
          </div>
          <div>
            <h4 style="font-size: 15px; font-weight: 800; color: var(--navy-dark);">${s.name}</h4>
            <p style="font-size: 11.5px; color: var(--text-muted);">${s.desc}</p>
          </div>
        </div>
        <svg class="svg-icon" style="color: var(--yellow-gold); transform: rotate(180deg);" viewBox="0 0 24 24">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderUnifiedMatchesView() {
  const filterPills = document.getElementById('matches-filter-pills');
  const matchesList = document.getElementById('unified-matches-list');
  if (!filterPills || !matchesList) return;

  filterPills.innerHTML = `
    <button class="btn-sm-action primary" onclick="filterUnifiedMatches('all', this)">الكل</button>
    <button class="btn-sm-action" onclick="filterUnifiedMatches('football', this)">كرة القدم</button>
    <button class="btn-sm-action" onclick="filterUnifiedMatches('volleyball', this)">الطائرة</button>
    <button class="btn-sm-action" onclick="filterUnifiedMatches('chess', this)">الشطرنج</button>
    <button class="btn-sm-action" onclick="filterUnifiedMatches('billiards', this)">البلياردو</button>
    <button class="btn-sm-action" onclick="filterUnifiedMatches('playstation', this)">بلايستيشن</button>
  `;

  filterUnifiedMatches('all');
}

function filterUnifiedMatches(sportFilter, clickedBtn = null) {
  if (clickedBtn) {
    document.querySelectorAll('#matches-filter-pills button').forEach(b => {
      b.className = 'btn-sm-action';
    });
    clickedBtn.className = 'btn-sm-action primary';
  }

  const container = document.getElementById('unified-matches-list');
  container.innerHTML = '';

  const sportKeys = sportFilter === 'all' 
    ? ['football', 'volleyball', 'chess', 'billiards', 'playstation']
    : [sportFilter];

  let count = 0;
  sportKeys.forEach(sKey => {
    const tour = appState.tournaments[sKey];
    if (tour && tour.matches) {
      tour.matches.forEach(m => {
        container.appendChild(createMatchCardItem(m, sKey));
        count++;
      });
    }
  });

  if (count === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 30px; color: var(--text-muted);">لا توجد مباريات</div>';
  }
}

function renderTournamentsOverview() {
  const container = document.getElementById('tournaments-cards-grid');
  if (!container) return;

  container.innerHTML = '';
  const sports = [
    { id: 'football', name: 'بطولة كرة القدم', type: 'دوري مجموعات (7 فرق)', desc: 'المجموعة أ (4 فرق) والمجموعة ب (3 فرق)، وتأهل المتصدر والوصيف لنصف النهائي.' },
    { id: 'volleyball', name: 'بطولة كرة الطائرة', type: 'دوري مجموعات (7 فرق)', desc: 'مجموعتان بنظام النقاط بدون تعادل، وتأهل لنصف النهائي.' },
    { id: 'chess', name: 'بطولة الشطرنج', type: 'خروج مغلوب (14 لاعباً)', desc: 'دور تمهيدي لـ 12 لاعباً وتأهل مباشر لاثنين، ثم ربع نهائي، نصف نهائي، والنهائي.' },
    { id: 'billiards', name: 'بطولة البلياردو', type: 'خروج مغلوب (14 لاعباً)', desc: 'مباريات إقصائية مباشرة ومسار تصاعدي نحو الكأس.' },
    { id: 'playstation', name: 'بطولة البلايستيشن', type: 'خروج مغلوب (14 لاعباً)', desc: 'مواجهات إلكترونية حماسية ومتابعة لشجرة الأدوار.' },
  ];

  sports.forEach(s => {
    const card = document.createElement('div');
    card.className = 'settings-section-card card-with-corner-triangle';
    card.style.cursor = 'pointer';
    card.onclick = () => openTournament(s.id);
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <h4 style="font-size: 15px; font-weight: 800; color: var(--navy-dark);">${s.name}</h4>
        <span class="tournament-type-pill">${s.type}</span>
      </div>
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">${s.desc}</p>
      <button class="btn-yellow" style="min-height: 38px; font-size: 12px;" onclick="event.stopPropagation(); openTournament('${s.id}')">
        عرض الشجرة والمباريات
      </button>
    `;
    container.appendChild(card);
  });
}

function renderSettingsView() {
  const statusBox = document.getElementById('admin-status-box');
  if (!statusBox) return;

  if (isAdminLoggedIn) {
    statusBox.innerHTML = `
      <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; color: var(--success); padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: space-between;">
        <span>تم تفعيل صلاحيات المدير (تسجيل النتائج متاح)</span>
        <button onclick="logoutAdmin()" style="background: none; border: none; color: var(--danger); font-size: 11.5px; font-weight: 800; cursor: pointer;">تسجيل خروج</button>
      </div>
    `;
  } else {
    statusBox.innerHTML = `
      <div style="background-color: #F8FAFC; border: 1px solid var(--border-color); color: var(--text-muted); padding: 8px 12px; border-radius: 8px; font-size: 12px;">
        الوضع الحالي: زائر (للتصفح والمشاهدة فقط)
      </div>
    `;
  }
}

/* ==========================================================================
   9. معالجات النوافذ المنبثقة والإجراءات التفاعلية (Modals & Actions)
   ========================================================================== */

function handleMatchClick(match, sportId) {
  // عند النقر على المباراة في الشجرة، إما فتح التفاصيل أو إدخال النتيجة
  if (isAdminLoggedIn) {
    openScoreEntryModal(sportId, match.id);
  } else {
    const tour = appState.tournaments[sportId];
    openMatchDetailsModal(match, tour ? tour.title : 'البطولة');
  }
}

function openMatchDetailsModalById(sportId, matchId) {
  const tour = appState.tournaments[sportId];
  if (!tour) return;
  const match = tour.matches.find(m => m.id === matchId);
  if (match) {
    openMatchDetailsModal(match, tour.title);
  }
}

function openMatchDetailsModal(match, sportTitle) {
  document.getElementById('modal-match-title').textContent = `مباراة في بطولة ${sportTitle}`;
  const body = document.getElementById('modal-match-body');

  body.innerHTML = `
    <div style="text-align: center; padding: 10px 0;">
      <span class="card-tag-badge" style="background: var(--navy-dark); color: var(--yellow-gold); font-size: 11px;">
        ${match.roundName || 'مباراة الدورة'}
      </span>
      <div style="display: flex; align-items: center; justify-content: space-around; margin: 16px 0;">
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 16px; font-weight: 800; color: var(--navy-dark);">${match.team1Name || 'بانتظار المتأهل'}</div>
        </div>
        <div class="match-vs-circle" style="width: 40px; height: 40px; font-size: 14px;">
          ${match.isFinished ? `${match.score1} : ${match.score2}` : 'VS'}
        </div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 16px; font-weight: 800; color: var(--navy-dark);">${match.team2Name || 'بانتظار المتأهل'}</div>
        </div>
      </div>
      ${match.isFinished ? `
        <div style="color: var(--success); font-weight: 800; font-size: 13px;">
          المباراة منتهية وموثقة في السجلات
        </div>
      ` : `
        <div style="color: var(--yellow-gold); background: var(--navy-dark); display: inline-block; padding: 3px 12px; border-radius: 12px; font-size: 11.5px; font-weight: 700;">
          موعد المباراة: ${match.date || 'اليوم'} في تمام ${match.time || '04:30 مساءً'}
        </div>
      `}
    </div>

    <div style="background: #F8F9FA; padding: 12px; border-radius: 12px; font-size: 12px; display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">الملعب / الصالة:</span>
        <span style="font-weight: 700; color: var(--navy-dark);">${match.venue || 'ملعب الكلية'}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">طاقم التحكيم:</span>
        <span style="font-weight: 700; color: var(--navy-dark);">لجنة التحكيم الرياضية لدفعة سواعد</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">حالة التوثيق:</span>
        <span style="font-weight: 700; color: var(--navy-dark);">${match.isFinished ? 'معتمدة' : 'بانتظار الصافرة'}</span>
      </div>
    </div>

    <button class="btn-yellow" onclick="closeModal('modal-match-details'); openScoreEntryModal('${match.sportId || currentActiveTourSport}', '${match.id}')">
      ${match.isFinished ? 'تعديل النتيجة (للمدير)' : 'تسجيل النتيجة (للمدير)'}
    </button>
  `;

  openModal('modal-match-details');
}

/**
 * نافذة إدخال نتيجة المباراة للمدير
 */
let targetScoreSportId = null;
let targetScoreMatchId = null;
let pendingScoreSportId = null;
let pendingScoreMatchId = null;

function openScoreEntryModal(sportId, matchId) {
  pendingScoreSportId = sportId;
  pendingScoreMatchId = matchId;

  // التحقق من صلاحية المدير برمز PIN إذا لم يكن مسجلاً عبر النافذة المنبثقة
  if (!isAdminLoggedIn) {
    const errorEl = document.getElementById('modal-pin-error');
    if (errorEl) errorEl.style.display = 'none';
    const pinField = document.getElementById('modal-pin-field');
    if (pinField) pinField.value = '';
    openModal('modal-admin-pin');
    return;
  }

  showScoreModal(sportId, matchId);
}

function showScoreModal(sportId, matchId) {
  const tour = appState.tournaments[sportId];
  if (!tour) return;
  const match = tour.matches.find(m => m.id === matchId);
  if (!match) return;

  targetScoreSportId = sportId;
  targetScoreMatchId = matchId;

  document.getElementById('score-match-id').value = matchId;
  document.getElementById('score-match-subhead').textContent = `${tour.title} • ${match.roundName || 'المباراة'}`;
  document.getElementById('score-label-team1').textContent = match.team1Name || 'الطرف الأول';
  document.getElementById('score-label-team2').textContent = match.team2Name || 'الطرف الثاني';

  document.getElementById('input-score-team1').value = match.score1 !== null ? match.score1 : 0;
  document.getElementById('input-score-team2').value = match.score2 !== null ? match.score2 : 0;

  // إظهار تنبيه منع التعادل إذا كانت مباراة إقصائية أو طائرة
  const isKnockoutOrVolley = (tour.type === 'knockout') || (tour.id === 'volleyball') || (match.round === 'sf') || (match.round === 'final');
  document.getElementById('tie-warning').style.display = isKnockoutOrVolley ? 'block' : 'none';

  openModal('modal-enter-score');
}

function handleSaveScore() {
  const s1 = parseInt(document.getElementById('input-score-team1').value, 10);
  const s2 = parseInt(document.getElementById('input-score-team2').value, 10);

  if (isNaN(s1) || isNaN(s2) || s1 < 0 || s2 < 0) {
    showToast('يرجى إدخال نتيجة صحيحة');
    return;
  }

  const tour = appState.tournaments[targetScoreSportId];
  const isKnockoutOrVolley = (tour.type === 'knockout') || (tour.id === 'volleyball');
  if (isKnockoutOrVolley && s1 === s2) {
    showToast('يجب تحديد فائز في هذه المباراة (لا يُقبل التعادل)');
    return;
  }

  const success = applyScoreToMatch(targetScoreSportId, targetScoreMatchId, s1, s2);
  if (success) {
    closeModal('modal-enter-score');
    showToast('تم حفظ النتيجة وتحديث الأدوار بنجاح!');

    // إعادة تصيير الشاشة الحالية فوراً
    if (currentActiveView === 'tournament-detail') {
      renderTournamentDetailPage();
    } else if (currentActiveView === 'matches') {
      renderUnifiedMatchesView();
    } else if (currentActiveView === 'home') {
      renderHomeComponents();
    }
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function openDrawer() {
  document.getElementById('drawer-overlay').classList.add('active');
  document.getElementById('drawer-panel').classList.add('active');
}

function closeDrawer() {
  document.getElementById('drawer-overlay').classList.remove('active');
  document.getElementById('drawer-panel').classList.remove('active');
}

function showToast(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function logoutAdmin() {
  isAdminLoggedIn = false;
  showToast('تم تسجيل خروج المدير بنجاح');
  renderSettingsView();
}

function updateNotificationBadge() {
  const unreadCount = appState.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notification-badge');
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }
}

function openNotificationsModal() {
  const container = document.getElementById('notifications-list-container');
  if (!container) return;

  container.innerHTML = '';
  appState.notifications.forEach(n => {
    const item = document.createElement('div');
    item.style.padding = '10px 12px';
    item.style.borderBottom = '1px solid var(--border-light)';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.gap = '4px';

    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 800; font-size: 13px; color: var(--navy-dark);">${n.title}</span>
        <span style="font-size: 10.5px; color: var(--text-muted);">${n.time}</span>
      </div>
      <p style="font-size: 11.5px; color: var(--text-dark);">${n.desc}</p>
    `;
    container.appendChild(item);
  });

  // تعليم الإشعارات كمقروءة
  appState.notifications.forEach(n => { n.read = true; });
  saveAppState();
  updateNotificationBadge();

  openModal('modal-notifications');
}

/* ==========================================================================
   10. البانر التلقائي (Auto Slider Logic)
   ========================================================================== */

function setupAutoSlider() {
  const track = document.getElementById('hero-slider-track');
  const dots = document.querySelectorAll('.slider-dot');
  if (!track || dots.length === 0) return;

  function goToSlide(index) {
    currentSlideIndex = index;
    // في الواجهة العربية RTL: إزاحة موجبة بمقدار 100%
    track.style.transform = `translateX(${currentSlideIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      goToSlide(idx);
      resetSliderTimer();
    });
  });

  function startSliderTimer() {
    sliderInterval = setInterval(() => {
      let next = currentSlideIndex + 1;
      if (next >= dots.length) next = 0;
      goToSlide(next);
    }, 4500);
  }

  function resetSliderTimer() {
    clearInterval(sliderInterval);
    startSliderTimer();
  }

  startSliderTimer();
}

/* ==========================================================================
   11. التهيئة وربط الأحداث عند تحميل المستند (Event Listeners & Boot)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // تهيئة البيانات
  initAppState();

  // إعداد السلايدر
  setupAutoSlider();

  // إعداد مكونات الشاشة الرئيسية
  renderHomeComponents();

  // ربط أزرار الشريط السفلي
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      navigateTo(view);
    });
  });

  // أزرار الهيدر
  document.getElementById('btn-open-menu').addEventListener('click', openDrawer);
  document.getElementById('btn-open-notifications').addEventListener('click', openNotificationsModal);

  // زر العودة من صفحة تفاصيل البطولة
  document.getElementById('btn-back-from-tournament').addEventListener('click', () => {
    navigateTo('tournaments');
  });

  // حفظ النتيجة للمدير
  document.getElementById('btn-save-score').addEventListener('click', handleSaveScore);

  // تأكيد رمز PIN للمدير من النافذة المنبثقة
  const btnConfirmModalPin = document.getElementById('btn-confirm-modal-pin');
  if (btnConfirmModalPin) {
    btnConfirmModalPin.addEventListener('click', () => {
      const pinField = document.getElementById('modal-pin-field');
      const errEl = document.getElementById('modal-pin-error');
      if (pinField.value.trim() === appState.adminPin) {
        isAdminLoggedIn = true;
        closeModal('modal-admin-pin');
        showToast('تم التحقق بنجاح وتفعيل وضع المدير');
        renderSettingsView();
        if (pendingScoreSportId && pendingScoreMatchId) {
          showScoreModal(pendingScoreSportId, pendingScoreMatchId);
        }
      } else {
        if (errEl) errEl.style.display = 'block';
      }
    });
  }

  // زر تأكيد PIN في الإعدادات
  document.getElementById('btn-submit-pin').addEventListener('click', () => {
    const input = document.getElementById('input-admin-pin');
    if (input.value.trim() === appState.adminPin) {
      isAdminLoggedIn = true;
      input.value = '';
      showToast('تم التحقق بنجاح وتفعيل وضع المدير');
      renderSettingsView();
    } else {
      showToast('رمز PIN غير صحيح');
    }
  });

  // زر إعادة تعيين البيانات في الإعدادات
  document.getElementById('btn-reset-data').addEventListener('click', () => {
    if (confirm('هل أنت متأكد من رغبتك في استعادة ضبط المصنع ومسح النتائج المسجلة؟')) {
      localStorage.removeItem(STORAGE_KEY);
      initAppState();
      showToast('تم استعادة البيانات الافتراضية بنجاح');
      renderSettingsView();
      renderHomeComponents();
    }
  });
});

// إتاحة الدوال العامة للـ inline events
window.navigateTo = navigateTo;
window.openTournament = openTournament;
window.switchTourSubtab = switchTourSubtab;
window.openMatchDetailsModalById = openMatchDetailsModalById;
window.openScoreEntryModal = openScoreEntryModal;
window.openModal = openModal;
window.closeModal = closeModal;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.logoutAdmin = logoutAdmin;
window.filterUnifiedMatches = filterUnifiedMatches;
