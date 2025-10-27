import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../../services/geminiService';
// Fix: Import StoredItemCreation for correct typing of the addToLibrary prop.
import type { ChatMessage, StoredItem, StoredItemCreation } from '../../types';
import MarkdownRenderer from '../MarkdownRenderer';

interface AIChatProps {
  // Fix: Use StoredItemCreation to resolve the "excess property" error on `messages`.
  addToLibrary: (itemData: StoredItemCreation) => void;
}

const AIChat: React.FC<AIChatProps> = ({ addToLibrary }) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

    const responseText = await getChatResponse(history, input);

    const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
    setHistory([...newHistory, modelMessage]);
    setIsLoading(false);
  };

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
      <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-4">
        {history.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">👋</span>
                </div>
                <h2 className="text-xl font-semibold mt-4 text-slate-800">Chào bạn, tôi là Mentor!</h2>
                <p>Bạn có câu hỏi nào về bài học hôm nay không?</p>
            </div>
        )}
        {history.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
              <MarkdownRenderer content={msg.parts[0].text} />
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="max-w-lg p-4 rounded-2xl bg-slate-100 rounded-bl-none">
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

      <div className="pt-6 border-t mt-6">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn ở đây..."
            className="flex-1 p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
            aria-label="Gửi"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="h-5 mt-2">
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
