/**
 * GrowZen Lunar Calendar + Lotus Visualizer
 * Vanilla JS — no dependencies
 * Computes Chinese lunar date from Gregorian using the classic algorithm.
 */

(function () {
  'use strict';

  // ─── Lunar data tables ────────────────────────────────────────────────────
  // Each entry: bits 16-4 = month days flags (1=big/30, 0=small/29),
  //             bits 3-0 = leap month (0=none)
  // Source: authoritative Chinese calendar data 1900–2100
  var lunarInfo = [
    0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2, // 1900–1909
    0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977, // 1910–1919
    0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970, // 1920–1929
    0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950, // 1930–1939
    0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557, // 1940–1949
    0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0, // 1950–1959
    0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0, // 1960–1969
    0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6, // 1970–1979
    0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570, // 1980–1989
    0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06aa0,0x0a6b6,0x056a0,0x02b60,0x09177, // 1990–1999
    0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0, // 2000–2009
    0x15176,0x052b0,0x0f92f,0x0e950,0x06aa0,0x0ada0,0x14b55,0x04b60,0x0aae0,0x0a570, // 2010–2019
    0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4, // 2020–2029
    0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a, // 2030–2039
    0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50, // 2040–2049
  ];

  var BASE_YEAR = 1900;

  // Days in a Gregorian month (non-leap)
  var SOLAR_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];

  function isLeapYear(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

  function leapMonth(y) {
    var idx = y - BASE_YEAR;
    if (idx < 0 || idx >= lunarInfo.length) return 0;
    return lunarInfo[idx] & 0xf;
  }

  function leapDays(y) {
    var lm = leapMonth(y);
    if (!lm) return 0;
    var idx = y - BASE_YEAR;
    if (idx < 0 || idx >= lunarInfo.length) return 29;
    return (lunarInfo[idx] & 0x10000) ? 30 : 29;
  }

  function monthDays(y, m) {
    var idx = y - BASE_YEAR;
    if (idx < 0 || idx >= lunarInfo.length) return 29;
    return (lunarInfo[idx] & (0x10000 >> m)) ? 30 : 29;
  }

  function yearDays(y) {
    var sum = 348; // 12 × 29
    var idx = y - BASE_YEAR;
    if (idx < 0 || idx >= lunarInfo.length) return sum;
    for (var i = 0x8000; i > 0x8; i >>= 1) {
      if (lunarInfo[idx] & i) sum++;
    }
    return sum + leapDays(y);
  }

  // Convert Gregorian date → Lunar {year,month,day,isLeap}
  function solar2Lunar(y, m, d) {
    // Days since 1900-01-31 (the lunar new year of 1900)
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += isLeapYear(i) ? 366 : 365;
    }
    for (var j = 1; j < m; j++) {
      offset += SOLAR_MONTH[j - 1];
      if (j === 2 && isLeapYear(y)) offset++;
    }
    offset += d - 31; // base is Jan 31

    var lunarYear, lunarMonth, lunarDay;
    var isLeap = false;

    for (lunarYear = 1900; lunarYear < 2050 && offset > 0; lunarYear++) {
      var days = yearDays(lunarYear);
      offset -= days;
    }
    if (offset < 0) {
      offset += yearDays(lunarYear--);
    }

    var leap = leapMonth(lunarYear);
    var leapFlag = false;

    for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
      // Check leap month
      if (leap > 0 && lunarMonth === (leap + 1) && !leapFlag) {
        --lunarMonth;
        leapFlag = true;
        var daysInCurrentMonth = leapDays(lunarYear);
      } else {
        daysInCurrentMonth = monthDays(lunarYear, lunarMonth);
      }
      if (leapFlag && lunarMonth === (leap + 1)) leapFlag = false;
      offset -= daysInCurrentMonth;
    }

    if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
      if (leapFlag) {
        leapFlag = false;
      } else {
        leapFlag = true;
        --lunarMonth;
      }
    }
    if (offset < 0) {
      offset += leapFlag
        ? leapDays(lunarYear)
        : monthDays(lunarYear, lunarMonth);
      --lunarMonth;
    }

    lunarDay = offset + 1;
    isLeap = leapFlag;

    return { year: lunarYear, month: lunarMonth, day: lunarDay, isLeap: isLeap };
  }

  // ─── Lotus data ──────────────────────────────────────────────────────────
  var LOTUS_EMOJIS = {
    1:'🌑', 2:'💧', 3:'🌱', 4:'🪴', 5:'🌿', 6:'🍃', 7:'☘️', 8:'🌓',
    9:'🌷', 10:'🪻', 11:'🌸', 12:'🌺', 13:'🏵️', 14:'🪷', 15:'🪷✨',
    16:'✨🪷', 17:'🫛', 18:'🌰', 19:'💎', 20:'🎁', 21:'🧘', 22:'🌗',
    23:'🍂', 24:'🪨', 25:'😴', 26:'🕯️', 27:'🔕', 28:'☁️', 29:'🌘', 30:'⭕',
  };

  var LOTUS_DESC = {
    zh: {
      1:'新月·种子入土', 2:'蓄力·静待萌发', 3:'破土·嫩芽初现', 4:'生根·扎稳根基',
      5:'舒展·叶片初开', 6:'生长·茎干渐强', 7:'向上·欣欣向荣', 8:'上弦·蓄势待发',
      9:'花蕾·含苞欲放', 10:'孕育·花瓣渐显', 11:'绽放·花开初现', 12:'盛开·芳华绽放',
      13:'圆满·几近盛放', 14:'极致·临近圆月', 15:'满月·莲开见佛',
      16:'恩泽·散播芬芳', 17:'结实·莲蓬初成', 18:'成熟·果实饱满', 19:'圆融·智慧结晶',
      20:'布施·分享果实', 21:'沉淀·回归本心', 22:'下弦·内观静修', 23:'放下·落叶归根',
      24:'归藏·回归泥土', 25:'安息·静待重生', 26:'净化·涅槃之前', 27:'寂静·万籁俱寂',
      28:'虚空·无我无相', 29:'残月·最后一息', 30:'晦日·周而复始',
    },
    en: {
      1:'New Moon · Seed Planted', 2:'Gathering · Awaiting Sprout', 3:'Breaking Ground · First Sprout',
      4:'Rooting · Foundation Set', 5:'Unfolding · First Leaves', 6:'Growing · Stem Strengthens',
      7:'Rising · Thriving Growth', 8:'First Quarter · Building Energy', 9:'Budding · Ready to Bloom',
      10:'Forming · Petals Emerging', 11:'Opening · First Bloom', 12:'Flourishing · Radiant Beauty',
      13:'Fullness · Near Complete', 14:'Peak · Approaching Full Moon', 15:'Full Moon · Lotus Enlightenment',
      16:'Blessing · Spreading Fragrance', 17:'Fruiting · Seed Pod Forms', 18:'Ripening · Seeds Mature',
      19:'Wisdom · Crystallized Insights', 20:'Giving · Sharing the Harvest', 21:'Settling · Returning to Heart',
      22:'Last Quarter · Inner Reflection', 23:'Releasing · Leaves Return to Root', 24:'Returning · Back to Earth',
      25:'Resting · Awaiting Rebirth', 26:'Purifying · Before Nirvana', 27:'Stillness · Perfect Silence',
      28:'Emptiness · No Self No Form', 29:'Crescent · Final Breath', 30:'Dark Moon · Cycle Complete',
    },
    ja: {
      1:'新月・種を蒔く', 2:'蓄え・発芽を待つ', 3:'発芽・芽が出る', 4:'根付く・基盤を築く',
      5:'展開・初葉が開く', 6:'成長・茎が強くなる', 7:'上昇・盛んに育つ', 8:'上弦・力を蓄える',
      9:'蕾む・開花の準備', 10:'形成・花びらが現れる', 11:'開花・最初の花', 12:'繁栄・輝く美しさ',
      13:'充実・ほぼ完成', 14:'頂点・満月に近づく', 15:'満月・蓮華の悟り',
      16:'恵み・香りを広げる', 17:'結実・蓮の実ができる', 18:'成熟・種子が熟す',
      19:'智慧・洞察の結晶', 20:'布施・収穫を分かち合う', 21:'落ち着き・心に戻る',
      22:'下弦・内省', 23:'手放す・根に戻る', 24:'帰還・大地に還る',
      25:'休息・再生を待つ', 26:'浄化・涅槃の前', 27:'静寂・完全な沈黙',
      28:'空・無我無相', 29:'残月・最後の息吹', 30:'晦日・循環の完成',
    },
  };

  // ─── Gradients per lunar day ──────────────────────────────────────────────
  var THEMES = {
    1:  {bg:'linear-gradient(135deg,#080816 0%,#0e0d22 60%,#0b0b18 100%)',tc:'#c7d2fe'},
    2:  {bg:'linear-gradient(135deg,#0a0c1c 0%,#12143a 60%,#0d1026 100%)',tc:'#c7d2fe'},
    3:  {bg:'linear-gradient(135deg,#0c1024 0%,#171a50 60%,#101428 100%)',tc:'#bfdbfe'},
    4:  {bg:'linear-gradient(135deg,#0e1430 0%,#1a2464 60%,#101835 100%)',tc:'#bfdbfe'},
    5:  {bg:'linear-gradient(135deg,#0d1830 0%,#1a2e58 60%,#0f1d35 100%)',tc:'#bae6fd'},
    6:  {bg:'linear-gradient(135deg,#0c1e30 0%,#143848 60%,#0e2030 100%)',tc:'#bae6fd'},
    7:  {bg:'linear-gradient(135deg,#0c2030 0%,#14443c 60%,#0d2430 100%)',tc:'#99f6e4'},
    8:  {bg:'linear-gradient(135deg,#0d2430 0%,#185040 60%,#0f2a28 100%)',tc:'#99f6e4'},
    9:  {bg:'linear-gradient(135deg,#0e2a28 0%,#1a5030 60%,#102e20 100%)',tc:'#a7f3d0'},
    10: {bg:'linear-gradient(135deg,#102c20 0%,#205e28 60%,#123015 100%)',tc:'#a7f3d0'},
    11: {bg:'linear-gradient(135deg,#123015 0%,#356820 60%,#1e3810 100%)',tc:'#d9f99d'},
    12: {bg:'linear-gradient(135deg,#283818 0%,#556820 60%,#3c4410 100%)',tc:'#fef08a'},
    13: {bg:'linear-gradient(135deg,#3c4010 0%,#786020 60%,#4a4010 100%)',tc:'#fef08a'},
    14: {bg:'linear-gradient(135deg,#504010 0%,#9c7020 60%,#604010 100%)',tc:'#fde68a'},
    15: {bg:'linear-gradient(135deg,#8c6210 0%,#d4a020 60%,#9a6c10 100%)',tc:'#78350f'},
    16: {bg:'linear-gradient(135deg,#7a5010 0%,#b87020 60%,#623808 100%)',tc:'#fde68a'},
    17: {bg:'linear-gradient(135deg,#623808 0%,#9e6020 60%,#502e10 100%)',tc:'#fed7aa'},
    18: {bg:'linear-gradient(135deg,#502e10 0%,#844e28 60%,#422018 100%)',tc:'#fed7aa'},
    19: {bg:'linear-gradient(135deg,#422018 0%,#6c3c30 60%,#361c1c 100%)',tc:'#fecdd3'},
    20: {bg:'linear-gradient(135deg,#361c1c 0%,#583830 60%,#2c1c1c 100%)',tc:'#fecdd3'},
    21: {bg:'linear-gradient(135deg,#2c1c1c 0%,#483e30 60%,#241c18 100%)',tc:'#d6d3d1'},
    22: {bg:'linear-gradient(135deg,#241c18 0%,#3a3830 60%,#1e1c18 100%)',tc:'#d6d3d1'},
    23: {bg:'linear-gradient(135deg,#1e1c18 0%,#2e2e2a 60%,#181818 100%)',tc:'#d6d3d1'},
    24: {bg:'linear-gradient(135deg,#181818 0%,#24242c 60%,#141420 100%)',tc:'#cbd5e1'},
    25: {bg:'linear-gradient(135deg,#141420 0%,#1e1e2a 60%,#101018 100%)',tc:'#cbd5e1'},
    26: {bg:'linear-gradient(135deg,#101018 0%,#18181e 60%,#0c0c14 100%)',tc:'#94a3b8'},
    27: {bg:'linear-gradient(135deg,#0c0c14 0%,#141418 60%,#080810 100%)',tc:'#94a3b8'},
    28: {bg:'linear-gradient(135deg,#080810 0%,#10101c 60%,#080808 100%)',tc:'#a5b4fc'},
    29: {bg:'linear-gradient(135deg,#080808 0%,#0c0c16 60%,#080812 100%)',tc:'#a5b4fc'},
    30: {bg:'linear-gradient(135deg,#080812 0%,#0a0a1c 60%,#0c0c18 100%)',tc:'#c7d2fe'},
  };

  // ─── Particle system ─────────────────────────────────────────────────────
  var pCanvas, pCtx, pParticles = [], pColor = '#c7d2fe', pAnimId = null;
  var PARTICLE_COUNT = 28;
  var FALLBACK_PARTICLE_RGBA = 'rgba(200,210,255,';

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(r)) { return FALLBACK_PARTICLE_RGBA + alpha + ')'; }
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function mkParticle(randomY) {
    var w = pCanvas ? pCanvas.width  : 1200;
    var h = pCanvas ? pCanvas.height : 480;
    return {
      x:    Math.random() * w,
      y:    randomY ? Math.random() * h : h + 8,
      r:    Math.random() * 2 + 1,
      vy:   Math.random() * 0.35 + 0.08,
      vx:   (Math.random() - 0.5) * 0.25,
      op:   Math.random() * 0.22 + 0.05,
      wave: Math.random() * Math.PI * 2,
    };
  }

  function initParticles() {
    pCanvas = document.getElementById('lunar-particles');
    if (!pCanvas) { return; }
    pCtx = pCanvas.getContext('2d');
    resizeParticles();
    window.addEventListener('resize', resizeParticles);
    pParticles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      pParticles.push(mkParticle(true));
    }
    if (pAnimId) { cancelAnimationFrame(pAnimId); }
    pAnimId = requestAnimationFrame(tickParticles);
  }

  function resizeParticles() {
    var hero = document.getElementById('lunar-hero');
    if (!hero || !pCanvas) { return; }
    pCanvas.width  = hero.offsetWidth;
    pCanvas.height = hero.offsetHeight;
  }

  function tickParticles() {
    if (!pCtx || !pCanvas) { return; }
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    for (var i = 0; i < pParticles.length; i++) {
      var p = pParticles[i];
      p.y    -= p.vy;
      p.wave += 0.018;
      p.x    += p.vx + Math.sin(p.wave) * 0.18;
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pCtx.fillStyle = hexToRgba(pColor, p.op);
      pCtx.fill();
      if (p.y < -8) {
        pParticles[i] = mkParticle(false);
        pParticles[i].x = Math.random() * pCanvas.width;
      }
    }
    pAnimId = requestAnimationFrame(tickParticles);
  }


  function getNow() {
    var now = new Date();
    var utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 8 * 3600000);
  }

  // ─── UI string translations (keyed by lang) ─────────────────────────────
  var UI_STRINGS = {
    zh: {
      preview: function(d) { return '预览 · 第' + d + '日'; },
      dayLabel: function(d) { return '农历 第' + d + '日'; },
      fullMoon: ' · 满月 🌕',
      newMoon: ' · 新月 🌑',
      monthInfo: function(m) { return '农历 · 第' + m + '月 · 聚善'; },
    },
    en: {
      preview: function(d) { return 'Preview · Day ' + d; },
      dayLabel: function(d) { return 'Lunar Day ' + d; },
      fullMoon: ' · Full Moon 🌕',
      newMoon: ' · New Moon 🌑',
      monthInfo: function(m) { return 'Lunar Month ' + m + ' · GrowZen'; },
    },
    ja: {
      preview: function(d) { return 'プレビュー · 第' + d + '日'; },
      dayLabel: function(d) { return '農暦 第' + d + '日'; },
      fullMoon: ' · 満月 🌕',
      newMoon: ' · 新月 🌑',
      monthInfo: function(m) { return '農暦 · 第' + m + '月 · 善聚慧生'; },
    },
  };

  // ─── State ────────────────────────────────────────────────────────────────
  var todayLunar, totalDays, currentOffset;

  function init() {
    var hero = document.getElementById('lunar-hero');
    if (!hero) return;

    var now = getNow();
    todayLunar = solar2Lunar(now.getFullYear(), now.getMonth() + 1, now.getDate());
    // The lotus visualizer always displays 30 stages (one per day) regardless of
    // whether the actual lunar month has 29 or 30 days. This is intentional:
    // the 30-stage cycle represents the full symbolic lotus journey.
    totalDays = 30;
    currentOffset = 0;

    render();
    initParticles();

    document.getElementById('lunar-prev').addEventListener('click', function () {
      currentOffset = (currentOffset - 1 + totalDays) % totalDays;
      render();
    });
    document.getElementById('lunar-next').addEventListener('click', function () {
      currentOffset = (currentOffset + 1) % totalDays;
      render();
    });
    document.getElementById('lunar-today').addEventListener('click', function () {
      currentOffset = 0;
      render();
    });
  }

  function render() {
    var lang = (document.getElementById('lunar-hero').dataset.lang) || 'zh';
    var viewedDay = ((todayLunar.day - 1 + currentOffset + totalDays) % totalDays) + 1;
    var theme = THEMES[viewedDay] || THEMES[1];
    var isPreview = currentOffset !== 0;
    var isFullMoon = viewedDay === 15;
    var isNewMoon = viewedDay === 1;

    // Background
    document.getElementById('lunar-bg').style.background = theme.bg;

    // Update particle colour to match the day theme
    pColor = theme.tc || '#c7d2fe';

    // Glow
    var glowEl = document.getElementById('lunar-glow');
    if (isFullMoon) {
      glowEl.style.background = 'radial-gradient(ellipse 60% 50% at 50% 40%,rgba(212,160,32,0.30) 0%,transparent 70%)';
    } else if (isNewMoon) {
      glowEl.style.background = 'radial-gradient(ellipse 40% 35% at 50% 40%,rgba(99,102,241,0.18) 0%,transparent 70%)';
    } else {
      glowEl.style.background = 'radial-gradient(ellipse 50% 45% at 50% 40%,rgba(255,255,255,0.06) 0%,transparent 70%)';
    }

    // Preview badge
    var badge = document.getElementById('lunar-preview-badge');
    var ui = UI_STRINGS[lang] || UI_STRINGS.zh;
    if (isPreview) {
      badge.textContent = ui.preview(viewedDay);
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }

    // Emoji
    var emojiEl = document.getElementById('lunar-emoji');
    emojiEl.textContent = LOTUS_EMOJIS[viewedDay] || '🪷';
    emojiEl.style.opacity = isPreview ? '0.7' : '1';
    emojiEl.style.transform = isPreview ? 'scale(0.9)' : 'scale(1)';

    // Text colour
    setTextColor(theme.tc);

    // Day label
    var dayLabel = document.getElementById('lunar-day-label');
    var moonLabel = isFullMoon ? ui.fullMoon : isNewMoon ? ui.newMoon : '';
    dayLabel.textContent = ui.dayLabel(viewedDay) + moonLabel;

    // Descriptions — always zh primary, ja secondary, en tertiary
    var descs = LOTUS_DESC;
    document.getElementById('lunar-desc-primary').textContent = descs.zh[viewedDay] || '';
    document.getElementById('lunar-desc-secondary').textContent = descs.ja[viewedDay] || '';
    document.getElementById('lunar-desc-tertiary').textContent = descs.en[viewedDay] || '';

    // Month info
    var infoEl = document.getElementById('lunar-month-info');
    if (!isPreview) {
      infoEl.textContent = ui.monthInfo(todayLunar.month);
      infoEl.style.display = '';
    } else {
      infoEl.style.display = 'none';
    }

    // Today button
    var todayBtn = document.getElementById('lunar-today');
    var todayLabel = document.getElementById('lunar-today-label');
    if (isPreview) {
      todayBtn.classList.remove('hidden');
      todayLabel.style.display = 'none';
    } else {
      todayBtn.classList.add('hidden');
      todayLabel.style.display = '';
    }

    // Dots
    renderDots(viewedDay);
  }

  function setTextColor(tc) {
    var ids = ['lunar-day-label','lunar-desc-primary','lunar-desc-secondary','lunar-desc-tertiary','lunar-month-info','lunar-today-label'];
    ids.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.color = tc;
    });
  }

  function renderDots(viewedDay) {
    var d1 = document.getElementById('lunar-dots-1');
    var d2 = document.getElementById('lunar-dots-2');
    if (!d1 || !d2) return;
    d1.innerHTML = '';
    d2.innerHTML = '';

    for (var i = 1; i <= 30; i++) {
      var btn = document.createElement('button');
      btn.setAttribute('aria-label', '农历 第' + i + '日');
      btn.className = 'w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center';
      var span = document.createElement('span');
      span.className = 'rounded-full transition-all duration-300 block';
      if (i === viewedDay) {
        span.style.cssText = 'background:white;width:10px;height:10px;';
      } else if (i === 15) {
        span.style.cssText = 'background:rgba(255,255,255,0.5);width:8px;height:8px;';
      } else {
        span.style.cssText = 'background:rgba(255,255,255,0.25);width:6px;height:6px;';
      }
      btn.appendChild(span);
      (function(day) {
        btn.addEventListener('click', function() {
          currentOffset = (day - todayLunar.day + totalDays) % totalDays;
          render();
        });
      })(i);
      if (i <= 15) {
        d1.appendChild(btn);
      } else {
        d2.appendChild(btn);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
