import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/chat';
import { formatBotMessage, formatTextWithBold } from '../utils/messageFormatter';
interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const renderParagraph = (text: string, index: number) => {
    const parts = formatTextWithBold(text);
    
    return (
      <p key={index} className="text-gray-800 leading-relaxed mb-2">
        {parts.map((part, i) => (
          part.type === 'bold' 
            ? <strong key={i} className="font-bold">{part.content}</strong>
            : <span key={i}>{part.content}</span>
        ))}
      </p>
    );
  };

  const renderContent = () => {
    if (!message.isBot) {
      return <p className="text-gray-800 leading-relaxed">{message.content}</p>;
    }

    const paragraphs = formatBotMessage(message.content);
    
    return paragraphs.map((paragraph, index) => renderParagraph(paragraph, index));
  };

  return (
    <div className={`flex gap-4 p-4 ${message.isBot ? 'bg-purple-50' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        message.isBot ? 'bg-purple-600' : 'bg-violet-400'
      }`}>
        {message.isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        {renderContent()}
        <span className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}