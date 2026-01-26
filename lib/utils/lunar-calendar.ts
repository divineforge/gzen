import * as LunarLib from 'lunar-javascript';

// Handle both ESM and CommonJS exports
const Lunar = (LunarLib as any).Lunar || (LunarLib as any).default?.Lunar || LunarLib;

/**
 * Get the current lunar date information
 */
export function getLunarDate(date: Date = new Date()) {
  const lunar = Lunar.fromDate(date);

  return {
    day: lunar.getDay(), // 1-30
    month: lunar.getMonth(), // 1-12
    year: lunar.getYear(),
    monthName: lunar.getMonthInChinese(),
    yearName: lunar.getYearInGanZhi(),
  };
}

/**
 * Get the current lunar day (1-30)
 */
export function getLunarDay(date: Date = new Date()): number {
  const lunar = Lunar.fromDate(date);
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
 * Full lunar month has ~29-30 days
 * We show two 15-day cycles:
 * - Days 1-15: Growing phase (waxing moon)
 * - Days 16-30: Second cycle (waning moon, maps to 1-15)
 */
export function getLotusStage(date: Date = new Date()): number {
  const day = getLunarDay(date);

  // Days 1-15: First cycle (waxing)
  if (day >= 1 && day <= 15) {
    return day;
  }

  // Days 16-30: Map to 1-15 (second cycle, waning)
  // Day 16 -> 1, Day 17 -> 2, ... Day 30 -> 15
  return day - 15;
}

/**
 * Get lotus stage description
 */
export function getLotusStageDescription(stage: number, locale: string = 'zh'): string {
  const descriptions: Record<string, Record<number, string>> = {
    zh: {
      1: '种子种下',
      2: '嫩芽破土',
      3: '幼茎生长',
      4: '叶片舒展',
      5: '继续成长',
      6: '茎干强壮',
      7: '花蕾初现',
      8: '花蕾发育',
      9: '花瓣显露',
      10: '绽放开始',
      11: '花瓣展开',
      12: '接近圆满',
      13: '几近盛开',
      14: '最终绽放',
      15: '圆满绽放',
    },
    en: {
      1: 'Seed Planted',
      2: 'Sprout Emerges',
      3: 'Young Stem',
      4: 'Leaves Form',
      5: 'Growth Continues',
      6: 'Stem Strengthens',
      7: 'Bud Forms',
      8: 'Bud Develops',
      9: 'Petals Visible',
      10: 'Opening Begins',
      11: 'Petals Unfold',
      12: 'Nearly Open',
      13: 'Almost Full',
      14: 'Final Opening',
      15: 'Full Bloom',
    },
    ja: {
      1: '種が植えられる',
      2: '芽が出る',
      3: '若い茎',
      4: '葉が形成される',
      5: '成長が続く',
      6: '茎が強くなる',
      7: '蕾ができる',
      8: '蕾が発達する',
      9: '花びらが見える',
      10: '開花が始まる',
      11: '花びらが開く',
      12: 'ほぼ開く',
      13: 'ほぼ満開',
      14: '最終開花',
      15: '満開',
    },
  };

  return descriptions[locale]?.[stage] || descriptions.en[stage] || '';
}

/**
 * Get lotus emoji for stage - 15 unique emojis for the growth cycle
 * Represents the journey from seed to full bloom
 */
export function getLotusEmoji(stage: number): string {
  const emojis: Record<number, string> = {
    1: '🌑',  // New moon - seed in darkness
    2: '💧',  // Water drop - nurturing begins
    3: '🌱',  // Seedling - first sprout
    4: '🌿',  // Herb - young growth
    5: '🍃',  // Leaves - foliage forming
    6: '☘️',  // Shamrock - leaves multiply
    7: '🌾',  // Stem - growing tall
    8: '🌷',  // Tulip - bud forming
    9: '🪻',  // Hyacinth - bud developing
    10: '🌸', // Cherry blossom - petals appear
    11: '🏵️', // Rosette - opening up
    12: '🌺', // Hibiscus - blooming
    13: '🌼', // Blossom - nearly full
    14: '🪷', // Lotus - almost complete
    15: '🪷✨', // Lotus with sparkle - full bloom!
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
    // Days to next month's 1st
    const lunar = Lunar.fromDate(date);
    const daysInMonth = lunar.getDaysInMonth();
    daysToAdd = daysInMonth - currentDay + 1;
  }

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  return nextDate;
}
