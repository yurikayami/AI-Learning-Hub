
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
      <div className="flex-1 overflow-y-auto">
        {!previewUrl && !isLoading && !solution && (
           <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
             <h3 className="mt-4 text-lg font-semibold text-slate-700">Tải lên hoặc kéo thả ảnh bài tập</h3>
             <p className="mt-1 text-sm text-slate-500">Hỗ trợ chữ viết tay và chữ in.</p>
             <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" id="file-upload" />
             <label htmlFor="file-upload" className="mt-4 cursor-pointer bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Chọn ảnh
             </label>
           </div>
        )}
        
        {(previewUrl || isLoading || solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Bài tập của bạn</h3>
                    {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-auto object-contain rounded-md shadow-sm" />}
                    {imageFile && (
                        <div className="mt-4">
                            <label htmlFor="file-replace" className="cursor-pointer text-sm text-indigo-600 font-semibold hover:underline">
                                Thay đổi ảnh
                            </label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" id="file-replace" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Lời giải chi tiết</h3>
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                                <p className="mt-4 text-slate-500">AI đang phân tích và giải bài...</p>
                            </div>
                        </div>
                    )}
                    {solution && <div className="text-sm leading-relaxed"><MarkdownRenderer content={solution} /></div>}
                </div>
            </div>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="pt-6 border-t mt-6">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !imageFile}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? 'Đang xử lý...' : 'Giải bài'}
        </button>
      </div>
    </div>
  );
};

export default SolveHomework;
