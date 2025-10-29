
import React, { useState, useCallback } from 'react';
import { solveWithImage } from '../../services/geminiService';
import MarkdownRenderer from '../MarkdownRenderer';

const SolveHomework: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSolution('');
      setError('');
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!imageFile) {
      setError('Vui lòng chọn một hình ảnh để giải.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSolution('');
    const prompt = "Bạn là một gia sư chuyên gia. Hãy giải bài tập trong hình ảnh sau đây từng bước một. Giải thích rõ ràng từng bước bằng tiếng Việt. Nếu có nhiều cách giải, hãy đề cập. Định dạng câu trả lời bằng markdown.";
    const result = await solveWithImage(imageFile, prompt);
    setSolution(result);
    setIsLoading(false);
  }, [imageFile]);

  return (
    <div className="h-full flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {!previewUrl && !isLoading && !solution ? (
          /* Upload State */
          <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-8 hover:border-slate-400 hover:bg-slate-100 transition-all">
            <div className="bg-slate-900 p-3 rounded-full mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1.5">Tải lên ảnh bài tập</h3>
            <p className="text-sm text-slate-500 mb-4 text-center max-w-md">
              Hỗ trợ chữ viết tay, chữ in, và các ký hiệu toán học
            </p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" id="file-upload" />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer bg-slate-900 text-white font-medium py-3 px-5 rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Chọn ảnh từ máy
            </label>
          </div>
        ) : (
          /* Content State */
          <div className="space-y-3">
            {/* Homework Image Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-sm font-medium text-white">Bài tập của bạn</h3>
                </div>
                {imageFile && (
                  <div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" id="file-replace" />
                    <label 
                      htmlFor="file-replace" 
                      className="cursor-pointer text-white hover:text-slate-200 font-medium text-xs flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-all backdrop-blur-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Đổi ảnh
                    </label>
                  </div>
                )}
              </div>
              <div className="p-3 bg-slate-50">
                {previewUrl && (
                  <>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-auto object-contain rounded-lg shadow-md max-h-[400px] mx-auto bg-white" 
                    />
                    {/* Action Button - Below Image */}
                    <div className="mt-3 flex justify-center">
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-slate-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-slate-800 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Đang xử lý...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Giải bài ngay
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Solution Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm font-medium text-white">Lời giải chi tiết</h3>
              </div>
              <div className="p-4 bg-slate-50 min-h-[200px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-3 border-slate-200"></div>
                      <div className="animate-spin rounded-full h-12 w-12 border-3 border-slate-900 border-t-transparent absolute top-0 left-0"></div>
                    </div>
                    <p className="mt-4 text-slate-700 font-medium text-sm">AI đang phân tích và giải bài...</p>
                    <p className="mt-1 text-slate-500 text-xs">Đang xử lý hình ảnh và tạo lời giải</p>
                  </div>
                ) : solution ? (
                  <div className="prose prose-sm max-w-none">
                    <MarkdownRenderer content={solution} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-sm">Nhấn nút "Giải bài" để bắt đầu</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolveHomework;
