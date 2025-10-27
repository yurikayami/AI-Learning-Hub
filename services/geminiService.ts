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

export const generateSummary = async (text: string, length: string, format: string): Promise<string> => {
    const prompt = `Bạn là một chuyên gia tóm tắt nội dung. Hãy tóm tắt văn bản sau đây.
    - Độ dài: ${length}
    - Định dạng: ${format}
    
    Văn bản cần tóm tắt:
    ---
    ${text}
    ---
    `;
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