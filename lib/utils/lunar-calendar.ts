import * as LunarLib from 'lunar-javascript';

// Handle both ESM and CommonJS exports
const Lunar = (LunarLib as any).Lunar || (LunarLib as any).default?.Lunar || LunarLib;

/**
 * Get current date in Malaysia timezone (UTC+8)
 */
function getMalaysiaDate(): Date {
  const now = new Date();
  // Convert to Malaysia time (UTC+8)
  const malaysiaOffset = 8 * 60; // minutes
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (malaysiaOffset * 60000));
}

/**
 * Get the current lunar date information
 * Uses Malaysia timezone (UTC+8) for consistency
 */
export function getLunarDate(date?: Date) {
  const dateToUse = date || getMalaysiaDate();
  const lunar = Lunar.fromDate(dateToUse);

  // Get days in month - lunar months are either 29 or 30 days
  // Use LunarMonth to get accurate days count
  let daysInMonth = 30; // Default to 30
  try {
    const lunarMonth = (LunarLib as any).LunarMonth || (LunarLib as any).default?.LunarMonth;
    if (lunarMonth) {
      const month = lunarMonth.fromYm(lunar.getYear(), lunar.getMonth());
      daysInMonth = month?.getDayCount?.() || 30;
    }
  } catch {
    // Fallback to 30 days
    daysInMonth = 30;
  }

  return {
    day: lunar.getDay(), // 1-30
    month: lunar.getMonth(), // 1-12
    year: lunar.getYear(),
    monthName: lunar.getMonthInChinese(),
    yearName: lunar.getYearInGanZhi(),
    daysInMonth,
  };
}

/**
 * Get the current lunar day (1-30)
 * Uses Malaysia timezone (UTC+8)
 */
export function getLunarDay(date?: Date): number {
  const dateToUse = date || getMalaysiaDate();
  const lunar = Lunar.fromDate(dateToUse);
  return lunar.getDay();
}

/**
 * Check if current day is an even lunar day (blog post day)
 */
export function isEvenLunarDay(date: Date = new Date()): boolean {
  const day = getLunarDay(date);
  return day % 2 === 0;
}

/**
 * Check if current day is a peak day (1st or 15th)
 */
export function isPeakDay(date: Date = new Date()): boolean {
  const day = getLunarDay(date);
  return day === 1 || day === 15;
}

/**
 * Check if current day is new moon (1st)
 */
export function isNewMoon(date: Date = new Date()): boolean {
  return getLunarDay(date) === 1;
}

/**
 * Check if current day is full moon (15th)
 */
export function isFullMoon(date: Date = new Date()): boolean {
  return getLunarDay(date) === 15;
}

/**
 * Get lotus growth stage based on lunar day
 * Full lunar month cycle (30 days) following moon phases:
 * - Days 1-15: Waxing moon - seed to full bloom
 * - Days 16-30: Waning moon - full glory to rest/renewal
 */
export function getLotusStage(date: Date = new Date()): number {
  return getLunarDay(date);
}

/**
 * Get lotus stage description - full 30-day lunar month cycle
 * Days 1-15: Waxing moon - growth phase (seed to full bloom)
 * Days 16-30: Waning moon - completion phase (glory to renewal)
 */
