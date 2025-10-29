import React, { useState } from 'react';
import { generateSummary } from '../../services/geminiService';
import MarkdownRenderer from '../MarkdownRenderer';
// Fix: Import StoredItemCreation for correct typing of the addToLibrary prop.
import type { StoredItem, StoredItemCreation } from '../../types';

interface SummarizeProps {
  // Fix: Use StoredItemCreation to resolve the "excess property" error on `sourceText`.
  addToLibrary: (itemData: StoredItemCreation) => void;
}

const Summarize: React.FC<SummarizeProps> = ({ addToLibrary }) => {
  const [text, setText] = useState('');
  const [length, setLength] = useState('Vừa');
  const [summaryType, setSummaryType] = useState('Tổng quan');
  const [language, setLanguage] = useState('Dễ hiểu');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setSummary('');
    const result = await generateSummary(
      text, 
      length, 
      summaryType,
      language,
      false,
      false,
      false
    );
    setSummary(result);
    setIsLoading(false);
    
    // Auto-save to library
    if (result && !result.startsWith("Không thể")) {
      addToLibrary({
        type: 'summary',
        sourceText: text,
        summaryText: result,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
      <div className="flex flex-col">
        <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Nội dung cần tóm tắt</h3>
        <textarea
          className="w-full flex-1 p-2 md:p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none text-sm md:text-base"
          placeholder="Dán văn bản của bạn vào đây..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        {/* Tùy chọn nâng cao */}
        <div className="mt-3 md:mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700">Độ dài</label>
              <select value={length} onChange={(e) => setLength(e.target.value)} className="mt-1 block w-full pl-2 md:pl-3 pr-8 md:pr-10 py-1.5 md:py-2 text-sm md:text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                <option>Ngắn</option>
                <option>Vừa</option>
                <option>Chi tiết</option>
              </select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700">Kiểu tóm tắt</label>
              <select value={summaryType} onChange={(e) => setSummaryType(e.target.value)} className="mt-1 block w-full pl-2 md:pl-3 pr-8 md:pr-10 py-1.5 md:py-2 text-sm md:text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                <option>Tổng quan</option>
                <option>Học thuật</option>
                <option>Ghi nhớ nhanh</option>
                <option>Ôn tập thi</option>
                <option>Phân tích sâu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700">Ngôn ngữ</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 block w-full pl-2 md:pl-3 pr-8 md:pr-10 py-1.5 md:py-2 text-sm md:text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                <option>Dễ hiểu</option>
                <option>Chuyên môn</option>
                <option>Học thuật</option>
              </select>
            </div>
            <div></div>
          </div>
        </div>

        <button
          onClick={handleSummarize}
          disabled={isLoading || !text.trim()}
          className="w-full mt-3 md:mt-4 bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm text-sm md:text-base"
        >
          {isLoading ? 'Đang tóm tắt...' : 'Tóm tắt ngay'}
        </button>
      </div>
      
      <div className="flex flex-col bg-slate-50 p-3 md:p-4 rounded-lg border border-slate-200">
        <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Kết quả</h3>
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
            {isLoading && (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-indigo-600"></div>
                        <p className="mt-3 md:mt-4 text-slate-500 text-xs md:text-sm">AI đang phân tích nội dung...</p>
                    </div>
                </div>
            )}
            {summary ? <div className="text-xs md:text-sm pr-1 md:pr-2"><MarkdownRenderer content={summary} /></div> : !isLoading && <p className="text-slate-400 text-center mt-6 md:mt-10 text-xs md:text-sm">Bản tóm tắt sẽ xuất hiện ở đây.</p>}
        </div>
      </div>
    </div>
  );
};

export default Summarize;
