export type Page = 'dashboard' | 'study' | 'planner' | 'library' | 'analytics' | 'intro';
export type StudyTab = 'solve' | 'chat' | 'summary' | 'quiz';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface UserAnswer {
  questionIndex: number;
  answer: string;
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface StudyModule {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  color: string;
  category: string;
  createdDate: Date;
}

// New Library Types
export type LibraryItemType = 'chat' | 'summary' | 'quiz' | 'module';

interface StoredItemBase {
  id: number;
  type: LibraryItemType;
  timestamp: Date;
}

export interface StoredChat extends StoredItemBase {
  type: 'chat';
  messages: ChatMessage[];
}

export interface StoredSummary extends StoredItemBase {
  type: 'summary';
  sourceText: string;
  summaryText: string;
}

export interface StoredQuiz extends StoredItemBase {
  type: 'quiz';
  sourceText: string;
  quizData: QuizQuestion[];
  userAnswers: UserAnswer[];
  score: number;
}

export interface StoredModule extends StoredItemBase {
  type: 'module';
  title: string;
  description: string;
  category: string;
  color: string;
}

export type StoredItem = StoredChat | StoredSummary | StoredQuiz | StoredModule;

// Fix: Add StoredItemCreation type to fix issues with Omit on a union type.
// This explicit union type helps TypeScript correctly infer types at call sites
// and avoids "excess property" errors and loss of type information when spreading.
export type StoredItemCreation =
  | { type: 'chat'; messages: ChatMessage[] }
  | { type: 'summary'; sourceText: string; summaryText: string }
  | {
      type: 'quiz';
      sourceText: string;
      quizData: QuizQuestion[];
      userAnswers: UserAnswer[];
      score: number;
    }
  | {
      type: 'module';
      title: string;
      description: string;
      category: string;
      color: string;
    };
