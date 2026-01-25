import { useTranslations } from 'next-intl';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-6xl mb-4 block">🪷</span>
        <h1 className="text-4xl md:text-5xl font-bold text-saffron mb-4">
          {t('about.title')}
        </h1>
        <p className="text-2xl font-serif text-wisdom-text">
          禅生定，定生慧
        </p>
        <p className="text-lg text-zen-stone mt-2">
          {locale === 'zh'
            ? '禅给予定，定给予慧'
            : locale === 'ja'
            ? '禅から定へ、定から慧へ'
            : 'Zen gives rise to concentration, concentration gives rise to wisdom'
          }
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Mission Section */}
        <section className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🎯</span>
            {t('about.mission')}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'zh' ? (
              <>
                <p>
                  GrowZen 的使命是让佛法智慧走进现代人的日常生活。
                </p>
                <p>
                  我们相信，古老的智慧可以用现代的语言表达，
                  帮助人们在繁忙的生活中找到内心的平静与觉醒。
                </p>
                <p>
                  通过与农历周期同步，我们创造了一种独特的学习节奏——
                  不是每天信息轰炸，而是给予智慧生长的空间。
                </p>
              </>
            ) : locale === 'ja' ? (
              <>
                <p>
                  GrowZen の使命は、仏教の智慧を現代人の日常生活に届けることです。
                </p>
                <p>
                  古代の智慧は現代の言葉で表現でき、
                  忙しい生活の中で内なる平和と目覚めを見つける手助けになると信じています。
                </p>
                <p>
                  太陰暦のサイクルと同期することで、ユニークな学習のリズムを作り出しています。
                  毎日の情報の洪水ではなく、智慧が育つ空間を与えます。
                </p>
              </>
            ) : (
              <>
                <p>
                  GrowZen&apos;s mission is to bring Buddhist wisdom into the daily lives of modern people.
                </p>
                <p>
                  We believe ancient wisdom can be expressed in modern language,
                  helping people find inner peace and awakening amidst busy lives.
                </p>
                <p>
                  By synchronizing with the lunar cycle, we&apos;ve created a unique learning rhythm—
                  not daily information bombardment, but space for wisdom to grow.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-lotus-cream/30 rounded-lg border border-lotus-pink/20 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🧘</span>
            {t('about.philosophy')}
          </h2>
          <div className="space-y-6">
            {/* The Path */}
            <div className="bg-white/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-wisdom-text mb-4">
                {locale === 'zh' ? '禅定慧之道' : locale === 'ja' ? '禅定慧の道' : 'The Path of Zen-Samadhi-Prajna'}
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-6">
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <div className="text-3xl font-bold text-saffron">禅</div>
                  <div className="text-sm text-zen-stone mt-1">Chán / Zen</div>
                  <div className="text-xs text-wisdom-text mt-2">
                    {locale === 'zh' ? '禅修' : locale === 'ja' ? '瞑想' : 'Meditation'}
                  </div>
                </div>
                <div className="text-2xl text-saffron">→</div>
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <div className="text-3xl font-bold text-saffron">定</div>
                  <div className="text-sm text-zen-stone mt-1">Dìng / Samadhi</div>
                  <div className="text-xs text-wisdom-text mt-2">
                    {locale === 'zh' ? '专注' : locale === 'ja' ? '集中' : 'Concentration'}
                  </div>
                </div>
                <div className="text-2xl text-saffron">→</div>
                <div className="text-center p-4 bg-saffron/10 rounded-lg">
                  <div className="text-3xl font-bold text-saffron">慧</div>
                  <div className="text-sm text-zen-stone mt-1">Huì / Prajna</div>
                  <div className="text-xs text-wisdom-text mt-2">
                    {locale === 'zh' ? '智慧' : locale === 'ja' ? '智慧' : 'Wisdom'}
                  </div>
                </div>
              </div>
              <p className="text-wisdom-text font-serif text-center">
                {locale === 'zh'
                  ? '这是从修行到觉悟的道路，如同莲花从种子到盛开。'
                  : locale === 'ja'
                  ? 'これは修行から悟りへの道であり、蓮が種から満開になるようなものです。'
                  : 'This is the path from practice to enlightenment, like the lotus from seed to full bloom.'
                }
              </p>
            </div>

            {/* The Lotus */}
            <div className="bg-white/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-wisdom-text mb-4">
                {locale === 'zh' ? '莲花的象征' : locale === 'ja' ? '蓮の象徴' : 'The Lotus Symbol'}
              </h3>
              <div className="text-wisdom-text font-serif space-y-3">
                {locale === 'zh' ? (
                  <>
                    <p>
                      莲花是佛教最重要的象征之一。它生于淤泥之中，却能绽放出纯洁美丽的花朵。
                    </p>
                    <p>
                      这代表着觉悟的可能性——即使在最困难的环境中，我们也能培养出智慧与慈悲。
                    </p>
                    <p className="text-saffron font-semibold">
                      "如莲花于污泥中绽放，我们在日常生活中觉醒。"
                    </p>
                  </>
                ) : locale === 'ja' ? (
                  <>
                    <p>
                      蓮は仏教で最も重要な象徴の一つです。泥の中から生まれながら、純粋で美しい花を咲かせます。
                    </p>
                    <p>
                      これは悟りの可能性を表しています。最も困難な環境の中でさえ、私たちは智慧と慈悲を育むことができます。
                    </p>
                    <p className="text-saffron font-semibold">
                      「蓮の花が泥の中から咲くように、私たちは日常生活の中で目覚めます。」
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      The lotus is one of the most important symbols in Buddhism.
                      Born from mud, it blooms into a pure and beautiful flower.
                    </p>
                    <p>
                      This represents the possibility of awakening—even in the most difficult circumstances,
                      we can cultivate wisdom and compassion.
                    </p>
                    <p className="text-saffron font-semibold">
                      &quot;Like the lotus blooming from mud, we awaken in the midst of daily life.&quot;
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>⚙️</span>
            {locale === 'zh' ? '运作方式' : locale === 'ja' ? '仕組み' : 'How It Works'}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'zh' ? (
              <>
                <p>
                  GrowZen 跟随农历周期运作。每个农历月，我们遵循15天的莲花生长周期：
                </p>
                <ul className="list-none space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🌑</span>
                    <div>
                      <strong>第1天（朔月）</strong>
                      <br />
                      <span className="text-zen-stone">新周期开始，分享佛陀名言</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <strong>偶数日（2、4、6、8、10、12、14）</strong>
                      <br />
                      <span className="text-zen-stone">发布新的智慧文章</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🪷✨</span>
                    <div>
                      <strong>第15天（望月）</strong>
                      <br />
                      <span className="text-zen-stone">莲花圆满绽放，分享特别的佛陀名言</span>
                    </div>
                  </li>
                </ul>
                <p>
                  这种节奏让智慧有时间沉淀，让读者有空间反思和实践。
                </p>
              </>
            ) : locale === 'ja' ? (
              <>
                <p>
                  GrowZen は太陰暦のサイクルに従って運営されています。毎月、15日間の蓮の成長サイクルに従います：
                </p>
                <ul className="list-none space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🌑</span>
                    <div>
                      <strong>1日目（新月）</strong>
                      <br />
                      <span className="text-zen-stone">新しいサイクルの始まり、仏陀の言葉を共有</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <strong>偶数日（2、4、6、8、10、12、14）</strong>
                      <br />
                      <span className="text-zen-stone">新しい智慧の記事を公開</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🪷✨</span>
                    <div>
                      <strong>15日目（満月）</strong>
                      <br />
                      <span className="text-zen-stone">蓮が完全に開花、特別な仏陀の言葉を共有</span>
                    </div>
                  </li>
                </ul>
                <p>
                  このリズムにより、智慧が沈殿する時間が生まれ、読者が反省し実践する空間ができます。
                </p>
              </>
            ) : (
              <>
                <p>
                  GrowZen operates according to the lunar calendar cycle.
                  Each lunar month, we follow a 15-day lotus growth cycle:
                </p>
                <ul className="list-none space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🌑</span>
                    <div>
                      <strong>Day 1 (New Moon)</strong>
                      <br />
                      <span className="text-zen-stone">New cycle begins with a Buddha quote</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📝</span>
                    <div>
                      <strong>Even Days (2, 4, 6, 8, 10, 12, 14)</strong>
                      <br />
                      <span className="text-zen-stone">New wisdom articles published</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🪷✨</span>
                    <div>
                      <strong>Day 15 (Full Moon)</strong>
                      <br />
                      <span className="text-zen-stone">Lotus in full bloom with special Buddha quote</span>
                    </div>
                  </li>
                </ul>
                <p>
                  This rhythm allows wisdom to settle, giving readers space to reflect and practice.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Technology & Transparency */}
        <section className="bg-white rounded-lg shadow-sm border border-lotus-pink/10 p-8">
          <h2 className="text-2xl font-bold text-saffron mb-6 flex items-center gap-3">
            <span>🤖</span>
            {locale === 'zh' ? '技术与透明度' : locale === 'ja' ? '技術と透明性' : 'Technology & Transparency'}
          </h2>
          <div className="space-y-4 text-wisdom-text font-serif">
            {locale === 'zh' ? (
              <>
                <p>
                  GrowZen 使用人工智能（Claude API）辅助生成内容，但所有内容都基于真实的佛教经典和教导。
                </p>
                <p>
                  我们相信透明度很重要：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>所有佛陀名言都经过验证，标注来源</li>
                  <li>AI 生成的内容会经过审核</li>
                  <li>我们的代码是开源的，欢迎社区贡献</li>
                </ul>
              </>
            ) : locale === 'ja' ? (
              <>
                <p>
                  GrowZen は AI（Claude API）を使用してコンテンツの生成を支援していますが、
                  すべてのコンテンツは本物の仏教の経典と教えに基づいています。
                </p>
                <p>
                  透明性が重要だと信じています：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>すべての仏陀の言葉は検証され、出典が記載されています</li>
                  <li>AI が生成したコンテンツはレビューされます</li>
                  <li>コードはオープンソースで、コミュニティの貢献を歓迎します</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  GrowZen uses AI (Claude API) to assist with content generation,
                  but all content is based on authentic Buddhist scriptures and teachings.
                </p>
                <p>
                  We believe transparency is important:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All Buddha quotes are verified with sources cited</li>
                  <li>AI-generated content is reviewed</li>
                  <li>Our code is open source and community contributions are welcome</li>
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-lotus-cream/30 rounded-lg border border-lotus-pink/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-saffron mb-4">
            {locale === 'zh' ? '联系我们' : locale === 'ja' ? 'お問い合わせ' : 'Contact Us'}
          </h2>
          <p className="text-wisdom-text font-serif mb-6">
            {locale === 'zh'
              ? '如有问题、建议或想要贡献内容，请通过以下方式联系我们：'
              : locale === 'ja'
              ? 'ご質問、ご提案、またはコンテンツの貢献をご希望の場合は、以下の方法でお問い合わせください：'
              : 'For questions, suggestions, or content contributions, please reach out:'
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/divineforge/gzen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wisdom-text text-white px-6 py-3 rounded-lg hover:bg-wisdom-text/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </section>

        {/* Final Quote */}
        <section className="text-center py-8">
          <blockquote className="buddha-quote max-w-2xl mx-auto">
            <p className="text-wisdom-text mb-4 text-lg">
              {locale === 'zh'
                ? '"犹如莲花生于水中，长于水中，超出水面而立，不受水沾污，我生于世间，长于世间，超越世间，不为世间所染。"'
                : locale === 'ja'
                ? '「蓮の花が水の中に生まれ、水の中で育ち、水の上に立ち、水に汚されないように、私は世の中に生まれ、世の中で育ち、世の中を超え、世の中に汚されずに生きる。」'
                : '"Just as a lotus flower is born in water, grows in water and rises out of water to stand above it unsoiled, so I, born in the world, raised in the world having overcome the world, live unsoiled by the world."'
              }
            </p>
            <footer className="text-sm text-zen-stone">
              — {locale === 'zh' ? '佛陀，《增支部》' : locale === 'ja' ? '仏陀、増支部経典' : 'The Buddha, Anguttara Nikaya'}
            </footer>
          </blockquote>
        </section>
      </div>
    </div>
  );
}
