import React from 'react';
import { 
  Bot, 
  UserCheck, 
  MessageSquare, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  Flame, 
  RefreshCw,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

export const Header = ({ 
  currentLead, 
  leads, 
  onSelectLead, 
  isAiActive, 
  onToggleAi, 
  onOpenQuoteModal, 
  onOpenPaymentModal, 
  onOpenWhatsAppModal,
  onResetLeadStatus,
  countdownMinutes,
  countdownSeconds,
  isDarkMode,
  onToggleTheme
}) => {
  const isPayer = currentLead.status === 'PAYER';
  const isBlocked = currentLead.status === 'PEDIDO_BLOQUEADO';

  return (
    <header className="border-b border-slate-200 dark:border-crm-border bg-white/95 dark:bg-[#0f1422]/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-2.5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Brand & Lead Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 pr-3 border-r border-slate-200 dark:border-crm-border">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none mb-0.5">
                <span className="text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase font-mono">CRM Negociación</span>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.2 rounded font-semibold">UNT</span>
              </div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Parrilladas El Establo
              </h1>
            </div>
          </div>

          {/* Lead Switcher Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl px-2.5 py-1 cursor-pointer transition shadow-soft">
              <img 
                src={currentLead.avatar} 
                alt={currentLead.name} 
                className="w-6 h-6 rounded-md object-cover ring-1 ring-slate-300 dark:ring-slate-600" 
              />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 dark:text-crm-secondary flex items-center gap-1">
                  <span>Lead:</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[130px]">{currentLead.name}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition ml-0.5" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-1.5 w-72 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-xl shadow-premium dark:shadow-dark-premium p-1.5 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 px-2 py-1 uppercase tracking-wider">
                Seleccionar Lead en Negociación
              </div>
              {leads.map((l) => (
                <button
                  key={l.id}
                  onClick={() => onSelectLead(l.id)}
                  className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition ${
                    l.id === currentLead.id 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <img src={l.avatar} alt={l.name} className="w-7 h-7 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate text-slate-900 dark:text-white">{l.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{l.personal.district}</p>
                  </div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    l.status === 'PAYER' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800' 
                      : l.status === 'PEDIDO_BLOQUEADO' 
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-800' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {l.status === 'PAYER' ? 'PAYER' : l.status === 'PEDIDO_BLOQUEADO' ? 'BLOQUEADO' : 'LEAD'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Tag */}
          <div className="hidden xl:flex items-center">
            {isPayer ? (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
                <CheckCircle2 className="w-3 h-3" />
                <span>PAYER (Venta Cerrada)</span>
              </span>
            ) : isBlocked ? (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80 animate-pulse">
                <Clock className="w-3 h-3" />
                <span>BLOQUEADO ({String(countdownMinutes).padStart(2, '0')}:{String(countdownSeconds).padStart(2, '0')})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>LEAD ACTIVO</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Section: AI Toggle, Theme Switcher & Actions */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          
          {/* Hybrid Agent Switch */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-0.5 rounded-xl text-xs">
            <button
              onClick={onToggleAi}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
                isAiActive 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Atención Automática por IA"
            >
              <Bot className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>IA</span>
            </button>
            <button
              onClick={onToggleAi}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
                !isAiActive 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Control Manual por Vendedor"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span>Vendedor</span>
            </button>
          </div>

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition"
            title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Quick Action: WhatsApp */}
          <button
            onClick={onOpenWhatsAppModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-soft"
            title="Abrir WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WhatsApp</span>
          </button>

          {/* Quick Action: Cotizar */}
          <button
            onClick={onOpenQuoteModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition"
          >
            <Receipt className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Cotizar</span>
          </button>

          {/* Quick Action: Registrar Pago */}
          <button
            onClick={onOpenPaymentModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              isPayer 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white shadow-soft'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isPayer ? 'Conciliación' : 'Registrar Pago'}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetLeadStatus}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
            title="Reiniciar estado del Lead"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
