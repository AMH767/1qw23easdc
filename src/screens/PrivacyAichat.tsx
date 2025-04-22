import React, { useState, useEffect, useRef } from 'react';

interface Message {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'Вы полезный помощник.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Конфигурация API (рекомендуется вынести в .env)
  const API_KEY = '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';
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL = 'deepseek/deepseek-chat-v3-0324:free';

  // Автопрокрутка к новым сообщениям
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;
    setError(null);

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const payload = {
        model: MODEL,
        messages: [...messages, userMessage],
        temperature: 0.7,
        max_tokens: 1000
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href, // Важно для OpenRouter
          'X-Title': 'AI Chat App'             // Важно для OpenRouter
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error?.message || 'Ошибка API. Проверьте консоль для деталей.');
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Некорректный ответ от API');
      }

      const aiMessage: Message = { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error('Request Error:', err);
      setError(`Ошибка: ${(err as Error).message}. Проверьте настройки приватности OpenRouter.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>🤖 ИИ Чат-Помощник</h1>
        <div className="model-badge">{MODEL.split('/')[1]}</div>
      </header>

      {error && (
        <div className="error-banner">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <p>{error}</p>
            <a href="https://openrouter.ai/settings/privacy" target="_blank" rel="noopener noreferrer">
              Проверить настройки приватности →
            </a>
          </div>
        </div>
      )}

      <div className="messages-container">
        {messages
          .filter(m => m.role !== 'system')
          .map((msg, index) => (
            <div 
              key={index}
              className={`message ${msg.role}`}
            >
              <div className="message-avatar">
                {msg.role === 'assistant' ? '🤖' : '🏊‍♂️'}
              </div>
              <div className="message-content">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        
        {isLoading && (
          <div className="message assistant typing-indicator">
            <div className="typing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Напишите сообщение..."
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim()}
            className="send-button"
          >
            <svg className="send-icon" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

// Обновленные стили
const styles = `
  .chat-container {
    max-width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f0f4f8;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .chat-header {
    background: linear-gradient(135deg, #46d6e5 0%, #46d6e5 100%);
    color: white;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .model-badge {
    background: rgba(255,255,255,0.15);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .messages-container {
    flex: 1;
    padding: 1.5rem;
    padding-top: 50px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    // background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yMCAyMGgxNjB2MTYwaC0xNjB6TTYwIDYwaDEwdjEwaC0xMHpNMTMwIDEzMGgxMHYxMGgtMTB6IiBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==');
  }

  .message {
    display: flex;
    gap: 1rem;
    max-width: 80%;
    width: fit-content;
  }

  .message.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  .message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .message-content {
    padding: 1rem;
    border-radius: 1rem;
    line-height: 1.5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .message.assistant .message-content {
    background: white;
    border-radius: 0 1rem 1rem 1rem;
  }

  .message.user .message-content {
    background: #46d6e5;
    color: white;
    border-radius: 1rem 1rem 0 1rem;
  }

  .input-container {
    background: white;
    padding: 1.5rem;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    position: relative;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    padding: 1rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 1rem;
    font-size: 1rem;
    transition: all 0.2s;
  }

  input:focus {
    outline: none;
    border-color:rgb(129, 224, 248);
    box-shadow: 0 0 0 3px rgba(129,140,248,0.2);
  }

  .send-button {
    background:rgb(70, 218, 229);
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .send-button:hover {
    background:rgb(99, 232, 241);
    transform: translateY(-1px);
  }

  .send-button:disabled {
    background:rgb(199, 252, 254);
    cursor: not-allowed;
  }

  .send-icon {
    width: 24px;
    height: 24px;
    fill: white;
  }

  .typing-indicator {
    align-self: flex-start;
  }

  .typing-dots {
    display: flex;
    gap: 0.25rem;
    padding: 1rem;
  }

  .typing-dots .dot {
    width: 8px;
    height: 8px;
    background: #ddd;
    border-radius: 50%;
    animation: dot-bounce 1.4s infinite ease-in-out;
  }

  .typing-dots .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes dot-bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
  }

  .watermark {
    text-align: center;
    color: #94a3b8;
    font-size: 0.875rem;
    margin-top: 1rem;
  }

  .error-banner {
    background: #fff0f0;
    color: #dc2626;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    border-bottom: 2px solid #fecaca;
  }

  .error-icon {
    font-size: 1.5rem;
  }

  .error-content {
    flex: 1;
  }

  .error-content a {
    color: #ef4444;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .error-content a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .chat-container {
      border-radius: 0;
    }

    .message {
      max-width: 90%;
    }

    input {
      padding: 0.75rem 1rem;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default AIChatPage;