export function getLotusStageDescription(stage: number, locale: string = 'zh'): string {
  const descriptions: Record<string, Record<number, string>> = {
    zh: {
      // Waxing phase: Growth (Days 1-15)
      1: '新月·种子入土',
      2: '蓄力·静待萌发',
      3: '破土·嫩芽初现',
      4: '生根·扎稳根基',
      5: '舒展·叶片初开',
      6: '生长·茎干渐强',
      7: '向上·欣欣向荣',
      8: '上弦·蓄势待发',
      9: '花蕾·含苞欲放',
      10: '孕育·花瓣渐显',
      11: '绽放·花开初现',
      12: '盛开·芳华绽放',
      13: '圆满·几近盛放',
      14: '极致·临近圆月',
      15: '满月·莲开见佛',
      // Waning phase: Completion (Days 16-30)
      16: '恩泽·散播芬芳',
      17: '结实·莲蓬初成',
      18: '成熟·果实饱满',
      19: '圆融·智慧结晶',
      20: '布施·分享果实',
      21: '沉淀·回归本心',
      22: '下弦·内观静修',
      23: '放下·落叶归根',
      24: '归藏·回归泥土',
      25: '安息·静待重生',
      26: '净化·涅槃之前',
      27: '寂静·万籁俱寂',
      28: '虚空·无我无相',
      29: '残月·最后一息',
      30: '晦日·周而复始',
    },
    en: {
      // Waxing phase: Growth (Days 1-15)
      1: 'New Moon · Seed Planted',
      2: 'Gathering · Awaiting Sprout',
      3: 'Breaking Ground · First Sprout',
      4: 'Rooting · Foundation Set',
      5: 'Unfolding · First Leaves',
      6: 'Growing · Stem Strengthens',
      7: 'Rising · Thriving Growth',
      8: 'First Quarter · Building Energy',
      9: 'Budding · Ready to Bloom',
      10: 'Forming · Petals Emerging',
      11: 'Opening · First Bloom',
      12: 'Flourishing · Radiant Beauty',
      13: 'Fullness · Near Complete',
      14: 'Peak · Approaching Full Moon',
      15: 'Full Moon · Lotus Enlightenment',
      // Waning phase: Completion (Days 16-30)
      16: 'Blessing · Spreading Fragrance',
      17: 'Fruiting · Seed Pod Forms',
      18: 'Ripening · Seeds Mature',
      19: 'Wisdom · Crystallized Insights',
      20: 'Giving · Sharing the Harvest',
      21: 'Settling · Returning to Heart',
      22: 'Last Quarter · Inner Reflection',
      23: 'Releasing · Leaves Return to Root',
      24: 'Returning · Back to Earth',
      25: 'Resting · Awaiting Rebirth',
      26: 'Purifying · Before Nirvana',
      27: 'Stillness · Perfect Silence',
      28: 'Emptiness · No Self, No Form',
      29: 'Crescent · Final Breath',
      30: 'Dark Moon · Cycle Complete',
    },
    ja: {
      // Waxing phase: Growth (Days 1-15)
      1: '新月・種を蒔く',
      2: '蓄え・発芽を待つ',
      3: '発芽・芽が出る',
      4: '根付く・基盤を築く',
      5: '展開・初葉が開く',
      6: '成長・茎が強くなる',
      7: '上昇・盛んに育つ',
      8: '上弦・力を蓄える',
      9: '蕾む・開花の準備',
      10: '形成・花びらが現れる',
      11: '開花・最初の花',
      12: '繁栄・輝く美しさ',
      13: '充実・ほぼ完成',
      14: '頂点・満月に近づく',
      15: '満月・蓮華の悟り',
      // Waning phase: Completion (Days 16-30)
      16: '恵み・香りを広げる',
      17: '結実・蓮の実ができる',
      18: '成熟・種子が熟す',
      19: '智慧・洞察の結晶',
      20: '布施・収穫を分かち合う',
      21: '落ち着き・心に戻る',
      22: '下弦・内省',
      23: '手放す・根に戻る',
      24: '帰還・大地に還る',
      25: '休息・再生を待つ',
      26: '浄化・涅槃の前',
      27: '静寂・完全な沈黙',
      28: '空・無我無相',
      29: '残月・最後の息吹',
      30: '晦日・循環の完成',
    },
  };

  return descriptions[locale]?.[stage] || descriptions.en[stage] || '';
}

/**
 * Get lotus emoji for stage - 30 unique emojis for full lunar month
 * Days 1-15: Waxing moon (🌑→🌕) - growth from seed to full bloom
 * Days 16-30: Waning moon (🌕→🌑) - completion and renewal cycle
 */
