
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    // A simple parser for basic markdown
    // Handles newlines, bold, italics, and code blocks
    const lines = content.split('\n');
    let isCodeBlock = false;
    const renderedLines = lines.map((line, index) => {
      // Toggle code block
      if (line.trim() === '```') {
        isCodeBlock = !isCodeBlock;
        return null;
      }
      if (isCodeBlock) {
        return <pre key={index} className="bg-slate-800 text-white p-3 rounded-md text-sm my-2 overflow-x-auto"><code>{line}</code></pre>;
      }

      // Process inline markdown
      const parts = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-slate-200 text-slate-800 rounded px-1 py-0.5 text-sm">$1</code>');

      return <p key={index} dangerouslySetInnerHTML={{ __html: parts }} />;
    });

    return renderedLines.filter(Boolean);
  };

  return <div className="prose prose-slate max-w-none">{renderContent()}</div>;
};

export default MarkdownRenderer;
