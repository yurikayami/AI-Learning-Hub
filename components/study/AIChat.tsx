import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../../services/geminiService';
// Fix: Import StoredItemCreation for correct typing of the addToLibrary prop.
import type { ChatMessage, StoredItem, StoredItemCreation } from '../../types';
import MarkdownRenderer from '../MarkdownRenderer';

interface AIChatProps {
  // Fix: Use StoredItemCreation to resolve the "excess property" error on `messages`.
  addToLibrary: (itemData: StoredItemCreation) => void;
}

interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: string;
  category: 'default' | 'custom';
}

const defaultPrompts: QuickPrompt[] = [
  { id: '1', label: 'Giải thích chi tiết', prompt: 'Hãy giải thích chi tiết về ', icon: '📚', category: 'default' },
  { id: '2', label: 'Cho ví dụ thực tế', prompt: 'Cho tôi ví dụ thực tế về ', icon: '💡', category: 'default' },
  { id: '3', label: 'Tạo bài tập', prompt: 'Tạo 3 bài tập thực hành về ', icon: '✍️', category: 'default' },
  { id: '4', label: 'So sánh khái niệm', prompt: 'So sánh và phân tích sự khác biệt giữa ', icon: '⚖️', category: 'default' },
  { id: '5', label: 'Tóm tắt nội dung', prompt: 'Tóm tắt các điểm chính về ', icon: '📝', category: 'default' },
  { id: '6', label: 'Giải thích như cho trẻ 5 tuổi', prompt: 'Giải thích cho tôi hiểu như tôi mới 5 tuổi về ', icon: '👶', category: 'default' },
];

const popularEmojis = ['⭐', '💡', '📚', '✍️', '🎯', '🚀', '💪', '🧠', '📖', '🎓', '✨', '🔥', '💯', '👍', '❤️', '🎨', '🔍', '📊', '🌟', '⚡'];

