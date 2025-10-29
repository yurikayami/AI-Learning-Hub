import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { ChatMessage, QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const solveWithImage = async (imageFile: File, prompt: string): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    const response: GenerateContentResponse = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: prompt }] },
    });
    return response.text;
  } catch (error) {
    console.error("Error solving with image:", error);
    return "Đã xảy ra lỗi khi cố gắng giải bài tập. Vui lòng thử lại.";
  }
};

export const getChatResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({ 
      model: 'gemini-2.5-flash',
      history,
      config: {
        systemInstruction: "Bạn là một gia sư AI thân thiện, kiên nhẫn tên là 'Mentor'. Hãy trả lời các câu hỏi của học sinh bằng tiếng Việt. Sử dụng ngôn ngữ đơn giản, dễ hiểu. Khuyến khích học sinh tư duy bằng cách đặt câu hỏi ngược lại nếu cần thiết."
      }
    });
    const response = await chat.sendMessage({ message: newMessage });
    return response.text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.";
  }
};

export const generateSummary = async (
  text: string, 
  length: string, 
  summaryType: string = 'Tổng quan',
  language: string = 'Dễ hiểu',
  includeExamples: boolean = false,
  includeQuestions: boolean = false,
  includeKeyTerms: boolean = false
): Promise<string> => {
    // Xây dựng system instruction dựa trên kiểu tóm tắt
    let typeInstruction = '';
    switch (summaryType) {
      case 'Học thuật':
        typeInstruction = 'Tạo bản tóm tắt mang tính học thuật, tập trung vào lý thuyết, khái niệm và mối liên hệ giữa các ý chính. Sử dụng thuật ngữ chính xác.';
        break;
      case 'Ghi nhớ nhanh':
        typeInstruction = 'Tạo bản tóm tắt tối ưu cho việc ghi nhớ, sử dụng kỹ thuật mnemonic, từ khóa nổi bật, và cấu trúc dễ nhớ. Ưu tiên những điểm cốt lõi nhất.';
        break;
      case 'Ôn tập thi':
        typeInstruction = 'Tạo bản tóm tắt phục vụ ôn thi, tập trung vào các kiến thức trọng tâm, công thức, định nghĩa quan trọng và những điểm thường xuất hiện trong đề thi.';
        break;
      case 'Phân tích sâu':
        typeInstruction = 'Tạo bản phân tích sâu, không chỉ tóm tắt mà còn giải thích nguyên nhân, hệ quả, ý nghĩa và mối liên hệ giữa các khái niệm.';
        break;
      default:
        typeInstruction = 'Tạo bản tóm tắt tổng quan, cân bằng giữa độ chi tiết và tính súc tích.';
    }

    // Xây dựng instruction cho ngôn ngữ
    let languageInstruction = '';
    switch (language) {
      case 'Chuyên môn':
        languageInstruction = 'Sử dụng ngôn ngữ chuyên môn, thuật ngữ kỹ thuật chính xác.';
        break;
      case 'Học thuật':
        languageInstruction = 'Sử dụng ngôn ngữ học thuật, trang trọng, có trích dẫn và dẫn chứng.';
        break;
      default:
        languageInstruction = 'Sử dụng ngôn ngữ đơn giản, dễ hiểu, phù hợp với học sinh.';
    }

    // Xây dựng các yêu cầu bổ sung
    const additionalRequirements: string[] = [];
    
    if (includeKeyTerms) {
      additionalRequirements.push('- Liệt kê và giải thích các THUẬT NGỮ QUAN TRỌNG trong một mục riêng biệt');
    }
    
    if (includeExamples) {
      additionalRequirements.push('- Thêm VÍ DỤ MINH HỌA cụ thể để làm rõ các khái niệm chính');
    }
    
    if (includeQuestions) {
      additionalRequirements.push('- Kèm theo 3-5 CÂU HỎI KIỂM TRA để củng cố kiến thức đã tóm tắt');
    }

    const prompt = `Bạn là một chuyên gia tóm tắt nội dung học thuật. Nhiệm vụ của bạn là tạo bản tóm tắt chất lượng cao.

**YÊU CẦU CHI TIẾT:**
- Kiểu tóm tắt: ${summaryType}
  ${typeInstruction}
  
- Độ dài: ${length}
  ${length === 'Ngắn' ? '(Khoảng 100-200 từ, chỉ những điểm cốt lõi nhất)' : 
    length === 'Vừa' ? '(Khoảng 200-400 từ, cân bằng giữa chi tiết và súc tích)' : 
    '(Khoảng 400-600 từ, phân tích đầy đủ và chi tiết)'}
  
- Phong cách ngôn ngữ: ${language}
  ${languageInstruction}

${additionalRequirements.length > 0 ? '\n**YÊU CẦU BỔ SUNG:**\n' + additionalRequirements.join('\n') : ''}

**QUAN TRỌNG:** KHÔNG sử dụng emoji hoặc biểu tượng cảm xúc trong nội dung tóm tắt. Chỉ sử dụng các ký tự văn bản thông thường, số, và các ký hiệu đặc biệt như dấu gạch đầu dòng, mũi tên (→), dấu sao (*), v.v.

**VĂN BẢN CẦN TÓM TẮT:**
---
${text}
---

Hãy tạo bản tóm tắt theo đúng các yêu cầu trên. Đảm bảo nội dung chính xác, logic, và hữu ích cho việc học tập.`;

    try {
        const response: GenerateContentResponse = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating summary:", error);
        return "Không thể tạo tóm tắt. Vui lòng kiểm tra lại nội dung và thử lại.";
    }
};


const quizSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: {
          type: Type.STRING,
          description: 'Câu hỏi trắc nghiệm được tạo ra từ nội dung.',
        },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Một mảng gồm 4 lựa chọn, trong đó có một đáp án đúng và ba đáp án sai.',
        },
        answer: {
          type: Type.STRING,
          description: 'Đáp án chính xác cho câu hỏi.',
        },
        explanation: {
          type: Type.STRING,
          description: 'Giải thích ngắn gọn tại sao đáp án đó là đúng.',
        },
      },
      required: ['question', 'options', 'answer', 'explanation'],
    },
};

export const generateQuiz = async (text: string, count: number, difficulty: string): Promise<QuizQuestion[] | string> => {
    const prompt = `Phân tích kỹ nội dung sau và tạo một bài trắc nghiệm.
    - Số lượng câu hỏi: ${count}
    - Mức độ: ${difficulty}
    
    Hãy đảm bảo các câu hỏi bao quát được nội dung chính, các đáp án sai có tính thuyết phục và giải thích rõ ràng.
    
    Nội dung:
    ---
    ${text}
    ---
    `;
    try {
        const response: GenerateContentResponse = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            }
        });
        
        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);
        
        if (Array.isArray(quizData)) {
            return quizData as QuizQuestion[];
        }
        return "Định dạng dữ liệu trả về không hợp lệ.";

    } catch (error) {
        console.error("Error generating quiz:", error);
        return "Không thể tạo bài trắc nghiệm từ nội dung này. Vui lòng thử lại với một văn bản khác.";
    }
};

const studyPlanSchema = {
    type: Type.OBJECT,
    properties: {
        plan: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: "Một danh sách các đầu việc cụ thể cho lộ trình học tập."
        }
    },
    required: ['plan']
};

export const generateStudyPlan = async (topic: string, goal: string): Promise<string[] | string> => {
    const prompt = `Bạn là một gia sư chuyên nghiệp và người lập kế hoạch học tập. Dựa vào chủ đề và mục tiêu sau đây, hãy tạo ra một lộ trình học tập chi tiết, chia nhỏ thành các đầu việc cụ thể.

    Chủ đề: "${topic}"
    Mục tiêu: "${goal}"

    Hãy đảm bảo lộ trình logic, dễ theo dõi và bao quát các kiến thức cần thiết để đạt được mục tiêu. Mỗi đầu việc phải là một hành động cụ thể.`;

    try {
        const response: GenerateContentResponse = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: studyPlanSchema,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result.plan && Array.isArray(result.plan)) {
            return result.plan as string[];
        }
        return "AI đã trả về định dạng không hợp lệ.";

    } catch (error) {
        console.error("Error generating study plan:", error);
        return "Không thể tạo lộ trình học tập. Vui lòng thử lại.";
    }
};