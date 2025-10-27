import React, { useState } from 'react';
import { generateQuiz } from '../../services/geminiService';
// Fix: Import StoredItemCreation for correct typing of the addToLibrary prop.
import type { QuizQuestion, UserAnswer, StoredItem, StoredItemCreation } from '../../types';

type QuizState = 'idle' | 'generating' | 'taking' | 'results';

interface QuizGeneratorProps {
  // Fix: Use StoredItemCreation to resolve the "excess property" error on `sourceText` and other properties.
  addToLibrary: (itemData: StoredItemCreation) => void;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ addToLibrary }) => {
  const [text, setText] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Trung bình');
  
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState<string>('');

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setQuizState('generating');
    setError('');
    const result = await generateQuiz(text, questionCount, difficulty);
    if (typeof result === 'string') {
      setError(result);
      setQuizState('idle');
    } else {
      setQuizData(result);
      setUserAnswers(Array(result.length).fill({ answer: '' }));
      setQuizState('taking');
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = { questionIndex, answer };
    setUserAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quizData.forEach((q, index) => {
      if (userAnswers[index]?.answer === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizState('results');

    // Auto-save to library
    addToLibrary({
      type: 'quiz',
      sourceText: text,
      quizData: quizData,
      userAnswers: userAnswers,
      score: correctAnswers,
    });
  };

  const handleReset = () => {
    setQuizState('idle');
    setQuizData([]);
    setUserAnswers([]);
    setScore(0);
    setError('');
  }

  const renderContent = () => {
    switch (quizState) {
      case 'idle':
      case 'generating':
        return (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Tạo bài trắc nghiệm từ nội dung</h3>
            <textarea
              className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none h-48"
              placeholder="Dán văn bản hoặc tài liệu học tập của bạn vào đây..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Số lượng câu hỏi</label>
                <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Mức độ</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Dễ</option>
                  <option>Trung bình</option>
                  <option>Khó</option>
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={quizState === 'generating' || !text.trim()}
              className="w-full mt-6 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {quizState === 'generating' ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Đang tạo quiz...
                </>
              ) : 'Bắt đầu tạo'}
            </button>
          </div>
        );

      case 'taking':
        return (
          <div className="max-w-3xl mx-auto">
             <h2 className="text-2xl font-bold mb-6 text-center">Bài trắc nghiệm</h2>
             {quizData.map((q, index) => (
                <div key={index} className="mb-8 p-4 border rounded-lg">
                    <p className="font-semibold mb-3">{index + 1}. {q.question}</p>
                    <div className="space-y-2">
                        {q.options.map((option, i) => (
                            <label key={i} className="flex items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                                <input type="radio" name={`question-${index}`} value={option} onChange={() => handleAnswerChange(index, option)} className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                                <span className="ml-3 text-slate-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
             ))}
             <button onClick={handleSubmitQuiz} className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Nộp bài
             </button>
          </div>
        );

      case 'results':
        return (
            <div className="max-w-3xl mx-auto">
                <div className="text-center bg-indigo-50 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold text-indigo-800">Kết quả</h2>
                    <p className="text-4xl font-bold mt-2 text-indigo-600">{score} / {quizData.length}</p>
                    <p className="text-slate-600 mt-1">Bạn đã trả lời đúng {score} câu hỏi! Bài quiz đã được lưu vào thư viện.</p>
                </div>
                 {quizData.map((q, index) => {
                    const userAnswer = userAnswers[index]?.answer;
                    const isCorrect = userAnswer === q.answer;
                    return (
                        <div key={index} className={`mb-6 p-4 border rounded-lg ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                            <p className="font-semibold">{index + 1}. {q.question}</p>
                            <p className={`mt-2 text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                {isCorrect ? '✓' : '✗'} Bạn đã chọn: {userAnswer || 'Chưa trả lời'}
                            </p>
                            {!isCorrect && <p className="mt-1 text-sm text-slate-700">Đáp án đúng: {q.answer}</p>}
                            <p className="mt-2 text-sm text-slate-600 bg-slate-100 p-2 rounded-md">
                                <span className="font-semibold">Giải thích:</span> {q.explanation}
                            </p>
                        </div>
                    );
                 })}
                 <button onClick={handleReset} className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Tạo quiz khác
                </button>
            </div>
        );
    }
  };

  return <div className="h-full w-full">{renderContent()}</div>;
};

export default QuizGenerator;
