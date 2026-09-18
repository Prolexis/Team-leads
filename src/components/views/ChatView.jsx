import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  UserCheck, 
  Sparkles, 
  Tag, 
  CheckCheck, 
  Receipt, 
  Wallet,
  CheckCircle2
} from 'lucide-react';
import { CHAT_HISTORY } from '../../types/crmData';

export const ChatView = ({ 
  currentLead, 
  isAiActive, 
  onToggleAi,
  onOpenQuoteModal,
  onOpenPaymentModal 
}) => {
  const initialMessages = CHAT_HISTORY[currentLead.id] || [];
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: isAiActive ? 'ai' : 'seller',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputMessage
    };

    setMessages([...messages, newMsg]);
    setInputMessage('');
  };

  const sendQuickPaymentInfo = () => {
    const method = currentLead.operational.preferredPaymentMethod;
    let paymentMsg = `💳 *DATOS DE PAGO OFICIALES (${method})*\n`;
    paymentMsg += `Titular: *Parrilladas El Establo S.A.C.*\n`;
    if (method === 'YAPE') {
      paymentMsg += `Número Yape Negocios: *945 821 000*\n`;
    } else if (method === 'PLIN') {
      paymentMsg += `Número Plin Negocios: *987 654 000*\n`;
    } else {
      paymentMsg += `POS disponible contra entrega.\n`;
    }
    paymentMsg += `⚠️ Por favor envía tu Nº de Operación para conciliar con sistema y emitir comprobante.`;

    setMessages([
      ...messages,
      {
        sender: isAiActive ? 'ai' : 'seller',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: paymentMsg
      }
    ]);
  };

  const sendQuickQuoteInfo = () => {
    const dish = currentLead.preferences.favoriteDish;
    let quoteMsg = `🥩 *COTIZACIÓN RÁPIDA - EL ESTABLO*\n`;
    quoteMsg += `Plato: *${dish}*\n`;
    quoteMsg += `Término: *${currentLead.preferences.cookingTerm}*\n`;
    quoteMsg += `Total: *S/ 53.00* (Delivery a ${currentLead.personal.district})\n`;
    quoteMsg += `⏱️ Cupo bloqueado por 20 minutos.`;

    setMessages([
      ...messages,
      {
        sender: isAiActive ? 'ai' : 'seller',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: quoteMsg
      }
    ]);
  };

  return (
    <div className="bg-[#1f2c34] border border-crm-border rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-[#121b22] px-5 py-3 border-b border-crm-border/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={currentLead.avatar} 
              alt={currentLead.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-wsp" 
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-wsp rounded-full border-2 border-[#121b22]"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">{currentLead.name}</h3>
            <p className="text-[11px] text-[#8696a0] flex items-center gap-1.5 font-mono">
              <span>{currentLead.personal.phone}</span>
              <span>•</span>
              <span className="text-wsp-light">Chat Oficial WhatsApp</span>
            </p>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAi}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isAiActive 
                ? 'bg-fire-gold/20 text-fire-gold border-fire-gold/40' 
                : 'bg-blue-600/20 text-blue-300 border-blue-500/40'
            }`}
          >
            {isAiActive ? <Bot className="w-4 h-4 animate-bounce" /> : <UserCheck className="w-4 h-4" />}
            <span>{isAiActive ? 'IA Respondiendo Automático' : 'Control Manual Vendedor'}</span>
          </button>
        </div>
      </div>

      {/* NLP Tags Strip */}
      <div className="bg-[#182229] px-4 py-2.5 border-b border-crm-border/40 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
        <div className="flex items-center gap-1.5 text-fire-gold font-bold shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PLN Detectado en esta conversación:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {currentLead.preferences.nlpTags.map((t, idx) => (
            <span key={idx} className="bg-crm-bg/90 text-gray-300 px-2 py-0.5 rounded border border-crm-border text-[10px] font-mono">
              {t.tag} ({t.confidence})
            </span>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="p-4 sm:p-6 space-y-3 bg-[#0b141a]/95 min-h-[350px] max-h-[480px] overflow-y-auto">
        {messages.map((msg, index) => {
          const isClient = msg.sender === 'client';
          return (
            <div 
              key={index} 
              className={`flex flex-col ${isClient ? 'items-start' : 'items-end'}`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs shadow ${
                  isClient 
                    ? 'bg-[#202c33] text-white rounded-tl-none border border-crm-border/40' 
                    : 'bg-[#005c4b] text-white rounded-tr-none'
                }`}
              >
                {!isClient && (
                  <div className="text-[10px] font-bold text-wsp-light mb-1 flex items-center gap-1">
                    {isAiActive ? <Bot className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                    <span>{isAiActive ? 'Agente IA (El Establo)' : currentLead.assignedSeller}</span>
                  </div>
                )}

                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {msg.plnTag && (
                  <div className="mt-2 pt-1.5 border-t border-white/10 text-[9px] font-mono text-fire-gold flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{msg.plnTag}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-300/70">
                  <span>{msg.time}</span>
                  {!isClient && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Templates Bar */}
      <div className="bg-[#182229] px-4 py-2 border-t border-crm-border/40 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">Acciones:</span>
        <button
          onClick={sendQuickQuoteInfo}
          className="shrink-0 px-3 py-1 rounded-lg text-xs bg-[#202c33] hover:bg-[#2a3942] text-gray-200 border border-crm-border/60 flex items-center gap-1.5 transition"
        >
          <Receipt className="w-3.5 h-3.5 text-fire-gold" />
          <span>Enviar Cotización</span>
        </button>
        <button
          onClick={sendQuickPaymentInfo}
          className="shrink-0 px-3 py-1 rounded-lg text-xs bg-[#202c33] hover:bg-[#2a3942] text-gray-200 border border-crm-border/60 flex items-center gap-1.5 transition"
        >
          <Wallet className="w-3.5 h-3.5 text-purple-400" />
          <span>Instrucciones {currentLead.operational.preferredPaymentMethod}</span>
        </button>
        <button
          onClick={onOpenPaymentModal}
          className="shrink-0 px-3 py-1 rounded-lg text-xs bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Conciliar Pago Directo</span>
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="bg-[#202c33] p-3 border-t border-crm-border/60 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={isAiActive ? "Escribe para intervenir manualmente..." : "Escribe un mensaje como vendedor..."}
          className="flex-1 bg-[#2a3942] text-xs text-white placeholder-gray-400 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-wsp"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-wsp hover:bg-wsp-dark text-white transition hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
