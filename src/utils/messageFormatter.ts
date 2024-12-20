interface FormattedPart {
  type: 'text' | 'bold';
  content: string;
}

export function formatBotMessage(message: string): string[] {
  // Split message by double newlines to separate paragraphs
  return message
    .split(/\n\n/)
    .map(part => part.trim())
    .filter(Boolean);
}

export function formatTextWithBold(text: string): FormattedPart[] {
  const parts: FormattedPart[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the bold part
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    // Add the bold part
    parts.push({
      type: 'bold',
      content: match[1]
    });

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return parts;
}