export function getLotusEmoji(stage: number): string {
  const emojis: Record<number, string> = {
    // Waxing phase: New Moon to Full Moon (Growth)
    1: '🌑',   // New moon - seed planted in darkness
    2: '💧',   // Water drop - nurturing begins
    3: '🌱',   // Seedling - breaking ground
    4: '🪴',   // Potted plant - rooting
    5: '🌿',   // Herb - first leaves
    6: '🍃',   // Leaves - growing
    7: '☘️',   // Shamrock - thriving
    8: '🌓',   // First quarter moon
    9: '🌷',   // Tulip - bud forming
    10: '🪻',  // Hyacinth - bud developing
    11: '🌸',  // Cherry blossom - opening
    12: '🌺',  // Hibiscus - flourishing
    13: '🏵️',  // Rosette - near complete
    14: '🪷',  // Lotus - approaching peak
    15: '🪷✨', // Full moon lotus - enlightenment!
    // Waning phase: Full Moon to New Moon (Completion)
    16: '✨🪷', // Radiating blessings
    17: '🫛',  // Seed pod forming
    18: '🌰',  // Chestnut - seeds maturing
    19: '💎',  // Gem - wisdom crystallized
    20: '🎁',  // Gift - sharing harvest
    21: '🧘',  // Meditation - returning inward
    22: '🌗',  // Last quarter moon
    23: '🍂',  // Falling leaf - letting go
    24: '🪨',  // Rock - grounding
    25: '😴',  // Sleep - resting
    26: '🕯️',  // Candle - purification
    27: '🔕',  // Silence - perfect stillness
    28: '☁️',  // Cloud - emptiness
    29: '🌘',  // Waning crescent
    30: '⭕',  // Circle complete - ready for renewal
  };

  return emojis[stage] || '🪷';
}

/**
 * Get Buddhist festivals/holidays
 */
export function getBuddhistFestivals(date: Date = new Date()): string[] {
  const lunar = Lunar.fromDate(date);
  const festivals = lunar.getFestivals();

  // Add specific Buddhist holidays
  const day = lunar.getDay();
  const month = lunar.getMonth();
  const buddhistHolidays: string[] = [];

  // Vesak (Buddha's Birthday) - 4th month, 15th day
  if (month === 4 && day === 15) {
    buddhistHolidays.push('Vesak (Buddha\'s Birthday)');
  }

  // Magha Puja - 3rd month, 15th day
  if (month === 3 && day === 15) {
    buddhistHolidays.push('Magha Puja');
  }

  // Asalha Puja - 6th month, 15th day
  if (month === 6 && day === 15) {
    buddhistHolidays.push('Asalha Puja');
  }

  // Uposatha Days (observance days) - 1st, 8th, 15th, 23rd
  if ([1, 8, 15, 23].includes(day)) {
    buddhistHolidays.push('Uposatha Day');
  }

  return [...festivals, ...buddhistHolidays];
}

/**
 * Get next blog post date (next even lunar day)
 */
export function getNextBlogPostDate(date: Date = new Date()): Date {
  const currentDay = getLunarDay(date);
  let daysToAdd = 1;

  // Find next even day
  let nextDay = currentDay + 1;
  while (nextDay % 2 !== 0 && daysToAdd < 30) {
    daysToAdd++;
    nextDay++;
  }

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
}

/**
 * Get next peak day date (1st or 15th)
 */
export function getNextPeakDate(date: Date = new Date()): Date {
  const currentDay = getLunarDay(date);
  let daysToAdd = 1;

  // Calculate days to next peak (1 or 15)
  if (currentDay < 15) {
    daysToAdd = 15 - currentDay;
  } else {
    // Days to next month's 1st (assume 30 days max)
    const lunarDate = getLunarDate(date);
    daysToAdd = lunarDate.daysInMonth - currentDay + 1;
  }

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
}
