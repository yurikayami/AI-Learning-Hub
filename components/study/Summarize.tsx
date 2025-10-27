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
  const [format, setFormat] = useState('Gạch đầu dòng');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setSummary('');
    const result = await generateSummary(text, length, format);
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-3">Nội dung cần tóm tắt</h3>
        <textarea
          className="w-full flex-1 p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
          placeholder="Dán văn bản của bạn vào đây..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Độ dài</label>
                <select value={length} onChange={(e) => setLength(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Ngắn</option>
                    <option>Vừa</option>
                    <option>Chi tiết</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Định dạng</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Gạch đầu dòng</option>
                    <option>Đoạn văn</option>
                </select>
            </div>
        </div>
        <button
          onClick={handleSummarize}
          disabled={isLoading || !text.trim()}
          className="w-full mt-4 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang tóm tắt...' : 'Tóm tắt ngay'}
        </button>
      </div>
      
      <div className="flex flex-col bg-slate-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3">Kết quả</h3>
        <div className="flex-1 overflow-y-auto pr-2">
            {isLoading && (
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-slate-500">AI đang phân tích nội dung...</p>
                    </div>
                </div>
            )}
            {summary ? <MarkdownRenderer content={summary} /> : !isLoading && <p className="text-slate-400 text-center mt-10">Bản tóm tắt sẽ xuất hiện ở đây.</p>}
        </div>
      </div>
    </div>
  );
};

export default Summarize;
