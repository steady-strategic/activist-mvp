
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Bot, User, MessageCircle, X } from 'lucide-react';
import { getPandaChatResponse } from '../services/geminiService';
import { ChatMessage, LandingPageConfig } from '../types';

interface ChatProps {
  config: LandingPageConfig;
}

const PandaChat: React.FC<ChatProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Reset chat when config changes
  useEffect(() => {
    if (config?.chat) {
        setMessages([{ role: 'model', text: config.chat.initialMessage }]);
    }
  }, [config.id, config.chat?.initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getPandaChatResponse(userText, config.chat?.systemInstruction || '');
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I couldn't reach the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!config?.chat) return null;

  return (
    <>
      {/* Static "Have Questions" Section */}
      <section id="chat" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Powered by AI
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Have questions? <br/>
            Ask our <span style={{ color: config.theme?.secondaryColor }}>Expert Agent</span>.
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
             Get instant answers about our mission, the animals we protect, and how your donation makes a direct impact.
          </p>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="group text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 mx-auto transform hover:-translate-y-1"
            style={{ backgroundColor: config.theme?.accentColor }}
          >
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
            Ask {config.chat.botName}
          </button>
        </div>
      </section>

      {/* Floating Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 text-white rounded-full shadow-2xl transition-all flex items-center justify-center hover:scale-110 group"
          style={{ backgroundColor: config.theme?.accentColor }}
          aria-label="Open Chat"
        >
          <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -inset-1 rounded-full opacity-30 animate-ping group-hover:opacity-50" style={{ backgroundColor: config.theme?.accentColor }}></span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-in">
          {/* Header */}
          <div className="p-4 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: config.theme?.accentColor }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold backdrop-blur-sm">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base">{config.chat.botName}</h3>
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 block shadow-sm"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-opacity-10'
                  }`}
                  style={msg.role === 'model' ? { backgroundColor: `${config.theme?.accentColor}20`, color: config.theme?.accentColor } : {}}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div 
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}
                  style={msg.role === 'user' ? { backgroundColor: '#1a1a1a' } : {}}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                 <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.theme?.accentColor}20`, color: config.theme?.accentColor }}
                >
                  <Bot size={16} />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <Loader2 size={16} className="animate-spin" style={{ color: config.theme?.accentColor }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 transition-all placeholder:text-gray-400"
                style={{ '--tw-ring-color': config.theme?.accentColor } as React.CSSProperties}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ backgroundColor: config.theme?.accentColor }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PandaChat;
