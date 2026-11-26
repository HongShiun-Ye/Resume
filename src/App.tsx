import { useEffect, useRef, useState, type ReactNode } from 'react'
import { portfolio } from './data/portfolio'
import './App.css'

function SportIcon({ sport }: { sport: string }) {
  const icons: Record<string, ReactNode> = {
    羽球: <><ellipse cx="10" cy="8" rx="5.5" ry="6.5" /><path d="m14 13 7 8M7 4l7 8M4 7l8 8M4 11l5 5" /></>,
    排球: <><circle cx="12" cy="12" r="9" /><path d="M4 8c5 0 9 2 12 6M8 4c1 5 4 9 9 12M18 5c-1 5-4 9-9 13" /></>,
    游泳: <><circle cx="17" cy="7" r="2.5" /><path d="m14 11-5 3 5 2 3-3 4 1M3 18c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 4 0M3 21c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 4 0" /></>,
    抱石: <><path d="M4 21 8 9l4 4 4-9 4 17" /><circle cx="12" cy="5" r="2" /><path d="m11 8-3 4-3 1m6-1 4 3 3-1m-8-2 1 5-3 4m5-7 2 4 3 3" /></>,
  }
  const iconContent = icons[sport]

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconContent ?? <path d="M4 12h16M12 4v16" />}
    </svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.01 })

    revealElements.forEach((element) => {
      element.classList.add('reveal-ready')
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)
  const featuredCases = portfolio.cases.slice(0, 2)
  const otherCases = portfolio.cases.slice(2)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="回到首頁">
          <span className="wordmark-mark" aria-hidden="true">W</span>
          <span>WORK / NOTES</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? '關閉導覽選單' : '開啟導覽選單'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          ref={menuButtonRef}
        >
          <span />
          <span />
        </button>
        <nav id="main-navigation" className={`main-nav${isMenuOpen ? ' is-open' : ''}`} aria-label="主要導覽">
          <a href="#experience" onClick={closeMenu}>經歷</a>
          <a href="#cases" onClick={closeMenu}>案例</a>
          <a href="#skills" onClick={closeMenu}>技能</a>
          <a href="#interests" onClick={closeMenu}>興趣</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>聯絡我 <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> 個人工作案例集</p>
            <h1 id="hero-title">{portfolio.name}<br /><span>{portfolio.headline}</span></h1>
            <p className="hero-summary">{portfolio.summary}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#cases">探索代表案例 <span aria-hidden="true">↘</span></a>
              <a className="text-link" href="#experience">了解工作經歷 <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-meta">
              <span>工作地點</span>
              <strong>{portfolio.location}</strong>
            </div>
          </div>

          <div className="hero-art reveal" role="img" aria-label="工作案例集視覺摘要">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-card art-card-back"><span>WORK / ARCHIVE</span><i /></div>
            <div className="art-card art-card-front">
              <span className="art-card-label">SELECTED WORK</span>
              <div className="art-card-number">01<span>—</span></div>
              <div className="art-card-line" />
              <div className="art-card-caption">專業<br />與實踐</div>
              <span className="art-card-foot">CASE STUDY · SELECTED WORK</span>
            </div>
            <span className="art-coordinate coordinate-top">FIG. 01 / PORTFOLIO</span>
            <span className="art-coordinate coordinate-bottom">SCROLL TO EXPLORE ↓</span>
          </div>
          <a className="scroll-cue" href="#experience"><span /> 向下探索</a> 
        </section>

        <section className="section-wrap content-section experience-section reveal" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="eyebrow">01 / CAREER</p>
            <h2 id="experience-title">工作經歷<span className="heading-period" aria-hidden="true">—</span></h2>
            <p className="section-intro">聚焦前一份工作的職責範圍、合作方式與實際參與。</p>
          </div>
          <div className="experience-list">
            {portfolio.experience.map((job, index) => (
              <article className="experience-card" key={`${job.organization}-${index}`}>
                <div className="experience-index">0{index + 1}</div>
                <div className="experience-main">
                  <div className="experience-title-row">
                    <div><h3>{job.role}</h3><p className="organization">{job.organization}</p></div>
                    <span className="period">{job.period}</span>
                  </div>
                  <p className="experience-overview">{job.overview}</p>
                  <ul className="responsibility-list">
                    {job.responsibilities.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cases-section reveal" id="cases" aria-labelledby="cases-title">
          <div className="section-wrap content-section">
            <div className="section-heading cases-heading">
              <div><p className="eyebrow">02 / SELECTED WORK</p><h2 id="cases-title">代表案例<span className="heading-period" aria-hidden="true">—</span></h2></div>
              <p className="section-intro">從問題背景到執行方式，呈現每個案例中的角色與貢獻。</p>
            </div>
            {featuredCases.map((featuredCase) => (
              <article className={`featured-case featured-case-${featuredCase.number}`} key={featuredCase.number}>
                <div className={`featured-case-visual featured-case-visual-${featuredCase.number}`} role="img" aria-label={`${featuredCase.title}的介面示意圖`}>
                  {featuredCase.number === '01' ? <div className="mock-window">
                    <div className="mock-window-bar">
                      <span className="mock-window-dots"><i /><i /><i /></span>
                      <span>WORKSPACE / PROJECT OVERVIEW</span>
                      <span className="mock-window-avatar">W</span>
                    </div>
                    <div className="mock-dashboard">
                      <aside className="mock-sidebar" aria-hidden="true">
                        <span className="mock-sidebar-brand">W<span>ORK</span></span>
                        <i className="is-active" /><i /><i /><i />
                        <span className="mock-sidebar-foot" />
                      </aside>
                      <div className="mock-main">
                        <div className="mock-dashboard-heading">
                          <div><span>工作管理平台 / 示意介面</span><strong>專案總覽</strong></div>
                          <span className="mock-add-button">＋ 新增專案</span>
                        </div>
                        <div className="mock-summary-row" aria-hidden="true">
                          <div><span>專案進度</span><i /><b /></div>
                          <div><span>任務狀態</span><i /><b /></div>
                          <div><span>本月回報</span><i /><b /></div>
                        </div>
                        <div className="mock-project-panel">
                          <div className="mock-panel-heading"><strong>近期專案</strong><span>查看全部 ↗</span></div>
                          <div className="mock-project-row"><i /><span>專案 A</span><b>進行中</b><span className="mock-progress"><i /></span></div>
                          <div className="mock-project-row"><i /><span>專案 B</span><b>待確認</b><span className="mock-progress is-short"><i /></span></div>
                          <div className="mock-project-row"><i /><span>專案 C</span><b>已完成</b><span className="mock-progress is-long"><i /></span></div>
                        </div>
                      </div>
                    </div>
                  </div> : (
                    <div className="mobile-banking-mock">
                      <div className="bank-phone">
                        <div className="bank-phone-notch" />
                        <div className="bank-phone-screen">
                          <div className="bank-phone-status"><span>9:41</span><span>●●● ▰</span></div>
                          <div className="bank-app-header"><strong>行動網銀</strong><span>☰</span></div>
                          <p className="bank-welcome">早安，您好</p>
                          <div className="bank-balance-card"><span>帳戶總覽</span><strong>••••••••</strong><small>帳戶資訊示意</small></div>
                          <div className="bank-quick-actions">
                            <div><i>金</i><span>黃金</span></div>
                            <div><i>幣</i><span>外幣</span></div>
                            <div><i>時</i><span>預約交易</span></div>
                            <div><i>＋</i><span>個人化</span></div>
                          </div>
                          <div className="bank-section-title"><strong>常用功能</strong><span>編輯</span></div>
                          <div className="bank-function-row"><i /><span /><b /></div>
                          <div className="bank-function-row"><i /><span /><b /></div>
                          <div className="bank-function-row"><i /><span /><b /></div>
                          <div className="bank-tab-bar"><i /><i /><i /><i /></div>
                        </div>
                      </div>
                      <div className="bank-floating-card"><span>新版功能</span><strong>交易與個人化服務</strong><div><i />黃金 <i />外幣 <i />預約</div></div>
                    </div>
                  )}
                  <span className="featured-visual-caption">{featuredCase.number === '01' ? 'CONCEPT UI / 示意畫面' : 'MOBILE UI / 示意畫面'}</span>
                </div>
                <div className="featured-case-content">
                  <div className="case-meta"><span>{featuredCase.category}</span><span>{featuredCase.period}</span></div>
                  <p className="featured-kicker">FEATURED CASE / {featuredCase.number}</p>
                  <h3>{featuredCase.title}</h3>
                  <p className="featured-challenge">{featuredCase.challenge}</p>
                  <div className="featured-outcome">
                    <span>成果與影響</span>
                    <p>{featuredCase.outcome}</p>
                  </div>
                  <div className="featured-contribution">
                    <span>負責角色</span>
                    <p>{featuredCase.contribution}</p>
                  </div>
                  <div className="featured-approach">
                    <span>執行方式</span>
                    <p>{featuredCase.approach}</p>
                  </div>
                  <div className="featured-tech">
                    <span>TECH STACK</span>
                    <div>{featuredCase.skill.split('、').map((technology) => <span key={technology}>{technology}</span>)}</div>
                  </div>
                </div>
                {featuredCase.number === '01' && <div className="featured-process">
                  <div className="featured-process-heading">
                    <p className="eyebrow">FROM IDEA TO DELIVERY</p>
                    <h4>從需求到上線的工作流程</h4>
                  </div>
                  <div className="process-steps">
                    <div className="process-step"><span>01</span><strong>需求與規格</strong><small>Spec Kit</small></div>
                    <i aria-hidden="true">→</i>
                    <div className="process-step"><span>02</span><strong>方案探索</strong><small>Google AI Studio</small></div>
                    <i aria-hidden="true">→</i>
                    <div className="process-step"><span>03</span><strong>開發與迭代</strong><small>GitHub Copilot</small></div>
                  </div>
                </div>}
              </article>
            ))}
            <div className="case-grid">
              {otherCases.map((caseStudy) => (
                <article className="case-card" key={caseStudy.number}>
                  <div className={`case-visual case-visual-${caseStudy.number}`} aria-hidden="true">
                    <span className="case-visual-index">CASE / {caseStudy.number}</span>
                    <div className="visual-composition"><span /><span /><span /></div>
                    <span className="visual-caption"></span>
                  </div>
                  <div className="case-content">
                    <div className="case-meta"><span>{caseStudy.category}</span><span>{caseStudy.period}</span></div>
                    <h3>{caseStudy.title}</h3>
                    <details className="case-details-toggle">
                      <summary><span>案例內容</span><span className="case-toggle-label" aria-hidden="true" /></summary>
                      <dl className="case-details">
                        <div><dt>背景與挑戰</dt><dd>{caseStudy.challenge}</dd></div>
                        <div><dt>負責角色</dt><dd>{caseStudy.contribution}</dd></div>
                        <div><dt>執行方式</dt><dd>{caseStudy.approach}</dd></div>
                        <div><dt>成果與影響</dt><dd>{caseStudy.outcome}</dd></div>
                        <div><dt>使用技術</dt><dd>{caseStudy.skill}</dd></div>
                      </dl>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap content-section skills-section reveal" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="eyebrow">03 / CAPABILITIES</p>
            <h2 id="skills-title">技能與方法<span className="heading-period" aria-hidden="true">—</span></h2>
            <p className="section-intro">以三個面向概括我的工作方式；實際執行內容請見上方代表案例。</p>
          </div>
          <div className="skills-grid">
            {portfolio.skills.map((group, index) => (
              <article className="capability-card" key={group.category}>
                <div className="capability-card-top">
                  <span className="capability-number">0{index + 1}</span>
                  <span className={`capability-mark capability-mark-${index + 1}`} aria-hidden="true"><i /><i /><i /></span>
                </div>
                <h3>{group.category}</h3>
                <p className="capability-summary">{group.summary}</p>
                <ul className="capability-tags">{group.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ul>
                <div className="capability-evidence">
                  <span>案例佐證</span>
                  <strong>{group.evidence}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap content-section interests-section reveal" id="interests" aria-labelledby="interests-title">
          <div className="section-heading">
            <p className="eyebrow">04 / BEYOND WORK</p>
            <h2 id="interests-title">工作之外<span className="heading-period" aria-hidden="true">—</span></h2>
            <p className="section-intro">下班後用運動切換心情，週末則留一點時間給戶外與山徑。</p>
          </div>
          <div className="interests-layout">
            <article className="interest-sports">
              <p className="interest-label">AFTER WORK / MOVEMENT</p>
              <h3>用運動切換日常節奏</h3>
              <p className="interest-note">平日晚間打球、游泳或抱石，讓每次活動都有不同節奏。</p>
              <div className="interest-tags">
                {portfolio.interests.sports.map((sport, index) => (
                  <span className="interest-tag" key={sport}>
                    <span className="interest-tag-icon"><SportIcon sport={sport} /></span>
                    <span className="interest-tag-copy"><small>0{index + 1} / SPORT</small><strong>{sport}</strong></span>
                    <span className="interest-tag-arrow" aria-hidden="true">↗</span>
                  </span>
                ))}
              </div>
              <span className="sports-card-foot">A LITTLE MOVEMENT, A BETTER RESET</span>
            </article>
            <article className="interest-outdoors">
              <span className="outdoors-index">WEEKEND / OUTDOOR NOTES</span>
              <div className="outdoors-art" aria-hidden="true"><span /><span /><span /></div>
              <ol className="outdoors-route" aria-label="戶外活動與登山計畫">
                <li>
                  <span className="route-stop-marker route-stop-current" aria-hidden="true" />
                  <span className="route-stop-copy"><small>平日／週末散步</small><strong>大坑步道</strong></span>
                  <span className="route-stop-status">TAICHUNG</span>
                </li>
                <li>
                  <span className="route-stop-marker route-stop-next" aria-hidden="true" />
                  <span className="route-stop-copy"><small>下一個計畫</small><strong>合歡北峰</strong></span>
                  <span className="route-stop-status">計畫中</span>
                </li>
              </ol>
              <div className="outdoors-copy">
                <h3>從熟悉的步道，走向下一段山徑。</h3>
                <p>有空就到戶外走走，也把合歡北峰列入下一個登山計畫。</p>
              </div>
              <span className="outdoors-coordinate">TAICHUNG · TRAIL JOURNAL</span>
            </article>
          </div>
        </section>

        <section className="contact-section reveal" id="contact" aria-labelledby="contact-title">
          <div className="section-wrap contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">05 / GET IN TOUCH</p>
              <h2 id="contact-title">期待進一步<br /><span>交流合作。</span></h2>
              <p>歡迎透過以下方式聯絡，或查看完整履歷與專業資料。</p>
            </div>
            <div className="contact-list">
              {portfolio.contact.map((item) => (
                <div className="contact-row" key={item.label}>
                  <span>{item.label}</span>
                  {item.href ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>{item.value} <span aria-hidden="true">↗</span></a> : <strong>{item.value}</strong>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#home"><span className="wordmark-mark" aria-hidden="true">W</span><span>WORK / NOTES</span></a>
        <span>© {portfolio.name}</span>
        <a href="#home">回到頁首 ↑</a>
      </footer>
    </div>
  )
}

export default App
 