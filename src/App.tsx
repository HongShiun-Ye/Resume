import { useEffect, useRef, useState } from 'react'
import { portfolio } from './data/portfolio'
import './App.css'

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
            <div className="case-grid">
              {portfolio.cases.map((caseStudy) => (
                <article className="case-card" key={caseStudy.number}>
                  <div className={`case-visual case-visual-${caseStudy.number}`} aria-hidden="true">
                    <span className="case-visual-index">CASE / {caseStudy.number}</span>
                    <div className="visual-composition"><span /><span /><span /></div>
                    <span className="visual-caption"></span>
                  </div>
                  <div className="case-content">
                    <div className="case-meta"><span>{caseStudy.category}</span><span>{caseStudy.period}</span></div>
                    <h3>{caseStudy.title}</h3>
                    <details className="case-details-toggle" open>
                      <summary><span>案例內容</span><span className="case-toggle-label" aria-hidden="true" /></summary>
                      <dl className="case-details">
                        <div><dt>背景與挑戰</dt><dd>{caseStudy.challenge}</dd></div>
                        <div><dt>負責角色</dt><dd>{caseStudy.contribution}</dd></div>
                        <div><dt>執行方式</dt><dd>{caseStudy.approach}</dd></div>
                        <div><dt>成果與影響</dt><dd>{caseStudy.outcome}</dd></div>
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
            <p className="section-intro">以實際工作情境佐證能力，讓專業不只停留在關鍵字。</p>
          </div>
          <div className="skills-grid">
            {portfolio.skills.map((group, index) => (
              <article className="skill-card" key={group.category}>
                <span className="skill-number">0{index + 1}</span>
                <h3>{group.category}</h3>
                <ul>{group.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section reveal" id="contact" aria-labelledby="contact-title">
          <div className="section-wrap contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">04 / GET IN TOUCH</p>
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
