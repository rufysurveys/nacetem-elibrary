import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  Lightbulb
} from 'lucide-react';

export default function AiCopilotDrawer({ isOpen, onClose, focusedBook, allBooks }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am **NACETEM STI-Assist**, your AI Research & Policy Assistant. I can summarize STI publications, analyze technology indicators, synthesize policy recommendations, and generate citations across all 2026 NACETEM archives.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (focusedBook) {
      setMessages(prev => [
        ...prev,
        {
          id: 'focus-' + Date.now(),
          sender: 'ai',
          text: `Selected Document Focus: **${focusedBook.title}** (${focusedBook.year}). Ask me to summarize key findings, extract policy actions, or cite this paper!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [focusedBook]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let responseText = '';
      const qLower = query.toLowerCase();

      if (focusedBook) {
        if (qLower.includes('summar') || qLower.includes('takeaway') || qLower.includes('finding')) {
          responseText = `### Executive AI Summary of "${focusedBook.title}":\n\n` +
            `• **Primary Objective**: ${focusedBook.abstract.slice(0, 180)}...\n\n` +
            `• **Key Takeaways**:\n` +
            focusedBook.keyTakeaways.map(k => `  - ${k}`).join('\n') + `\n\n` +
            `• **STI Impact Index**: Rated ${focusedBook.rating}/5.0 with ${focusedBook.citationsCount} national citations.`;
        } else if (qLower.includes('policy') || qLower.includes('recommend')) {
          responseText = `### Policy Action Brief derived from "${focusedBook.title}":\n\n` +
            (focusedBook.policyRecommendations 
              ? focusedBook.policyRecommendations.map((p, i) => `${i+1}. ${p}`).join('\n\n')
              : `1. Enact targeted tax incentives for local R&D investment.\n2. Strengthen Technology Transfer Offices across geopolitical zones.`) +
            `\n\n*Source: NACETEM Policy Directorate 2026.*`;
        } else if (qLower.includes('cite') || qLower.includes('reference') || qLower.includes('apa')) {
          responseText = `### APA 7th Edition Citation:\n\n\`\`\`text\n${focusedBook.authors.join(', ')} (${focusedBook.year}). ${focusedBook.title}. ${focusedBook.institution}. https://doi.org/${focusedBook.doi || '10.5281/nacetem.2026.001'}\n\`\`\``;
        } else {
          responseText = `Based on **${focusedBook.title}** (${focusedBook.year}), the research emphasizes strengthening STI governance, funding mechanisms, and technology adoption in Nigeria. Key focus areas include ${focusedBook.category} and inter-agency collaboration.`;
        }
      } else {
        if (qLower.includes('policy') || qLower.includes('2026')) {
          responseText = `### Overview of Nigeria's 2026 STI Policy Framework:\n\n` +
            `1. **R&D Allocation Goal**: Increasing national research spending to **1.5% of GDP**.\n` +
            `2. **Zonal Innovation Hubs**: Establishing 6 Regional Technology Transfer Sandboxes.\n` +
            `3. **Ethical AI Integration**: Formulating ECOWAS-aligned AI governance standards for public administration.\n\n` +
            `You can read the full official document: **"National STI Policy 2026 Implementation Framework"** in the catalog.`;
        } else if (qLower.includes('solar') || qLower.includes('energy') || qLower.includes('agri')) {
          responseText = `### Solar Agribusiness Research Insights:\n\n` +
            `NACETEM technical report **"Solar Micro-Grid Deployment for Rural Agribusiness"** demonstrates:\n` +
            `• 34% reduction in post-harvest agricultural loss via solar cold-chain storage.\n` +
            `• 3.8-year capital payback period for 50kW mini-grid installations.\n` +
            `• Exemption of import duties on LiFePO4 battery storage systems.`;
        } else {
          responseText = `I searched the NACETEM repository for **"${query}"**. Found ${allBooks?.length || 6} relevant STI documents matching your keywords across Policy, AI Governance, and Sustainable Technologies.`;
        }
      }

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-extrabold text-sm text-slate-900">NACETEM STI-Assist</h3>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded">
                AI Copilot
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Powered by STI Knowledge Base</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Focused Book Banner */}
      {focusedBook && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs flex items-center justify-between text-emerald-900">
          <div className="flex items-center space-x-2 truncate">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
            <span className="truncate font-bold">{focusedBook.title}</span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800 font-bold">
            Focused
          </span>
        </div>
      )}

      {/* Message Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              msg.sender === 'user'
                ? 'bg-slate-200 text-slate-800 border border-slate-300'
                : 'bg-emerald-700 text-white'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed space-y-2 border ${
              msg.sender === 'user'
                ? 'bg-emerald-700 text-white font-medium border-emerald-800'
                : 'bg-white text-slate-800 border-slate-200 shadow-xs'
            }`}>
              <div className="whitespace-pre-line font-sans">
                {msg.text}
              </div>
              <div className={`text-[9px] font-mono ${msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center space-x-2 text-xs text-emerald-800 font-mono font-bold">
            <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
            <span>Analyzing NACETEM STI Repository...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2">
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center space-x-1">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          <span>Quick AI Prompts</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <button
            onClick={() => handleSend('Summarize key findings and policy actions')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-800 border border-slate-200 hover:border-emerald-300 font-semibold"
          >
            ⚡ Summarize Findings
          </button>
          <button
            onClick={() => handleSend('Extract policy recommendations for Nigeria')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-800 border border-slate-200 hover:border-emerald-300 font-semibold"
          >
            🇳🇬 Policy Actions
          </button>
          <button
            onClick={() => handleSend('Generate APA 7th Citation')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-300 font-semibold"
          >
            📜 APA Citation
          </button>
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-100 border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AI about STI policy, R&D metrics, papers..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-40 transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
