export type WorkExperience = {
  organization: string
  role: string
  period: string
  overview: string
  responsibilities: string[]
}

export type CaseStudy = {
  number: string
  title: string
  category: string
  period: string
  challenge: string
  contribution: string
  approach: string
  outcome: string
  skill: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type Interests = {
  sports: string[]
}

export const portfolio = {
  name: '葉鴻勳',
  headline: '研發工程師',
  summary: '主要負責 iOS App 與 Web 開發及維護；與業管單位溝通並釐清需求，將業務需求轉化為功能規劃及資料庫設計。',
  location: '台中市',
  experience: [
    {
      organization: '三信商業銀行',
      role: '中級專員／研發工程師',
      period: '2023/10-至今',
      overview: '負責 iOS App 與 Web 系統的開發及維護，與業管單位確認需求並實作功能；曾獨立開發工作管理平台及股東印鑑更新管理系統，並參與行動網銀新版功能開發。',
      responsibilities: [
        '獨立開發｜工作管理平台',
        '獨立開發｜股東印鑑更新管理系統',
        '協作開發｜行動網銀',
        '維護｜後臺權限管理系統',
        '維護｜行內傳真',
        '維護｜USB 寫入管理系統',
        '維護｜印鑑系統',        
        'iOS｜車貸利率試算',
        'iOS｜CotaInfo',
        'iOS｜CotaMobile',
        'iOS｜消金文件上傳',
        'iOS｜經營會議 App',
        'iOS｜常董會議 App',         
      ],
    },
  ] satisfies WorkExperience[],
  cases: [
    {
      number: '01',
      title: '工作管理平台',
      category: '獨立開發',
      period: '2026',
      challenge: '各組以 NAS 表單或網頁文件等不同方式記錄工作日誌，格式不一，造成月底彙整不易，也難以一致追蹤專案進度、執行人與任務狀態。',
      contribution: '獨立開發工作管理平台，依業管單位需求規劃並實作專案與任務管理功能。',
      approach: '將不同的工作日誌與專案追蹤需求整理為集中管理功能，記錄專案、任務執行人、任務狀態與進度回報，並提供專案每月進度變化及經辦任務與工作量查詢報表。',
      outcome: '兩個月內完成業管單位初步規劃並上線使用；上線後依使用者回饋及業管單位新增需求持續優化。',
      skill: '.Net Core、React'
    },
    {
      number: '02',
      title: '行動網銀新版',
      category: '協作開發',
      period: '2025~2026',
      challenge: '配合行動網銀新版上線，將指定的交易與個人化功能移轉至新版服務。',
      contribution: '與其他夥伴協作，負責黃金、外幣、預約交易及個人化設定等功能。',
      approach: '依新版網銀的功能規格，負責黃金、外幣、預約交易與個人化設定等前端功能；與團隊及後端協作確認資料格式、操作流程與錯誤情境，完成畫面與 API 串接，並配合測試及上線。',
      outcome: '新版行動網銀已上線。',
      skill: 'React、Cordova、Plugin'
    },
    {
      number: '03',
      title: '股東印鑑更新管理系統',
      category: '系統開發／流程管理',
      period: '2024',
      challenge: '過去以紙本申請並手動更新股東印鑑，流程冗長且耗時。',
      contribution: '負責系統開發，將紙本申請與人工更新流程轉為線上申請及核可流程。',
      approach: '依照既有作業流程整理申請、核可與放行步驟，讓更新作業可在系統中完成，並保留各階段處理紀錄。',
      outcome: '以系統流程取代紙本申請與人工更新，縮短印鑑資料更新作業所需時間。',
      skill: '.Net Core MVC'
    },
    {
      number: '04',
      title: '會議 App 與 Web 整合',
      category: 'iOS App／Web 串接',
      period: '2025',
      challenge: '會議資料與功能分布於 App 和網頁端，需要讓使用者在平板上完成閱讀與會議相關操作。',
      contribution: '負責經營會議 App、常董會議 App 與網頁端串接。',
      approach: '以 WebKit 整合既有網頁內容與 API，並加入 PDF 閱讀及原生標註工具，讓使用者能在 App 內閱讀會議資料並進行標記。',
      outcome: '常董會議 App 取代大量紙本報告，讓常務董事可透過平板於會前及會議中閱讀資料。',
      skill: 'Swift、WebKit、PDFKit'
    },
  ] satisfies CaseStudy[],
  skills: [
    {
      category: 'iOS 開發',
      items: [
        'iOS App 開發與維護',
        'iOS App 企業憑證年度更新',
        'Swift',
        'UIKit',
        'SwiftUI'
      ],
    },
    {
      category: 'Web 前端',
      items: [
        'React',
        'JavaScript',
        'HTML',
        'CSS',
        '響應式網頁設計',
      ],
    },
    {
      category: 'API 與系統整合',
      items: [
        'API 串接',
        'App 與 Web 整合',
        '前後端資料介接',
        'REST API 串接',
        'JSON 資料處理',
      ],
    },
    {
      category: '系統規劃與開發',
      items: [
        '需求訪談與需求釐清',
        '功能規劃',
        '專案與任務管理流程',
        '角色權限設計',
        '核可、退回流程',
        '資料庫功能規劃',
      ],
    },
    {
      category: '開發協作與維護',
      items: [
        '跨單位溝通',
        '使用者回饋與功能迭代',
        '系統測試與上線支援',
        '既有系統維護',
      ],
    },
  ] satisfies SkillGroup[],
  interests: {
    sports: ['羽球', '排球', '游泳', '抱石'],
  } satisfies Interests,
  contact: [
    { label: '電子郵件', value: 'honghun0622@gmail.com', href: '' },    
  ],
}