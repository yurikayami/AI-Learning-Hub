import React from 'react';
import { SparklesIcon, ChatBubbleIcon, DocumentTextIcon, QuestionMarkCircleIcon, CalendarIcon, ChartBarIcon, BookmarkIcon } from '../components/icons/Icons';

interface IntroPageProps {
  onEnterApp: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onEnterApp }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 pt-20 pb-32 px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full mb-8 shadow-lg">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700">Nền tảng học tập AI thế hệ mới</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 leading-tight">
            Học tập thông minh<br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              cùng MentorAI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Giải bài tập, tóm tắt tài liệu, tạo quiz tự động và lập kế hoạch học tập. 
            Tất cả trong một nền tảng duy nhất.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={onEnterApp}
              className="group bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              Bắt đầu miễn phí
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Hero Image/Screenshot Placeholder */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 backdrop-blur-xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 group">
                <img 
                  src="https://i.ibb.co/Q7bbCsLS/homepage.png" 
                  alt="MentorAI Homepage Screenshot" 
                  className="w-full h-auto"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20 -z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Alternating Layout */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Mọi thứ bạn cần để học tập hiệu quả
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Bộ công cụ AI toàn diện giúp bạn tiết kiệm thời gian và nâng cao chất lượng học tập
            </p>
          </div>

          {/* Feature 1 - AI Homework Solver */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                <SparklesIcon className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">AI-Powered</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Giải bài tập trong tích tắc
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Chỉ cần chụp ảnh bài tập, AI sẽ phân tích và đưa ra lời giải chi tiết từng bước. 
                Hỗ trợ đa dạng môn học từ Toán, Lý, Hóa đến các môn khác.
              </p>
              <ul className="space-y-4 mb-8">
                {['Upload ảnh hoặc nhập text', 'Lời giải chi tiết từng bước', 'Giải thích dễ hiểu', 'Hỗ trợ nhiều môn học'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="https://i.ibb.co/9mz3KfMc/homework.png" 
                      alt="AI Homework Solver" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-3xl opacity-20 -z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Feature 2 - AI Chat */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="https://i.ibb.co/Kp90SVcq/chatbot.png" 
                      alt="AI Chat Assistant" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-3xl opacity-20 -z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6">
                <ChatBubbleIcon className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">Interactive</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Trò chuyện với AI như với gia sư
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Đặt câu hỏi bất kỳ về bài học, AI sẽ trả lời chi tiết và dễ hiểu. 
                Sử dụng Quick Prompts hoặc tạo câu hỏi tùy chỉnh của riêng bạn.
              </p>
              <ul className="space-y-4 mb-8">
                {['Hỏi đáp không giới hạn', 'Quick Prompts có sẵn', 'Tùy chỉnh prompt riêng', 'Lưu lịch sử chat'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 - Summarize & Quiz */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6">
                <DocumentTextIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-900">Smart Tools</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Tóm tắt & tạo quiz tự động
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Biến tài liệu dài thành bản tóm tắt ngắn gọn hoặc bài quiz trắc nghiệm. 
                Tùy chỉnh độ dài, mức độ khó và kiểu tóm tắt theo nhu cầu.
              </p>
              <ul className="space-y-4 mb-8">
                {['Tóm tắt tài liệu nhanh chóng', 'Tạo quiz từ tài liệu', 'Tùy chỉnh số câu & độ khó', 'Kiểm tra kiến thức ngay'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="https://i.ibb.co/q34XypTd/quiz.png" 
                      alt="Quiz Generator" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-3xl opacity-20 -z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Feature 4 - Study Planner */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src="https://i.ibb.co/V0V75Dm7/planner.png" 
                      alt="Study Planner" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-3xl opacity-20 -z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-6">
                <CalendarIcon className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-orange-900">Personalized</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Lộ trình học tập cá nhân hóa
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                AI tạo lộ trình học tập phù hợp với mục tiêu của bạn. 
                Theo dõi tiến độ và quản lý kế hoạch học tập một cách khoa học.
              </p>
              <ul className="space-y-4 mb-8">
                {['AI tạo lộ trình tự động', 'Theo dõi tiến độ học tập', 'Lưu vào thư viện', 'Tùy chỉnh mục tiêu'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-32 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Và còn nhiều hơn thế nữa
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Khám phá toàn bộ tính năng được thiết kế để tối ưu hóa trải nghiệm học tập
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookmarkIcon className="w-8 h-8" />,
                title: 'Thư viện học tập',
                description: 'Lưu trữ toàn bộ lịch sử học tập. Dễ dàng tìm kiếm và ôn tập lại bất cứ lúc nào.',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: <ChartBarIcon className="w-8 h-8" />,
                title: 'Thống kê & Phân tích',
                description: 'Theo dõi hoạt động học tập với biểu đồ trực quan. Đánh giá tiến độ học tập.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: <SparklesIcon className="w-8 h-8" />,
                title: 'Miễn phí 100%',
                description: 'Tất cả tính năng đều miễn phí. Không giới hạn số lần sử dụng.',
                color: 'from-pink-500 to-rose-500'
              },
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold text-indigo-900">Cách hoạt động</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Đơn giản. Nhanh chóng. Hiệu quả.
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Chỉ 3 bước để bắt đầu học tập thông minh với AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Chọn công cụ',
                description: 'Lựa chọn tính năng phù hợp với nhu cầu học tập của bạn từ Giải bài tập, Chat AI, Tóm tắt, Quiz hoặc Lộ trình học tập.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                title: 'Nhập dữ liệu',
                description: 'Upload ảnh bài tập, nhập văn bản tài liệu hoặc đặt câu hỏi trực tiếp cho AI trợ lý thông minh.',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                title: 'Nhận kết quả',
                description: 'AI xử lý nhanh chóng và trả về kết quả chi tiết, chính xác. Tự động lưu vào thư viện để ôn tập sau.',
                gradient: 'from-orange-500 to-red-600'
              },
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-2xl">
                  {/* Number Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 pt-2">{step.title}</h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow connector (only show on desktop for first 2 items) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Được yêu thích bởi học sinh
            </h2>
            <p className="text-xl text-slate-600">
              Hàng nghìn học sinh đã cải thiện kết quả học tập với MentorAI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed italic">
                  "App này thực sự giúp tôi rất nhiều trong việc học tập. AI giải bài nhanh và chính xác!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400"></div>
                  <div>
                    <p className="font-semibold text-slate-900">Học sinh {i}</p>
                    <p className="text-sm text-slate-500">Lớp 12</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Sẵn sàng học tập thông minh hơn?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Tham gia cùng hàng nghìn học sinh đã cải thiện kết quả học tập với MentorAI. 
            Hoàn toàn miễn phí, không giới hạn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={onEnterApp}
              className="group bg-white text-slate-900 font-semibold px-10 py-5 rounded-xl hover:bg-slate-100 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 text-lg"
            >
              Bắt đầu ngay - Miễn phí
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Miễn phí 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Không cần thẻ tín dụng</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Không giới hạn</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-8 h-8 text-indigo-400" />
                <span className="text-2xl font-bold text-white">MentorAI</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Nền tảng học tập AI toàn diện giúp học sinh học tập thông minh và hiệu quả hơn.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram'].map(social => (
                  <button key={social} className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-slate-600 rounded"></div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Sản phẩm</h4>
              <ul className="space-y-3">
                {['Tính năng', 'Giá cả', 'Hướng dẫn', 'API'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Hỗ trợ</h4>
              <ul className="space-y-3">
                {['Liên hệ', 'FAQ', 'Điều khoản', 'Bảo mật'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 MentorAI. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;
