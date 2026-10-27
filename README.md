# ISVCA 2027 — official congress website

Source for **https://isvca2027.org** — the 18th Meeting of the International Society of
Vascularized Composite Allotransplantation, 8–9 May 2027, Research Building, Linkou Chang Gung
Memorial Hospital, Taoyuan, Taiwan.

Plain static HTML, CSS and a small amount of vanilla JavaScript. **No build step.**
Pushing to `main` redeploys the live site automatically through Netlify.

---

## 怎麼更新網站（最常用）

1. 在本機編輯檔案（例如改 `index.html` 的最新消息）
2. 存檔後，在這個資料夾執行：

   ```bash
   git add .
   git commit -m "更新最新消息"
   git push
   ```

3. 約 30 秒後 https://isvca2027.org 就會是新版。

不想用指令的話，用 GitHub Desktop 開啟這個資料夾，按 **Commit** → **Push** 也一樣。

---

## 檔案結構

```
.
├── index.html                 首頁
├── registration.html          註冊費用、政策、退費
├── abstract-guidelines.html   投稿規定全文
├── submit-abstract.html       投稿表單（Netlify Forms）
├── abstract-thanks.html       投稿完成頁
├── awards.html                Congress Scientific Awards 全文
├── privacy.html               隱私政策
├── assets/
│   ├── css/site.css           ← 全站唯一樣式表（改外觀都在這裡）
│   ├── js/site.js             選單、分頁、表單增強
│   ├── *.webp                 圖片
│   └── favicon.svg
├── ISVCA2027-Abstract-Template.docx   摘要 Word 模板
├── booking-fullon-*.pdf       飯店訂房單
├── netlify.toml               Netlify 設定（含短網址轉址）
├── robots.txt / sitemap.xml
└── README.md
```

### 常見修改位置

| 想改什麼 | 改哪裡 |
| --- | --- |
| 最新消息 | `index.html` → `<section id="news">` |
| 重要日期 | `index.html` → `<section id="dates">` |
| 議程 | `index.html` → `<section id="program">` 的兩個 `<table class="sched">` |
| 講者（Confirmed/Invited） | `index.html` → `<section id="faculty">`，改 `faculty__status` 文字與 `is-confirmed` class |
| 註冊費 | `registration.html` 的 `<table class="feetable">`，以及 `index.html` 同名表格 |
| 顏色、字級、間距 | `assets/css/site.css` 最上方的 `:root` 變數 |

---

## 兩套外部系統（不在這個 repo 裡）

| 功能 | 位置 | 誰管理 |
| --- | --- | --- |
| **投稿 + Travel award 申請** | Netlify → Forms → `abstract-submission` | 我們（可匯出 CSV、下載附件） |
| **報名 + 繳費** | `https://payment.cgprstw.org/13` | 台灣整形外科系友會付款平台 |
| **Email 訂閱** | Formspree 表單 `xjgdzypz` | 我們 |

網域信箱 `info@ / program@ / registration@isvca2027.org` 透過 Forward Email 轉寄到
`2027isvca@gmail.com`。

---

## 第一次設定：GitHub → Netlify 自動部署

1. 在 Netlify 開啟 `isvca2027.org` 專案 → **Site configuration → Build & deploy → Continuous deployment**
2. 點 **Link repository**，選 GitHub，授權後挑這個 repo
3. 設定值：
   - **Branch to deploy**：`main`
   - **Build command**：留空
   - **Publish directory**：`.`
4. 儲存。之後每次 `git push` 都會自動部署。

> 連結 repo 之後就不要再用拖曳資料夾的方式部署了，否則會覆蓋掉 Git 的版本。

---

## 本機預覽

```bash
python3 -m http.server 8000
# 瀏覽器開 http://localhost:8000
```

---

## 設計原則（改版時請遵守）

- 一套字體（Inter），標題字重 500–600，正常大小寫；全大寫只用在極小的分類標籤
- 用細線、間距與留白分隔內容，不要用卡片堆疊、陰影或漸層
- 橘色 `#C96524` 只用於大字與裝飾；連結和按鈕底色用 `#A8511B`（對比度才達 WCAG AA）
- 內文左對齊，行寬約 70 字元
- 內容預設可見，不依賴 JavaScript 才顯示；尊重 `prefers-reduced-motion`

---

© 2026 ISVCA 2027 Organizing Committee
