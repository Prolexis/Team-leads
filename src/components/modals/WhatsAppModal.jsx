import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Bot, 
  UserCheck, 
  Sparkles, 
  Tag, 
  CheckCheck, 
  Flame, 
  Wallet,
  Receipt,
  Clock
} from 'lucide-react';
import { CHAT_HISTORY } from '../../types/crmData';

export const WhatsAppModal = ({ 
  isOpen, 
  onClose, 
  currentLead, 
  isAiActive, 
  onToggleAi,
  onOpenQuoteModal,
  onOpenPaymentModal 
}) => {
  if (!isOpen) return null;

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
    const phone = currentLead.operational.paymentPhone;
    let paymentMsg = `💳 *DATOS DE PAGO OFICIALES (${method})*\n`;
    paymentMsg += `Titular: *Parrilladas El Establo S.A.C.*\n`;
    if (method === 'YAPE') {
      paymentMsg += `Número Yape Negocios: *945 821 000*\n`;
      paymentMsg += `O escanea nuestro código QR oficial.\n`;
    } else if (method === 'PLIN') {
      paymentMsg += `Número Plin Negocios: *987 654 000* (Interbank / BBVA / Scotiabank)\n`;
    } else {
      paymentMsg += `Aceptamos POS Visa/Mastercard y efectivo contra entrega.\n`;
    }
    paymentMsg += `\n⚠️ *Nota de seguridad:* Por favor indica tu número de operación para validar en sistema y emitir tu comprobante.`;

    setMessages([
      ...messages,
      {
        sender: isAiActive ? 'ai' : 'seller',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: paymentMsg,
        isSystemTemplate: true
      }
    ]);
  };

  const sendQuickQuoteInfo = () => {
    const dish = currentLead.preferences.favoriteDish;
    const term = currentLead.preferences.cookingTerm;
    let quoteMsg = `🥩 *COTIZACIÓN RÁPIDA - EL ESTABLO*\n`;
    quoteMsg += `Plato: *${dish}*\n`;
    quoteMsg += `Término: *${term}*\n`;
    quoteMsg += `Bebida: *${currentLead.preferences.favoriteDrink}*\n`;
    quoteMsg += `Total: *S/ 53.00* (Incluye delivery a ${currentLead.personal.district})\n`;
    quoteMsg += `⏱️ *Cupo bloqueado por 20 minutos.*`;

    setMessages([
      ...messages,
      {
        sender: isAiActive ? 'ai' : 'seller',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: quoteMsg,
        isSystemTemplate: true
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1f2c34] border border-crm-border rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* WhatsApp Header */}
        <div className="bg-[#121b22] px-4 py-3 border-b border-crm-border/60 flex items-center justify-between">
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
                <span className="text-wsp-light">En línea</span>
              </p>
            </div>
          </div>

          {/* Mode Tag & Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAi}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                isAiActive 
                  ? 'bg-fire-gold/20 text-fire-gold border-fire-gold/40' 
                  : 'bg-blue-600/20 text-blue-300 border-blue-500/40'
              }`}
            >
              {isAiActive ? <Bot className="w-3.5 h-3.5 animate-bounce" /> : <UserCheck className="w-3.5 h-3.5" />}
              <span>{isAiActive ? 'IA Respondiendo' : 'Modo Vendedor'}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NLP Entities Banner */}
        <div className="bg-[#182229] px-4 py-2 border-b border-crm-border/40 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
          <div className="flex items-center gap-1.5 text-fire-gold font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLN Detectado:</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {currentLead.preferences.nlpTags.map((t, idx) => (
              <span key={idx} className="bg-crm-bg/90 text-gray-300 px-2 py-0.5 rounded border border-crm-border text-[10px] font-mono">
                {t.tag}
              </span>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a]/95 bg-opacity-95">
          {messages.map((msg, index) => {
            const isClient = msg.sender === 'client';
            return (
              <div 
                key={index} 
                className={`flex flex-col ${isClient ? 'items-start' : 'items-end'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow ${
                    isClient 
                      ? 'bg-[#202c33] text-white rounded-tl-none border border-crm-border/40' 
                      : 'bg-[#005c4b] text-white rounded-tr-none'
                  }`}
                >
                  {/* Sender label */}
                  {!isClient && (
                    <div className="text-[10px] font-bold text-wsp-light mb-1 flex items-center gap-1">
                      {isAiActive ? <Bot className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      <span>{isAiActive ? 'Agente IA (El Establo)' : currentLead.assignedSeller}</span>
                    </div>
                  )}

                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* PLN Tag highlight if present */}
                  {msg.plnTag && (
                    <div className="mt-1.5 pt-1.5 border-t border-white/10 text-[9px] font-mono text-fire-gold flex items-center gap-1">
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

        {/* Quick Send Templates */}
        <div className="bg-[#182229] px-3 py-2 border-t border-crm-border/40 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">Plantillas:</span>
          <button
            onClick={sendQuickQuoteInfo}
            className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] bg-[#202c33] hover:bg-[#2a3942] text-gray-200 border border-crm-border/60 flex items-center gap-1.5 transition"
          >
            <Receipt className="w-3 h-3 text-fire-gold" />
            <span>Enviar Cotización</span>
          </button>
          <button
            onClick={sendQuickPaymentInfo}
            className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] bg-[#202c33] hover:bg-[#2a3942] text-gray-200 border border-crm-border/60 flex items-center gap-1.5 transition"
          >
            <Wallet className="w-3 h-3 text-purple-400" />
            <span>Instrucciones {currentLead.operational.preferredPaymentMethod}</span>
          </button>
          <button
            onClick={onOpenPaymentModal}
            className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition"
          >
            <CheckCheck className="w-3 h-3" />
            <span>Conciliar Pago</span>
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="bg-[#202c33] p-3 border-t border-crm-border/60 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={isAiActive ? "Escribe para intervenir manualmente..." : "Escribe un mensaje de vendedor..."}
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
    </div>
  );
};
