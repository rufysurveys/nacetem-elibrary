import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  Compass, 
  HelpCircle,
  ShieldCheck,
  Search
} from 'lucide-react';
import { queryUserResearchPortfolio, synthesizeUserResearchPortfolio } from '../utils/aiResearchSynthesizer';

export default function AiCopilotDrawer({ isOpen, onClose, focusedBook, allBooks = [], currentUser }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Welcome to the NACETEM Intelligent AI Research Assistant! I can summarize your publication portfolio, analyze cross-paper relationships, identify research gaps, and suggest future research directions based strictly on your uploaded publications.`
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Gather user-owned papers
  const userPapers = allBooks.filter(book => {
    if (!currentUser || !currentUser.isAuthenticated) return true;
    const currentName = (currentUser.name || '').toLowerCase();
    const isUploader = book.uploadedBy && book.uploadedBy.toLowerCase() === currentName;
    const isUserUploadedFlag = book.isUserUploaded;
    const isAuthor = Array.isArray(book.authors) 
      ? book.authors.some(a => a.toLowerCase().includes(currentName) || a.toLowerCase().includes('rufai'))
      : (book.authors || '').toLowerCase().includes('rufai');

    return isUploader || isUserUploadedFlag || isAuthor;
  });

  const portfolioSummary = synthesizeUserResearchPortfolio(userPapers.length > 0 ? userPapers : allBooks, currentUser);

  const handleSendMessage = (textToSend) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim()) return;

    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsProcessing(true);

    setTimeout(() => {
      let aiResponseText = queryUserResearchPortfolio(prompt, portfolioSummary);

      if (focusedBook) {
        aiResponseText = `### Analysis for "${focusedBook.title}"\n\n${focusedBook.abstract}\n\n**Key Takeaways**:\n${(focusedBook.keyTakeaways || []).map(t => '• ' + t).join('\n')}\n\n` + aiResponseText;
      }

      const assistantMsg = { id: `ai-${Date.now()}`, sender: 'assistant', text: aiResponseText };
      setMessages(prev => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 600);
  };

  const presetQuestions = [
    "What are the major themes across my research?",
    "Summarize my research career in 500 words.",
    "Which of my papers are most closely related?",
    "What research gap appears most frequently?",
    "Suggest three potential research topics based on my previous work."
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white text-slate-900 border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right font-sans">
      
      {/* Drawer Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white">AI Research Assistant & Copilot</h2>
            <p className="text-[11px] text-emerald-300 font-medium">Grounded in User Research Portfolio ({userPapers.length} papers)</p>
          </div>
        </div>

        <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Preset Prompt Badges */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 text-xs font-semibold">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-950 border border-slate-200 hover:border-emerald-300 rounded-lg text-[11px] shadow-2xs transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium bg-slate-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-4 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-white text-slate-900 border border-slate-200 font-serif'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center space-x-2 text-slate-500 font-semibold text-xs p-3">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Analyzing research portfolio and synthesizing response...</span>
          </div>
        )}
      </div>

      {/* Drawer Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask research portfolio questions..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-emerald-600"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
