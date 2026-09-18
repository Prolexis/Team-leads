import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  UserCheck, 
  User,
  Sparkles, 
  Tag, 
  CheckCheck, 
  Receipt, 
  Wallet,
  CheckCircle2,
  Smartphone
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
  const [sendAsClient, setSendAsClient] = useState(false); // false = Negocio, true = Cliente

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const isFromClient = sendAsClient;
    const clientText = inputMessage;

    const newMsg = {
      sender: isFromClient ? 'client' : (isAiActive ? 'ai' : 'seller'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: clientText
    };

    setMessages([...messages, newMsg]);
    setInputMessage('');

    if (isFromClient) {
      setTimeout(() => {
        const hasOpNumber = /\b\d{6,10}\b/.test(clientText) || clientText.toLowerCase().includes('yape') || clientText.toLowerCase().includes('plin') || clientText.toLowerCase().includes('operación') || clientText.toLowerCase().includes('operacion');
        
        if (hasOpNumber) {
          const match = clientText.match(/\b\d{6,10}\b/);
          const opCode = match ? match[0] : '83921045';
          
          setMessages((prev) => [
            ...prev,
            {
              sender: 'ai',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              text: `¡Excelente ${currentLead.name.split(' ')[0]}! 🥩 Hemos recibido tu notificación de pago con Nº de Operación *${opCode}*. \n\nEstamos contrastando el abono en nuestra cuenta oficial de ${currentLead.operational.preferredPaymentMethod} Negocios para cambiar tu pedido a *PAYER* y emitir tu comprobante. 🔥`,
              plnTag: `PLN: PAGO_DETECTADO (Op: ${opCode})`,
              detectedOpCode: opCode
            }
          ]);
        }
      }, 1000);
    }
  };

  const simulateClientPayment = () => {
    const opCode = currentLead.id === 'lead-1' ? '83921045' : '74619203';
    const method = currentLead.operational.preferredPaymentMethod;
    const amount = currentLead.id === 'lead-1' ? '53.00' : '183.00';

    const clientMsg = {
      sender: 'client',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Listo, ya realicé el ${method} por S/ ${amount}. Mi número de operación es *${opCode}*. Por favor confírmame para coordinar la entrega en mi hora de almuerzo.`
    };

    setMessages((prev) => [...prev, clientMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `¡Perfecto ${currentLead.name.split(' ')[0]}! 🥩 El Agente IA ha detectado tu constancia con el Nº de Operación *${opCode}* vía PLN.\n\nProcediendo a la conciliación contra fuente real en Caja para emitir tu ${currentLead.work.requiresInvoice ? `Factura RUC: ${currentLead.work.ruc}` : 'Boleta Electrónica'} y cambiar tu estado a *PAYER*. 🔥`,
          plnTag: `PLN: OP_BANCARIA_VALIDA (Nº ${opCode})`,
          detectedOpCode: opCode
        }
      ]);
    }, 1200);
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

    setMessages((prev) => [
      ...prev,
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

    setMessages((prev) => [
      ...prev,
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
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500" 
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121b22]"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">{currentLead.name}</h3>
            <p className="text-[11px] text-[#8696a0] flex items-center gap-1.5 font-mono">
              <span>{currentLead.personal.phone}</span>
              <span>•</span>
              <span className="text-emerald-400">Chat Oficial WhatsApp</span>
            </p>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAi}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isAiActive 
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                : 'bg-slate-700 text-white border-slate-600'
            }`}
          >
            {isAiActive ? <Bot className="w-4 h-4 animate-bounce" /> : <UserCheck className="w-4 h-4" />}
            <span>{isAiActive ? 'IA Respondiendo Automático' : 'Control Manual Vendedor'}</span>
          </button>
        </div>
      </div>

      {/* NLP Tags Strip */}
      <div className="bg-[#182229] px-4 py-2.5 border-b border-crm-border/40 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold shrink-0">
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
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs shadow ${
                  isClient 
                    ? 'bg-[#202c33] text-white rounded-tl-none border border-crm-border/40' 
                    : 'bg-[#005c4b] text-white rounded-tr-none'
                }`}
              >
                <div className="text-[10px] font-bold mb-1 flex items-center gap-1">
                  {isClient ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{currentLead.name} (Cliente)</span>
                    </span>
                  ) : (
                    <span className="text-emerald-300 flex items-center gap-1">
                      {isAiActive ? <Bot className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      <span>{isAiActive ? 'Agente IA (El Establo)' : currentLead.assignedSeller}</span>
                    </span>
                  )}
                </div>

                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {msg.plnTag && (
                  <div className="mt-2 pt-1.5 border-t border-white/10 text-[9px] font-mono text-amber-300 flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span>{msg.plnTag}</span>
                    </span>
                    {msg.detectedOpCode && (
                      <button
                        onClick={onOpenPaymentModal}
                        className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9px] flex items-center gap-1 transition"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Conciliar Op: {msg.detectedOpCode}</span>
                      </button>
                    )}
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
        
        {/* BOTÓN CLAVE: Simular respuesta de Diego dando el número de operación */}
        <button
          onClick={simulateClientPayment}
          className="shrink-0 px-3 py-1 rounded-lg text-xs font-bold bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 flex items-center gap-1.5 transition shadow-sm"
          title="Simular que el cliente envía su voucher con número de operación"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Simular {currentLead.name.split(' ')[0]}: "Ya yapeé, Op: 83921045"</span>
        </button>

        <button
          onClick={sendQuickQuoteInfo}
          className="shrink-0 px-3 py-1 rounded-lg text-xs bg-[#202c33] hover:bg-[#2a3942] text-gray-200 border border-crm-border/60 flex items-center gap-1.5 transition"
        >
          <Receipt className="w-3.5 h-3.5 text-amber-400" />
          <span>Enviar Cotización</span>
        </button>

        <button
          onClick={sendQuickPaymentInfo}
          className="shrink-0 px-3 py-1 rounded-lg text-xs bg-[#202c33] hover:bg-[#2a3942] text-gray-200 border border-crm-border/60 flex items-center gap-1.5 transition"
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
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

      {/* Input Form with Client/Business Selector */}
      <form onSubmit={handleSendMessage} className="bg-[#202c33] p-3 border-t border-crm-border/60 flex items-center gap-2">
        <div className="flex items-center bg-[#121b22] border border-crm-border/60 rounded-xl p-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setSendAsClient(true)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
              sendAsClient 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
            title="Escribir como el Cliente (Diego Alonso)"
          >
            <User className="w-3 h-3" />
            <span>Cliente</span>
          </button>
          <button
            type="button"
            onClick={() => setSendAsClient(false)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
              !sendAsClient 
                ? 'bg-emerald-700 text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
            title="Escribir como Parrilladas El Establo"
          >
            <Bot className="w-3 h-3" />
            <span>El Establo</span>
          </button>
        </div>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={
            sendAsClient 
              ? `Escribe como ${currentLead.name.split(' ')[0]} (ej. "Ya yapeé, mi número de operación es 83921045")...` 
              : (isAiActive ? "Escribe para intervenir manualmente como vendedor..." : "Escribe un mensaje como vendedor...")
          }
          className="flex-1 bg-[#2a3942] text-xs text-white placeholder-gray-400 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        
        <button
          type="submit"
          className={`p-2.5 rounded-xl text-white transition hover:scale-105 active:scale-95 ${
            sendAsClient ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
          title="Enviar mensaje"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
