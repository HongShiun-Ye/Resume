# 個人工作案例集

以 Vite、React 與 TypeScript 建置的一頁式靜態履歷案例網站，可部署至 Vercel。

## 本機開發

- `npm run dev`：啟動本機開發伺服器。
- `npm run build`：執行 TypeScript 檢查並產生 `dist` 靜態檔案。
- `npm run preview`：預覽正式建置結果。
- `npm run lint`：執行 Oxlint 檢查。

## 編輯個人內容

請集中編輯 `src/data/portfolio.ts`，包含首頁摘要、工作經歷、代表案例、技能與聯絡方式。所有未提供的資料目前均以「[待補資料]」標示；請以可公開、可驗證的真實內容取代，並確認案例素材的使用權限。

## 部署至 Vercel

將專案連結至 Vercel，使用 Vite 預設設定即可：建置指令為 `npm run build`，輸出目錄為 `dist`。此網站不需伺服器端 API 或資料庫。
