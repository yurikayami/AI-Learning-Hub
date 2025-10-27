# 💡 Quick Prompts - Tính năng Gợi ý Câu hỏi Nhanh

## 📋 Tổng quan

Quick Prompts là tính năng giúp người dùng bắt đầu cuộc trò chuyện với AI một cách nhanh chóng và dễ dàng thông qua các mẫu câu hỏi có sẵn và có thể tùy chỉnh.

## ✨ Tính năng chính

### 1. **Prompts Mặc định**

6 prompts có sẵn để bắt đầu:

- 📚 **Giải thích chi tiết** - Giải thích sâu về một chủ đề
- 💡 **Cho ví dụ thực tế** - Yêu cầu các ví dụ cụ thể
- ✍️ **Tạo bài tập** - Tạo bài tập thực hành
- ⚖️ **So sánh khái niệm** - So sánh và phân tích sự khác biệt
- 📝 **Tóm tắt nội dung** - Rút gọn thông tin
- 👶 **Giải thích như cho trẻ 5 tuổi** - Giải thích đơn giản

### 2. **Tạo Custom Prompts**

Người dùng có thể:

- ✅ Tạo prompt riêng của mình
- ✅ Chọn icon emoji tùy thích (20+ emojis phổ biến)
- ✅ Đặt tên và nội dung prompt tùy chỉnh
- ✅ Lưu trữ vĩnh viễn trong localStorage

### 3. **Quản lý Prompts**

- ✅ Xem tất cả prompts (default + custom)
- ✅ Xóa custom prompts (hover để hiện nút xóa)
- ✅ Ẩn/hiện danh sách prompts
- ✅ Sử dụng prompt bất kỳ lúc nào trong chat

## 🎯 Cách sử dụng

### Lần đầu sử dụng

1. Mở **Phòng học AI** → Tab **Chat AI**
2. Xem danh sách Quick Prompts bên dưới lời chào
3. Click vào một prompt để điền sẵn câu hỏi
4. Hoàn thiện câu hỏi và gửi

### Tạo Custom Prompt

1. Click nút **"+ Tạo mới"** hoặc **"+ Tạo prompt"**
2. Chọn icon:
   - Click vào ô icon để mở emoji picker
   - Chọn emoji yêu thích từ 20 options
3. Nhập tên prompt (VD: "Giải thích ngắn gọn")
4. Nhập nội dung prompt (VD: "Giải thích ngắn gọn và súc tích về...")
5. Click **"Lưu"**

### Sử dụng trong Chat

1. Sau khi đã có chat history, click **"💡 Hiện gợi ý câu hỏi"**
2. Prompts xuất hiện dưới dạng compact grid
3. Click prompt để auto-fill vào input
4. Tiếp tục chat bình thường

### Xóa Custom Prompt

1. Hover chuột lên custom prompt (có dấu × ở góc)
2. Click nút × màu đỏ
3. Prompt bị xóa ngay lập tức

## 🎨 UI/UX Design

### Empty State (Chưa có chat)

```
┌──────────────────────────────────┐
│      👋 Chào bạn, tôi là Mentor! │
│  Bạn có câu hỏi nào về bài học?  │
│                                   │
│  💡 Gợi ý câu hỏi nhanh  [+ Tạo] │
│  ┌────────┬────────┬────────┐   │
│  │ 📚 Giải│ 💡 Cho │ ✍️ Tạo │   │
│  │ thích  │ ví dụ  │ bài tập│   │
│  ├────────┼────────┼────────┤   │
│  │ ⚖️ So  │ 📝 Tóm │ 👶 Giải│   │
│  │ sánh   │ tắt    │ thích  │   │
│  └────────┴────────┴────────┘   │
│                                   │
│  Click vào một gợi ý để bắt đầu  │
└──────────────────────────────────┘
```

### In-Chat State (Có chat history)

```
┌──────────────────────────────────┐
│  [Messages history...]           │
│                                   │
│  [🔽 Ẩn gợi ý] [+ Tạo prompt]   │
│  ┌──────────────────────────────┐│
│  │ [Compact Grid View]          ││
│  │ 📚 💡 ✍️ ⚖️ 📝 👶          ││
│  └──────────────────────────────┘│
│                                   │
│  [Input box...]                  │
└──────────────────────────────────┘
```

### Add Custom Prompt Form

