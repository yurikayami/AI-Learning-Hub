import React, { useState, useMemo } from 'react';
import type { StoredItem, LibraryItemType, ChatMessage, StoredQuiz } from '../types';
import { ChatBubbleIcon, DocumentTextIcon, QuestionMarkCircleIcon } from '../components/icons/Icons';
import MarkdownRenderer from '../components/MarkdownRenderer';


const LibraryItemCard: React.FC<{ item: StoredItem, onSelect: () => void }> = ({ item, onSelect }) => {
    const icons = {
        chat: <ChatBubbleIcon className="w-6 h-6" />,
        summary: <DocumentTextIcon className="w-6 h-6" />,
        quiz: <QuestionMarkCircleIcon className="w-6 h-6" />,
    };

    const colors = {
        chat: 'bg-purple-100 text-purple-600',
        summary: 'bg-green-100 text-green-600',
        quiz: 'bg-orange-100 text-orange-600',
    };

    const getTitle = () => {
        switch (item.type) {
            case 'chat':
                return `Cuộc hội thoại lúc ${item.timestamp.toLocaleTimeString()}`;
            case 'summary':
                return `Tóm tắt: "${item.sourceText.substring(0, 50)}..."`;
            case 'quiz':
                return `Quiz: ${item.quizData.length} câu hỏi`;
        }
    }

    return (
        <div onClick={onSelect} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[item.type]}`}>
                {icons[item.type]}
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-sm">{getTitle()}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.timestamp.toLocaleString()}</p>
            </div>
        </div>
    );
};

const ChatDetail: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => (
    <div className="space-y-4">
        {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                    <MarkdownRenderer content={msg.parts[0].text} />
                </div>
            </div>
        ))}
    </div>
);

const SummaryDetail: React.FC<{ sourceText: string, summaryText: string }> = ({ sourceText, summaryText }) => (
    <div className="space-y-6">
        <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Bản tóm tắt</h4>
            <div className="p-4 bg-slate-100 rounded-lg"><MarkdownRenderer content={summaryText} /></div>
        </div>
        <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Nội dung gốc</h4>
            <p className="text-sm text-slate-600 max-h-48 overflow-y-auto p-4 bg-slate-100 rounded-lg">{sourceText}</p>
        </div>
    </div>
);


const QuizDetail: React.FC<{ item: StoredQuiz }> = ({ item }) => (
    <div>
        <div className="text-center bg-indigo-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-indigo-800">Kết quả Quiz</h2>
            <p className="text-4xl font-bold mt-2 text-indigo-600">{item.score} / {item.quizData.length}</p>
        </div>
        {item.quizData.map((q, index) => {
            const userAnswer = item.userAnswers[index]?.answer;
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
    </div>
);


const LibraryPage: React.FC<{ items: StoredItem[] }> = ({ items }) => {
    const [filter, setFilter] = useState<'all' | LibraryItemType>('all');
    const [selectedItem, setSelectedItem] = useState<StoredItem | null>(null);

    const filteredItems = useMemo(() =>
        items.filter(item => filter === 'all' || item.type === filter),
        [items, filter]
    );

    const renderDetailContent = () => {
        if (!selectedItem) return null;
        switch (selectedItem.type) {
            case 'chat':
                return <ChatDetail messages={selectedItem.messages} />;
            case 'summary':
                return <SummaryDetail sourceText={selectedItem.sourceText} summaryText={selectedItem.summaryText} />;
            case 'quiz':
                return <QuizDetail item={selectedItem} />;
            default:
                return null;
        }
    };

    const filters: { id: 'all' | LibraryItemType, label: string }[] = [
        { id: 'all', label: 'Tất cả' },
        { id: 'chat', label: 'Lịch sử Chat' },
        { id: 'summary', label: 'Tóm tắt' },
        { id: 'quiz', label: 'Quiz' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Thư viện của bạn</h1>
                <p className="text-slate-500 mt-1">Nơi lưu trữ tất cả kiến thức bạn đã tạo ra.</p>
            </div>
            
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6" aria-label="Filters">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`${filter === f.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {f.label}
                        </button>
                    ))}
                </nav>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <LibraryItemCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-700">Thư viện còn trống</h3>
                    <p className="text-slate-500 mt-2">Hãy bắt đầu sử dụng các công cụ trong Phòng học AI để lưu lại kiến thức nhé!</p>
                </div>
            )}

            {/* Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                         <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-bold">Chi tiết</h2>
                            <button onClick={() => setSelectedItem(null)} className="text-slate-500 hover:text-slate-800">&times;</button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                           {renderDetailContent()}
                        </div>
                         <div className="p-4 border-t text-right">
                             <button onClick={() => setSelectedItem(null)} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Đóng</button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LibraryPage;
