# 🎓 AI Learning Hub

### Nền tảng học tập thông minh được tích hợp AI

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-1.27.0-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

**[🚀 View in AI Studio](https://ai.studio/apps/drive/1gjciTXn17wp0-quS4XqWfEs28vEXir-1)** | **[📖 Documentation](docs/)** | **[🐛 Report Bug](../../issues)**

---

</div>

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng chính](#-tính-năng-chính)
- [Demo & Screenshots](#-demo--screenshots)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt & Sử dụng](#-cài-đặt--sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Responsive Design](#-responsive-design)
- [Roadmap](#-roadmap)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

## 🌟 Giới thiệu

**AI Learning Hub** là một ứng dụng web học tập toàn diện được tích hợp trí tuệ nhân tạo Google Gemini, được thiết kế để hỗ trợ học sinh và sinh viên tối ưu hóa thời gian học tập, hiểu sâu kiến thức và đạt được mục tiêu học tập một cách hiệu quả và thú vị.

### � Mục tiêu

- **Cá nhân hóa học tập**: AI thích nghi với phong cách học của từng người
- **Tiết kiệm thời gian**: Tự động hóa các tác vụ như tóm tắt, tạo quiz
- **Nâng cao hiệu quả**: Cung cấp giải pháp chi tiết và dễ hiểu
- **Quản lý thông minh**: Tích hợp lịch học và to-do list với AI

## ✨ Tính năng chính

### 🤖 AI Study Room - Phòng học thông minh

#### 1. 📸 Solve Homework - Giải bài tập từ ảnh

- Upload ảnh bài tập (hỗ trợ PNG, JPG, WEBP)
- AI phân tích và cung cấp lời giải chi tiết từng bước
- Giải thích khái niệm liên quan
- Lưu vào thư viện để xem lại

#### 2. 💬 AI Chat - Trò chuyện với AI

- **Quick Prompts**: 6 gợi ý câu hỏi mặc định + tạo custom prompts
- **Emoji Picker**: Chọn icon từ 20+ emojis phổ biến
- **Lưu trữ vĩnh viễn**: Prompts được lưu trên thiết bị
- **Tùy chỉnh linh hoạt**: Thêm, xóa, ẩn/hiện prompts
- Markdown rendering với syntax highlighting
- Streaming response real-time
- Lịch sử chat được lưu tự động

[📚 Chi tiết Quick Prompts →](docs/QUICK_PROMPTS_FEATURE.md)

#### 3. 📝 Summarize - Tóm tắt nội dung

- Paste văn bản dài hoặc upload file
- Chọn độ dài: Ngắn gọn / Vừa phải / Chi tiết
- Ngôn ngữ: Tiếng Việt / English
- Markdown format với bullet points
- Export và lưu vào thư viện

#### 4. 🎯 Quiz Generator - Tạo bài kiểm tra

- Upload tài liệu hoặc nhập nội dung
- Chọn số lượng câu hỏi (5/10/15/20)
- Độ khó: Dễ / Trung bình / Khó
- Tự động chấm điểm
- Xem đáp án và giải thích chi tiết
- Lưu quiz để luyện tập lại

### 📅 My Planner - Quản lý kế hoạch

#### 1. 🗓️ Calendar - Lịch học thông minh

- Hiển thị lịch tháng với events
- Thêm/sửa/xóa sự kiện
- AI Generator: Tạo lịch học tự động từ yêu cầu
- Color-coded events
- Responsive design cho mọi thiết bị

#### 2. ✅ To-Do List - Danh sách công việc

- Thêm/hoàn thành/xóa tasks
- Đánh dấu priority (High/Medium/Low)
- AI Generator: Tự động tạo task list
- Filter theo trạng thái
- Local storage persistence

### 📚 Library - Thư viện lưu trữ

- Xem tất cả nội dung đã tạo (Homework, Chat, Summary, Quiz)
- Filter theo loại nội dung
- Search theo tên
- Modal xem chi tiết với markdown rendering
- Xóa nội dung không cần thiết
- Export data

### 📊 Dashboard - Tổng quan

- Thống kê tổng quan: Tổng homework, chat, summary, quiz
- Quick access cards đến các tính năng
- Recent activities
- Usage analytics
- Beautiful gradient design

### 📈 Analytics - Phân tích

- Biểu đồ thống kê sử dụng
- Study streaks và milestones
- Time spent on each feature
- Performance insights
- Progress tracking

## 🖼️ Demo & Screenshots

<div align="center">

### Desktop View

<img src="https://i.ibb.co/vvHqvWk7/msedge-LD68-FDLA2-X.png" alt="Dashboard Desktop" width="800"/>

### Mobile View

<img src="https://i.ibb.co/HLsdyhp9/msedge-e-Ly-Zlfm-Qt-R.png" alt="Mobile View" width="375"/>

### AI Chat Interface

<img src="https://i.ibb.co/YBxrG8fm/msedge-5hx-Jfpm-Gd-K.png" alt="AI Chat" width="800"/>

</div>

## 🛠️ Công nghệ sử dụng

### Frontend Framework

- **React 19.2.0** - UI library với latest features
- **TypeScript 5.8.2** - Type-safe development
- **Vite 6.2.0** - Lightning-fast build tool

### AI & APIs

- **Google Gemini AI 1.27.0** - Powerful multimodal AI
- **Gemini Pro Vision** - Image analysis
- **Gemini Pro** - Text generation

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Animations, gradients, effects
- **Be Vietnam Pro Font** - Modern Vietnamese typography

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

### Storage & State

- **LocalStorage API** - Client-side data persistence
- **React Hooks** - State management (useState, useEffect, useCallback)
- **Context API** - Global state (có thể mở rộng)

## � Cài đặt & Sử dụng

### Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 hoặc **yarn** >= 1.22.0
- **Gemini API Key** (miễn phí tại [Google AI Studio](https://ai.google.dev))

### Bước 1: Clone repository

```bash
git clone https://github.com/yurikayami/AI-Learning-Hub.git
cd AI-Learning-Hub
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 3: Cấu hình API Key

Tạo file `.env.local` trong thư mục gốc:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Lưu ý**: Lấy API key miễn phí tại [Google AI Studio](https://aistudio.google.com/app/apikey)

### Bước 4: Chạy development server

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Bước 5: Build cho production

```bash
npm run build
# hoặc
yarn build
```

Preview build:

```bash
npm run preview
# hoặc
yarn preview
```

## 📁 Cấu trúc dự án

```
AI-Learning-Hub/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── icons/              # Icon components
│   │   │   └── Icons.tsx       # MenuIcon, XMarkIcon, etc.
│   │   ├── planner/            # Planner components
│   │   │   ├── Calendar.tsx    # Calendar với AI generator
│   │   │   └── Todolist.tsx    # To-do list với AI generator
│   │   ├── study/              # Study tools components
│   │   │   ├── AIChat.tsx      # AI chat với Quick Prompts
│   │   │   ├── QuizGenerator.tsx # Quiz creation & taking
│   │   │   ├── SolveHomework.tsx # Image-based homework solver
│   │   │   └── Summarize.tsx   # Content summarization
│   │   ├── DashboardCard.tsx   # Dashboard card component
│   │   ├── MarkdownRenderer.tsx # Markdown display component
│   │   └── Sidebar.tsx         # Navigation sidebar với mobile menu
│   ├── pages/                  # Page components
│   │   ├── AIStudyRoom.tsx     # Main study room với tabs
│   │   ├── AnalyticsPage.tsx   # Analytics & statistics
│   │   ├── Dashboard.tsx       # Dashboard overview
│   │   ├── LibraryPage.tsx     # Content library
│   │   ├── MyPlanner.tsx       # Calendar & to-do list
│   │   └── PlaceholderPage.tsx # Placeholder pages
│   ├── services/               # API services
│   │   └── geminiService.ts    # Gemini AI integration
│   ├── App.tsx                 # Main app component với routing
│   ├── index.tsx               # Entry point
│   ├── styles.css              # Global styles & animations
│   └── types.ts                # TypeScript type definitions
├── docs/                       # Documentation
│   ├── QUICK_PROMPTS_FEATURE.md # Quick Prompts documentation
│   └── ...                     # Other docs
├── .env.local                  # Environment variables (tạo từ .env.example)
├── index.html                  # HTML entry
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
├── metadata.json               # App metadata
├── CHANGELOG.md                # Version history
└── README.md                   # This file
```

## 🎨 Tính năng nổi bật

### 1. 🎭 Quick Prompts System

Hệ thống gợi ý câu hỏi nhanh có thể tùy chỉnh hoàn toàn:

- **6 Default Prompts**: Sẵn sàng sử dụng ngay
- **Custom Creation**: Tạo prompts riêng với emoji picker
- **Persistent Storage**: Lưu trên LocalStorage
- **Full CRUD**: Create, Read, Update, Delete, Hide/Show
- **Responsive Design**: Hoạt động mượt trên mọi thiết bị

### 2. 🎨 Modern UI/UX

- **Gradient Backgrounds**: Indigo-purple gradient theme
- **Smooth Animations**: Slide, fade, scale transitions
- **Loading States**: Skeleton screens và spinners
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback
- **Dark Mode Ready**: Chuẩn bị cho dark theme

### 3. 📱 Mobile-First Design

- **Hamburger Menu**: Sidebar ẩn trên mobile
- **Touch Optimized**: 44x44px minimum touch targets
- **Scrollable Tabs**: Horizontal scroll trên mobile
- **Responsive Typography**: Font size thích nghi
- **Safe Area Insets**: Hỗ trợ notch và home indicator

### 4. 🚀 Performance Optimized

- **Code Splitting**: Lazy loading components
- **Memoization**: React.memo, useMemo, useCallback
- **Debounced Search**: Giảm API calls
- **Efficient Re-renders**: Optimized state updates
- **Fast Build**: Vite với esbuild

### 5. 🔒 Data Security

- **Client-side Storage**: Dữ liệu lưu local
- **No Backend Required**: Không cần server
- **API Key Security**: Env variables
- **Input Validation**: Sanitize user input

## 📱 Responsive Design

### Breakpoints

| Device     | Size           | Features                                       |
| ---------- | -------------- | ---------------------------------------------- |
| 📱 Mobile  | < 640px        | Hamburger menu, single column, touch-optimized |
| 📱 Tablet  | 640px - 1024px | Adaptive grid, sidebar toggle                  |
| 🖥️ Desktop | > 1024px       | Full sidebar, multi-column, hover effects      |

### Design System

#### Colors

```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #6366f1 0%, #9333ea 100%);

/* Status Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

#### Typography

```css
/* Font Family */
font-family: 'Be Vietnam Pro', sans-serif;

/* Font Sizes */
Mobile: 12-16px base
Desktop: 14-18px base
```

#### Spacing

```css
/* Mobile */
padding: 1rem;
gap: 0.75rem;

/* Desktop */
padding: 1.5rem;
gap: 1rem;
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Nếu bạn muốn đóng góp:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Coding Standards

- **TypeScript**: Sử dụng types đầy đủ
- **Components**: Functional components với hooks
- **Styling**: Tailwind classes + custom CSS khi cần
- **Comments**: JSDoc cho functions, inline cho logic phức tạp
- **Git**: Conventional commits (feat, fix, docs, style, refactor)

## 📄 License

Dự án được phát hành dưới giấy phép **MIT License**.

```
MIT License

Copyright (c) 2025 Yuri Kayami

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Tác giả

**Yuri Kayami**

- GitHub: [@yurikayami](https://github.com/yurikayami)
- Email: [contact@example.com](mailto:contact@example.com)

## 🙏 Acknowledgments

- **Google Gemini AI** - Powerful AI capabilities
- **React Team** - Amazing framework
- **Vite Team** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Open Source Community** - Endless inspiration

---

<div align="center">

**⭐ Nếu bạn thấy dự án hữu ích, hãy cho một star nhé! ⭐**

**Made with ❤️ and ☕ by Yuri Kayami**

[⬆ Back to top](#-ai-learning-hub)

</div>