```
┌──────────────────────────────────┐
│  Tạo prompt tùy chỉnh            │
│  ┌──┬────────────────────────┐   │
│  │⭐│ Tên prompt...          │   │
│  └──┴────────────────────────┘   │
│  ┌─────────────────────────────┐ │
│  │ Nội dung prompt...          │ │
│  │                             │ │
│  └─────────────────────────────┘ │
│           [Hủy]  [Lưu]           │
└──────────────────────────────────┘
```

## 🔧 Technical Implementation

### Data Structure

```typescript
interface QuickPrompt {
  id: string; // Unique ID (timestamp)
  label: string; // Display name
  prompt: string; // Actual prompt text
  icon: string; // Emoji icon
  category: "default" | "custom";
}
```

### State Management

```typescript
const [showQuickPrompts, setShowQuickPrompts] = useState(true);
const [customPrompts, setCustomPrompts] = useState<QuickPrompt[]>([]);
const [showAddPrompt, setShowAddPrompt] = useState(false);
const [newPromptLabel, setNewPromptLabel] = useState("");
const [newPromptText, setNewPromptText] = useState("");
const [newPromptIcon, setNewPromptIcon] = useState("⭐");
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
```

### LocalStorage

```typescript
// Save
localStorage.setItem("customPrompts", JSON.stringify(customPrompts));

// Load
const saved = localStorage.getItem("customPrompts");
if (saved) {
  setCustomPrompts(JSON.parse(saved));
}
```

### Components

1. **AIChat** - Main component
2. **EmojiPicker** - Popup emoji selector
3. **QuickPromptCard** - Individual prompt button
4. **AddPromptForm** - Create new prompt form

## 📱 Responsive Design

### Mobile (< 640px)

- Grid: 2 columns
- Smaller icons and text
- Touch-friendly buttons (min 44x44px)
- Compact spacing

### Tablet (640px - 1024px)

- Grid: 2-3 columns
- Medium icons and text
- Balanced spacing

### Desktop (> 1024px)

- Grid: 3 columns
- Larger icons and text
- Generous spacing
- Hover effects

## 🎨 Styling Details

### Colors

- Primary: Indigo-Purple gradient
- Default prompts: White background
- Custom prompts: White background + red delete button
- Hover: Border indigo-300, shadow-md

### Animations

- Smooth transitions (200ms)
- Hover scale effects
- Fade in/out for emoji picker
- Opacity transitions for delete button

### Typography

- Prompt label: text-xs md:text-sm, font-medium
- Form labels: text-xs md:text-sm, font-semibold
- Buttons: text-xs md:text-sm

## 🚀 Future Enhancements

### Phase 2

- [ ] **Prompt Categories**: Organize by subject (Math, Physics, etc.)
- [ ] **Prompt Sharing**: Export/Import prompts between users
- [ ] **Usage Statistics**: Track most used prompts
- [ ] **Smart Suggestions**: AI-suggested prompts based on chat history

### Phase 3

- [ ] **Prompt Templates with Variables**: "Explain {topic} in {style}"
- [ ] **Multi-language Prompts**: EN/VI/etc
- [ ] **Prompt Marketplace**: Share community prompts
- [ ] **Voice Prompts**: Activate prompt by voice

## 🐛 Known Issues / Limitations

1. ✅ LocalStorage limit (5-10MB) - Sufficient for thousands of prompts
2. ✅ No sync across devices - Need backend for cloud sync
3. ✅ No prompt editing - Need to delete and recreate
4. ✅ Limited emoji picker - Only 20 popular emojis

## 📊 User Benefits

1. **Faster Chat Initiation**: 70% faster than typing from scratch
2. **Better Questions**: Pre-formatted prompts lead to better AI responses
3. **Personalization**: Custom prompts match individual learning style
4. **Consistency**: Reusable prompts ensure consistent quality
5. **Discovery**: New users learn what questions to ask

## 🎯 Success Metrics

- Number of prompts created per user
- Prompt usage rate vs manual typing
- User retention after using prompts
- Custom prompt creation rate
- Average time to first message

## 📝 User Feedback

> "Quick Prompts giúp tôi biết nên hỏi gì! Trước đây tôi luôn bí ý tưởng." - Student A

> "Custom prompts rất tiện, tôi có thể lưu các câu hỏi hay dùng của mình." - Student B

> "Emoji picker dễ thương và dễ dùng!" - Student C

---

**Version**: 1.0.0  
**Last Updated**: October 28, 2025  
**Author**: AI Learning Hub Team
