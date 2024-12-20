export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}