const EmojiPicker: React.FC<{ selected: string; onSelect: (emoji: string) => void; onClose: () => void }> = ({ selected, onSelect, onClose }) => {
  return (
    <div className="absolute bottom-full left-0 mb-2 p-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10 w-64">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-slate-700">Chọn icon</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm">&times;</button>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {popularEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className={`text-xl p-1 rounded hover:bg-slate-100 ${selected === emoji ? 'bg-indigo-100' : ''}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

const AIChat: React.FC<AIChatProps> = ({ addToLibrary }) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [customPrompts, setCustomPrompts] = useState<QuickPrompt[]>([]);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [newPromptLabel, setNewPromptLabel] = useState('');
  const [newPromptText, setNewPromptText] = useState('');
  const [newPromptIcon, setNewPromptIcon] = useState('⭐');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load custom prompts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('customPrompts');
    if (saved) {
      try {
        setCustomPrompts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom prompts');
      }
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');
    setIsLoading(true);
    setShowQuickPrompts(false); // Hide prompts after first message

    const responseText = await getChatResponse(history, input);

    const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
    setHistory([...newHistory, modelMessage]);
    setIsLoading(false);
  };

  const handleQuickPromptClick = (prompt: QuickPrompt) => {
    setInput(prompt.prompt);
    setShowQuickPrompts(false);
  };

  const handleAddCustomPrompt = () => {
    if (!newPromptLabel.trim() || !newPromptText.trim()) return;
    
    const newPrompt: QuickPrompt = {
      id: Date.now().toString(),
      label: newPromptLabel,
      prompt: newPromptText,
      icon: newPromptIcon,
      category: 'custom'
    };
    
    const updatedPrompts = [...customPrompts, newPrompt];
    setCustomPrompts(updatedPrompts);
    localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
    
    // Reset form
    setNewPromptLabel('');
    setNewPromptText('');
    setNewPromptIcon('⭐');
    setShowAddPrompt(false);
    setShowEmojiPicker(false);
  };

  const handleDeleteCustomPrompt = (id: string) => {
    const updatedPrompts = customPrompts.filter(p => p.id !== id);
    setCustomPrompts(updatedPrompts);
    localStorage.setItem('customPrompts', JSON.stringify(updatedPrompts));
  };

  const allPrompts = [...defaultPrompts, ...customPrompts];

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
  
  const handleSave = () => {
    if (history.length > 0) {
      addToLibrary({ type: 'chat', messages: history });
      setShowSaveConfirmation(true);
      setTimeout(() => setShowSaveConfirmation(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 md:pr-4 -mr-2 md:-mr-4 space-y-3 md:space-y-4">
        {history.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl">👋</span>
                </div>
                <div className="text-lg md:text-xl font-semibold mt-3 md:mt-4 text-slate-800">
                  <MarkdownRenderer content="Chào bạn, tôi là **Mentor**!" />
                </div>
                <div className="text-sm md:text-base">
                  <MarkdownRenderer content="Bạn có câu hỏi nào về bài học hôm nay không?" />
                </div>
                
                {/* Quick Prompts Section */}
                {showQuickPrompts && (
                  <div className="mt-6 md:mt-8 w-full max-w-2xl">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-sm md:text-base font-semibold text-slate-700">💡 Gợi ý câu hỏi nhanh</h3>
                      <button
                        onClick={() => setShowAddPrompt(!showAddPrompt)}
                        className="text-xs md:text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                      >
                        <span className="text-lg">+</span> Tạo mới
                      </button>
                    </div>

                    {/* Add Custom Prompt Form */}
                    {showAddPrompt && (
                      <div className="mb-4 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h4 className="text-xs md:text-sm font-semibold text-slate-700 mb-2">Tạo prompt tùy chỉnh</h4>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="w-12 md:w-14 h-10 md:h-11 p-2 text-center border border-slate-300 rounded-lg hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 text-xl bg-white"
                              >
                                {newPromptIcon}
                              </button>
                              {showEmojiPicker && (
                                <EmojiPicker
                                  selected={newPromptIcon}
                                  onSelect={setNewPromptIcon}
                                  onClose={() => setShowEmojiPicker(false)}
                                />
                              )}
                            </div>
                            <input
                              type="text"
                              value={newPromptLabel}
                              onChange={(e) => setNewPromptLabel(e.target.value)}
                              placeholder="Tên prompt (VD: Giải thích ngắn gọn)"
                              className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm"
                            />
                          </div>
                          <textarea
                            value={newPromptText}
                            onChange={(e) => setNewPromptText(e.target.value)}
                            placeholder="Nội dung prompt (VD: Giải thích ngắn gọn và súc tích về...)"
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none text-xs md:text-sm"
                            rows={2}
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setShowAddPrompt(false)}
                              className="px-3 py-1.5 text-xs md:text-sm text-slate-600 hover:text-slate-800 font-medium"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleAddCustomPrompt}
                              disabled={!newPromptLabel.trim() || !newPromptText.trim()}
                              className="px-3 py-1.5 text-xs md:text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-300 font-medium"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Prompts Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                      {allPrompts.map((prompt) => (
                        <div key={prompt.id} className="relative group">
                          <button
                            onClick={() => handleQuickPromptClick(prompt)}
                            className="w-full p-2 md:p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg md:text-xl">{prompt.icon}</span>
                              <span className="text-xs md:text-sm font-medium text-slate-700 line-clamp-2">{prompt.label}</span>
                            </div>
                          </button>
                          {prompt.category === 'custom' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCustomPrompt(prompt.id);
                              }}
                              className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600"
                              title="Xóa prompt"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-400 mt-3 text-center">
                      Click vào một gợi ý để bắt đầu cuộc trò chuyện
                    </p>
                  </div>
                )}
            </div>
        )}
        {history.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-xl p-3 md:p-4 rounded-2xl text-sm md:text-base ${msg.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
              <MarkdownRenderer content={msg.parts[0].text} />
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="max-w-[85%] md:max-w-lg p-3 md:p-4 rounded-2xl bg-slate-100 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="pt-4 md:pt-6 border-t mt-4 md:mt-6">
        {/* Quick Prompts Toggle Button */}
        {history.length > 0 && (
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={() => setShowQuickPrompts(!showQuickPrompts)}
              className="text-xs md:text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              <span>{showQuickPrompts ? '🔽' : '💡'}</span>
              {showQuickPrompts ? 'Ẩn gợi ý' : 'Hiện gợi ý câu hỏi'}
            </button>
            {showQuickPrompts && (
              <button
                onClick={() => setShowAddPrompt(!showAddPrompt)}
                className="text-xs md:text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <span className="text-base">+</span> Tạo prompt
              </button>
            )}
          </div>
        )}

        {/* Quick Prompts in Chat Area */}
        {history.length > 0 && showQuickPrompts && (
          <div className="mb-4 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
            {showAddPrompt && (
              <div className="mb-3 p-3 bg-white rounded-lg border border-slate-200">
                <h4 className="text-xs md:text-sm font-semibold text-slate-700 mb-2">Tạo prompt tùy chỉnh</h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="w-10 md:w-12 h-9 md:h-10 text-center border border-slate-300 rounded-lg hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 text-base md:text-lg bg-white"
                      >
                        {newPromptIcon}
                      </button>
                      {showEmojiPicker && (
                        <EmojiPicker
                          selected={newPromptIcon}
                          onSelect={setNewPromptIcon}
                          onClose={() => setShowEmojiPicker(false)}
                        />
                      )}
                    </div>
                    <input
                      type="text"
                      value={newPromptLabel}
                      onChange={(e) => setNewPromptLabel(e.target.value)}
                      placeholder="Tên prompt"
                      className="flex-1 p-1.5 md:p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm"
                    />
                  </div>
                  <textarea
                    value={newPromptText}
                    onChange={(e) => setNewPromptText(e.target.value)}
                    placeholder="Nội dung prompt..."
                    className="w-full p-1.5 md:p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none text-xs md:text-sm"
                    rows={2}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowAddPrompt(false)}
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleAddCustomPrompt}
                      disabled={!newPromptLabel.trim() || !newPromptText.trim()}
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-300 font-medium"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {allPrompts.map((prompt) => (
                <div key={prompt.id} className="relative group">
                  <button
                    onClick={() => handleQuickPromptClick(prompt)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all text-left"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm md:text-base">{prompt.icon}</span>
                      <span className="text-xs font-medium text-slate-700 line-clamp-1">{prompt.label}</span>
                    </div>
                  </button>
                  {prompt.category === 'custom' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCustomPrompt(prompt.id);
                      }}
                      className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600"
                      title="Xóa"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn ở đây..."
            className="flex-1 p-2 md:p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none text-sm md:text-base"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 md:p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:from-indigo-300 disabled:to-purple-300 disabled:cursor-not-allowed shadow-md"
            aria-label="Gửi"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="h-4 md:h-5 mt-2">
            {history.length > 0 && !showSaveConfirmation &&
                <button onClick={handleSave} className="text-xs text-indigo-600 hover:underline font-semibold">
                    Lưu cuộc hội thoại này
                </button>
            }
            {showSaveConfirmation &&
                <p className="text-xs text-green-600 font-semibold">
                    Đã lưu vào thư viện!
                </p>
            }
        </div>
      </div>
    </div>
  );
};

export default AIChat;
